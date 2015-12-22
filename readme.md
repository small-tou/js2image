> PS:还有少许bug，一些基本的代码肯定可以用了，一些比较复杂的框架还需要再修正一下，后续会出一篇原理文章，欢迎star，follow。

#who am i?

image-to-js 是一个 用指定图片来把一个js源代码压缩成一个可视化形式的源代码的工具，它的特色是压缩后的代码仍可运行，而不是简单的拼成最终的图案。

#压缩后的示例，亲测可用

http://f2e.souche.com/assets/js/lib/jquery-2.1.1.min.xmas.js



#全局命令使用

````
npm install image-to-js -g; #全局使用

````

````
/**
* 直接在命令行里执行此命令即可压缩，默认压缩出一个xmas.js后缀的文件。
* -s 源代码路径
* -r 是否反相图像
* -i 指定使用的图片的路径，默认使用 ./resource/tree.png
*/
image-to-js -s ./resource/source.js
````


#直接在nodejs中使用

````
var ImageToJS = require("./index.js");
//获取结果的code
ImageToJS.getCode("./resource/source.js","./resource/tree.png",{}).then(function(code){
    console.log(code);
})
//或者直接写入文件
ImageToJS.writeToFile("./resource/source.js","./resource/tree.png",{}).then(function(code){

});


````