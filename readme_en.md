**Warning: js compressed please manual confirmation before put into production use, does not guarantee 100% operational, js and js souche.com official website of the current test have been tested, which can guarantee there is no problem after 99% compression of js

# who am i?

**js2image** Is a javascript source code can be compressed into a single source code ascii character painting tool, which features code compression can still run after, rather than simply makes up the final pattern.

About js2image principle can see this article i writed：[Christmas, all the js code of the site  compress  into a Christmas tree。](http://zhuanlan.zhihu.com/yutou/20439979)

# example

http://f2e.souche.com/assets/js/lib/jquery-2.1.1.min.xmas.js

In addition, the project has more than one resource directory is already running through the test library file.

Compression effect is as follows：

![js2image Compression renderings](http://7o52oq.com2.z0.glb.qiniucdn.com/Slice%201.png)


# Installation dependent system modules graphicsmagick

```bash
# Ubuntu
$ sudo apt-get install graphicsmagick

# Fedora
$ sudo dnf install GraphicsMagick

# OS X
$ brew install graphicsmagick

# Chocolatey (package manager for Windows)
# (Restart of cmd/PowerShell is required)
$ choco install graphicsmagick
```

# Use the command-line tool

Execute the following command to install global command：

```bash
$ npm install js2image -g
```

useage：

```bash
# Execute this command directly from the command line to compression, default compress a file with the extension xmas.js。
# -s Source code path, necessary parameters！
# -r Are inverting images, optional
# -i Specifies the path of the image, default ./resource/tree.png optional

$ js2image -s ./resource/jquery.js

# Added support for all packaged in a folder js files, caution! Packaging does not guarantee js100% after running properly, through manual testing to confirm.
$ js2image -s ./resource
```

# use in nodejs

run this commands：

```bash
$ npm install js2image --save
```

useage：

```javascript
var Js2Image = require('js2image');

var image = './resource/tree.png';
var source = './resource/jquery.js';
var target = './target/xmas.js';
var options = {};

// get the result code
var sourceCode = fs.readFileSync(source);
Js2Image.getCode(sourceCode, image, options).then(function (code) {
  // code为生成的代码
  console.log(code);
})

// or write into file
Js2Image.writeToFile(source, image, target, options).then(function (code) {
  // 生成的代码已被写入到文件target
  // code为生成的代码
  console.log(code);
});
```
