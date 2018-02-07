## git提交方法

因为我们会多人操作同一个html文件.所以我们要求大家严格执行以下逻辑. 当然模块和模块之间，希望大家不要随意改动.


1.首先 fork 我们的项目到你自己的github账号下.

![](/Users/chengwei/Desktop/fork.jpg)

第一步搞定.

2. git clone 你自己的kafka-doc-zh项目
   - 比如我的是 git clone git@github.com:mikechengwei/kafka-do[c-zh.git](a)

3. 然后你用idea open 你clone 的本地项目.

4. 建立两个remotes 一个是你自己的github对应的fork项目. 你要再建一个apachecn的。保证代码最新.

![](/Users/chengwei/Desktop/remotes.jpg)
![](/Users/chengwei/Desktop/remotes_display.png)

`下面以mikechenwei github项目举例`

5.本地分支各位要建立两个分支，比如一个是`mikechengwei-1.0.0-local`  一个是`apachecn-1.0.0-local`.都根据自己仓库的`1.0.0`分支checkout。


- 大家翻译的时候在自己的分支 `mikechengwei-1.0.0-local`分支上操作，翻译完之后，commit+push 到自己项目的origin/`mikechengwei-1.0.0-local`分支上。这是为了保证你的改动不要丢。
- 然后大家要合并代码到apacheCn的项目上去，这时候要切到本地的`apachecn-1.0.0-local`分支，并 git fetch + git merge 最新的apacheCN下的`1.0.0`分支. 这是为了保证代码一致。（合并代码之前群里说一下）
- 然后将 `mikechengwei-1.0.0-local`分支 代码 merge into `apachecn-1.0.0-local`分支上.
- 然后将 `apachecn-1.0.0-local` 提交到自己github项目的 `master` 分支上去。
- 之后就可以提交pull request 合并到apacheCN的 `1.0.0`分支上

总结:本地建立两个分支，`mikechengwei-1.0.0-local`和`apachecn-1.0.0-local`，改动就在自己的分支上改动，提交的时候先合并到apachecn的本地分支且保证apachecn分支最新，再提交到自己的项目中去。
### pull request 提交如下:
![](/Users/chengwei/Desktop/create_pull_request.jpg)
![](/Users/chengwei/Desktop/pull_request.jpg)

