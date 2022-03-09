var gulp = require('gulp');
var fileinclude = require('gulp-file-include');
var gulpCopy = require('gulp-copy');
// var otherGulpFunction = require('gulp-other-function');

// copy最外层的目录
gulp.task('fileinclude', function (cb) {
    gulp.src('**.html')
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('dist'));
    cb();
});


var sourceFiles = [ 'logos/*', 'js/*','images/*','css/*','diagrams/*','api-docs/*' ];

gulp.task('copy1',function(cb){
    gulp.src('logos/*')
    .pipe(gulp.dest('dist/logos'));
    cb();
    
})
gulp.task('copy2',function(cb){
    gulp.src('js/*')
    .pipe(gulp.dest('dist/js'));
    cb();
    
})
    
gulp.task('copy3',function(cb){
    gulp.src('images/*')
    .pipe(gulp.dest('dist/images'));
    cb();
    
})

gulp.task('copy4',function(cb){
    gulp.src('css/*')
    .pipe(gulp.dest('dist/css'));
    cb();
    
})

gulp.task('copy5',function(cb){
    gulp.src('diagrams/*')
    .pipe(gulp.dest('dist/diagrams'));
    cb();
    
})
gulp.task('copy6',function(cb){
    gulp.src('api-docs/*')
    .pipe(gulp.dest('dist/api-docs'));
    cb();
    
}) 
var folders=['07','08','10','081','082','090','0100','0101','0102','0103','0110']

gulp.task('html', function (cb) {
    for(var i=0;i<folders.length;i++){
        gulp.src(folders[i]+'/**.html')
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('dist/'+folders[i]));
        cb();
    }
}); 
gulp.task('documentation', function (cb) {
    for(var i=0;i<folders.length;i++){
        gulp.src(folders[i]+'/documentation/**.html')
            .pipe(fileinclude({
                prefix: '@@',
                basepath: '@file'
            }))
            .pipe(gulp.dest('dist/'+folders[i]+'/documentation'));
        cb();
    }
}); 

var streamsVersion=['0102','0110']

gulp.task('streams', function (cb) {
    for(var i=0;i<folders.length;i++){
        gulp.src(folders[i]+'/documentation/streams/**.html')
            .pipe(fileinclude({
                prefix: '@@',
                basepath: '@file'
            }))
            .pipe(gulp.dest('dist/'+folders[i]+'/documentation/streams'));
        cb();
    }
}); 

gulp.task('10streams', function (cb) {
    for(var i=0;i<folders.length;i++){
        gulp.src('documentation/streams/**.html')
            .pipe(fileinclude({
                prefix: '@@',
                basepath: '@file'
            }))
            .pipe(gulp.dest('dist/documentation/streams'));
        cb();
    }
}); 

gulp.task('10streams2', function (cb) {
    for(var i=0;i<folders.length;i++){
        gulp.src('10/documentation/streams/**.html')
            .pipe(fileinclude({
                prefix: '@@',
                basepath: '@file'
            }))
            .pipe(gulp.dest('dist/10/documentation/streams'));
        cb();
    }
}); 


gulp.task('default', gulp.series('fileinclude','copy1','copy2','copy3','copy4','copy5','copy6','html','documentation','streams','10streams','10streams2'))
