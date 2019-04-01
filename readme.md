<p align="center">
  <b>Thanks to Souche Inc. which provides the server to hold an online service.</b>
  <br><br>
  <a href="https://e.coding.net/?utm_source=yutou&utm_medium=banner&utm_campaign=march2019" target="_blank">
    <img alt="Souche Inc." src="https://img.souche.com/test/e529f5d63ba019edb9d6ce2c19fab894.jpg" >
  </a>
</p>

ENGLISH DOC :[click me](https://github.com/xinyu198736/js2image/blob/master/readme_en.md)

EN summary: a Tool that can compress js source code to any ascii image,after that the result code can still run normal

**警告：压缩后的js请人工确认后再投入生产使用，不保证100%可运行，目前测试的js以及souche.com官网的js都已经试验过，基本可以保证99%的js压缩后没有问题

# who am i?

**js2image** 是一个可以把`js源代码`压缩成一个`ascii字符画`的源代码的工具，它的特色是压缩后的代码仍可运行，而不是简单的拼成最终的图案。

关于js2image的原理可以见我写的这篇详解文章：[圣诞节，把网站所有的js代码都压缩成圣诞树吧。](https://zhuanlan.zhihu.com/p/20439979)

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

$ js2image -s ./resource/jquery.js -i ./resource/tree.png
```

# 注意

* 图片需要是白底的，不能是透明的
* 不支持 windows 系统

# 在Node.js中使用

执行以下命令安装模块：

```bash
$ npm install js2image --save
```

使用方法（见 example/test.js ）：

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

**关于 options 可用值（可以调节像素等参数）**:

  **Size Options**:
  
    - `pxWidth` (Number): The pixel width used for aspect ratio (default: `2`).
    - `size` (Object): The size of the result image (ASCII art)—interpreted by
      [`compute-size`](https://github.com/IonicaBizau/compute-size):
      - `height` (Number|String): The height value (default: `"100%"`).
      - `width` (Number|String): The width value (default: computed value to
         keep aspect ratio). This is optional if the height is provided.
    - `size_options` (Object): The options for
      [`compute-size`](https://github.com/IonicaBizau/compute-size):
      - `screen_size` (Object): The screen size (defaults to terminal width
      and height):
          - `width` (Number): The screen width.
          - `height` (Number): The screen height.
      - `px_size` (Object): The pixel size.
          - `width` (default: `1`)
          - `height` (default: `1`)
      - `preserve_aspect_ratio` (Boolean): If `false`, the aspect ratio will
        not be preserved (default: `true`).
      - `fit_screen` (Boolean): If `false`, the result size will not fit to
        screen (default: `true`).
  
   **Matrix asciifier options**:
   
    - `stringify` (Boolean): If `false`, the pixel objects will not be
      stringified.
    - `concat` (Boolean): If `false`, the pixel objects will not be joined
      together.
  
   **Pixel asciifier options**:
  
    - `pixels` (Array|String): An array or string containing the characters
       used for converting the pixels in strings
       (default: `" .,:;i1tfLCG08@"`).
    - `reverse` (Boolean): If `true`, the pixels will be reversed creating a
       *negative image* effect (default: `false`).
    - `colored` (Boolean): If `true`, the output will contain ANSI styles
      (default: `true`).
    - `bg` (Boolean): If `true`, the **background** color will be used for
      coloring (default: false).
    - `fg` (Boolean): If `true`, the **foreground** color will be used for
      coloring (default: true).
    - `white_bg` (Boolean): Turn on the white background for transparent
      pixels (default: `true`).
    - `px_background` (Object): An object containing the `r` (red), `g`
      (green) and `b` (blue) values of the custom background color.
  
   **Other options**:
   
    - `image_type` (String): Use this to explicitely provide the image type.
    - `stringify_fn` (Function): A function getting the `pixels` matrix and
      the `options` in the arguments. Use this option to implement your own
      stringifier.

#others

有网友反馈某些电脑上会报错,还没搞清楚情况.
```
onverting ./resource/release.js
[Error: Could not execute GraphicsMagick/ImageMagick: gm "identify" "-ping" "-format" "%wx%h" "/usr/local/lib/node_modules/js2image/resource/tree.png" 
this most likely means the gm/convert binaries can't be found]
/usr/local/lib/node_modules/js2image/utils/image-to-struct.js:19
      var content = converted.replace(/\S\[0m/g,"").replace(/\n/g,"\",\n\"");
                             ^

TypeError: Cannot read property 'replace' of undefined
```
如遇此种情况,执行以下命令即可,至于是为毛,我也没搞清楚.
```
npm install -g replace
```
