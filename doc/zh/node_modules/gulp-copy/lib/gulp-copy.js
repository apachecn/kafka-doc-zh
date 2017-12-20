'use strict';

var through = require('through2');
var path = require('path');
var fs = require('fs');
var PluginError = require('gulp-util').PluginError;

/**
 * gulp copy method
 * @param {string} destination
 * @param {object} opts
 * @returns {object}
 */
function gulpCopy (destination, opts)
{
    var throughOptions = { objectMode: true };

    // Make sure a destination was verified
    if (typeof destination !== 'string') {
        throw new PluginError('gulp-copy', 'No valid destination specified');
    }

    // Default options
    if (opts === undefined) {
        opts = opts || {};
    }
    else if (typeof opts !== 'object' || opts === null) {
        throw new PluginError('gulp-copy', 'No valid options specified');
    }

    return through(throughOptions, transform);

    /**
     * Transform method, copies the file to its new destination
     * @param {object} file
     * @param {string} encoding
     * @param {function} cb
     */
    function transform(file, encoding, cb)
    {
        var rel = null;
        var fileDestination = null;

        if (file.isStream()) {
            return cb(new PluginError('gulp-copy', 'Streaming not supported'));
        }

        if (!file.isNull()) {
            rel = path.relative(file.cwd, file.path).replace(/\\/g, '/');

            // Strip path prefixes
            if (opts.prefix) {
                var p = opts.prefix;
                while (p-- > 0) {
                    rel = rel.substring(rel.indexOf('/') + 1);
                }
            }

            fileDestination = destination + '/' + rel;

            // Make sure destination exists
            if (!doesPathExist(fileDestination)) {
                createDestination(fileDestination.substr(0, fileDestination.lastIndexOf('/')));
            }

            // Copy the file
            copyFile(file.path, fileDestination, function (error) {
                if (error) {
                    throw new PluginError('gulp-copy', 'Could not copy file <' +  file.path + '>: ' + error.message);
                }

                // Update path for file so this path is used later on
                file.path = fileDestination;
                cb(null, file);
            });
        }
        else {
            cb(null, file);
        }
    }
}

/**
 * Recursively creates the path
 * @param {string} destination
 */
function createDestination(destination)
{
    var folders = destination.split('/');
    var path = [];
    var l = folders.length;
    var i = 0;

    // for absolute paths
    if (folders[0] === '') {
        path.push('/');
        folders.shift();
    }

    for (i; i < l; i++) {
        path.push(folders[i]);

        if (folders[i] !== '' && !doesPathExist(path.join('/'))) {
            try {
                fs.mkdirSync(path.join('/'));
            } catch (error) {
                throw new PluginError(
                    'gulp-copy',
                    'Could not create destination <' +  destination + '>: ' + error.message
                );
            }
        }
    }
}

/**
 * Check if the path exists
 * @param path
 * @returns {boolean}
 */
function doesPathExist (path)
{
    var pathExists = true;

    try {
        fs.accessSync(path);
    }
    catch (error) {
        pathExists = false;
    }

    return pathExists;
}

/**
 * Copy a file to its new destination
 * @param {string} source
 * @param {string} target
 * @param {function} copyCallback
 */
function copyFile (source, target, copyCallback)
{
    var done = false;
    var readStream = fs.createReadStream(source);
    var writeStream = fs.createWriteStream(target);

    readStream.on('error', copyDone);
    writeStream.on('error', copyDone);

    writeStream.on('close', function() {
        copyDone(null);
    });

    readStream.pipe(writeStream);

    /**
     * Finish copying. Reports error when needed
     * @param [error] optional error
     */
    function copyDone (error)
    {
        if (!done) {
            done = true;
            copyCallback(error);
        }
    }
}

module.exports = gulpCopy;