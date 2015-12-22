var ImageToJS = require("./index.js");

//var ImageToStruct = require("./utils/image-to-struct.js");
////test image to struct
//ImageToStruct("./tree.png",{},function(err,struct){
//  console.log(struct)
//})

ImageToJS.getCode("./source.js","./tree.png",{},function(e,code){
    console.log(code);
})

