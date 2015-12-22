var ImageToJS = require("./index.js");

//var ImageToStruct = require("./utils/image-to-struct.js");
////test image to struct
//ImageToStruct("./tree.png",{},function(err,struct){
//  console.log(struct)
//})

ImageToJS.getCode("./resource/source.js","./resource/tree.png",{}).then(function(code){
    console.log(code);
})

