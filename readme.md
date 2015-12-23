**警告：压缩后的js请人工确认后再投入生产使用，不保证100%可运行，目前测试的js以及souche.com官网的js都已经试验过，基本可以保证99%的js压缩后没有问题

# who am i?

**js2image** 是一个可以把`js源代码`压缩成一个`ascii字符画`的源代码的工具，它的特色是压缩后的代码仍可运行，而不是简单的拼成最终的图案。

关于js2image的原理可以见我写的这篇详解文章：![圣诞节，把网站所有的js代码都压缩成圣诞树吧。](http://zhuanlan.zhihu.com/yutou/20439979)

# 压缩后的示例，亲测可用

http://f2e.souche.com/assets/js/lib/jquery-2.1.1.min.xmas.js

另外,本项目resource目录中有多个已经跑通过的测试库文件。

压缩效果如下：

![js2image压缩效果图](http://7o52oq.com2.z0.glb.qiniucdn.com/Slice%201.png)


# 安装依赖的系统模块 graphicsmagick

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

# 命令行工具使用方法

执行以下命令安装全局命令：

```bash
$ npm install js2image -g
```

使用方法：

```bash
# 直接在命令行里执行此命令即可压缩，默认压缩出一个xmas.js后缀的文件。
# -s 源代码路径 必须的参数！
# -r 是否反相图像 可省
# -i 指定使用的图片的路径，默认使用 ./resource/tree.png 可省

$ js2image -s ./resource/jquery.js

# 新增支持打包一个文件夹内所有js文件，慎用！不保证打包后的js100%运行正常，请经过人工测试确认。
$ js2image -s ./resource
```

# 在Node.js中使用

执行以下命令安装模块：

```bash
$ npm install js2image --save
```

使用方法：

```javascript
var Js2Image = require('js2image');

var image = './resource/tree.png';
var source = './resource/jquery.js';
var target = './target/xmas.js';
var options = {};

// 获取结果的code
var sourceCode = fs.readFileSync(source);
Js2Image.getCode(sourceCode, image, options).then(function (code) {
  // code为生成的代码
  console.log(code);
})

// 或者直接写入文件
Js2Image.writeToFile(source, image, target, options).then(function (code) {
  // 生成的代码已被写入到文件target
  // code为生成的代码
  console.log(code);
});
```
