> PS:还有少许bug，一些基本的代码肯定可以用了，一些比较复杂的框架还需要再修正一下，后续会出一篇原理文章，欢迎star，follow。

#who am i?

js2image 是一个可以把`js源代码`压缩成一个`ascii字符画`的源代码的工具，它的特色是压缩后的代码仍可运行，而不是简单的拼成最终的图案。

#压缩后的示例，亲测可用

http://f2e.souche.com/assets/js/lib/jquery-2.1.1.min.xmas.js

另外,本项目resource目录中有多个已经跑通过的测试库文件.

#安装依赖,本模块依赖系统模块:graphicsmagick

````
# Ubuntu
$ sudo apt-get install graphicsmagick

# Fedora
$ sudo dnf install GraphicsMagick

# OS X
$ brew install graphicsmagick

# Chocolatey (package manager for Windows)
# (Restart of cmd/PowerShell is required)
$ choco install graphicsmagick

````

#全局命令使用

````
npm install js2image -g; #全局使用

````

````
/**
* 直接在命令行里执行此命令即可压缩，默认压缩出一个xmas.js后缀的文件。
* -s 源代码路径
* -r 是否反相图像
* -i 指定使用的图片的路径，默认使用 ./resource/tree.png
*/
js2image -s ./resource/jquery.js
````


#直接在nodejs中使用

````
var Js2Image = require("js2image");
//获取结果的code
Js2Image.getCode("./resource/jquery.js","./resource/tree.png",{}).then(function(code){
    console.log(code);
})
//或者直接写入文件
Js2Image.writeToFile("./resource/jquery.js","./resource/tree.png",{}).then(function(code){

});


````