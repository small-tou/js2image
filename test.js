var Js2Image = require("./index.js");

//var ImageToStruct = require("./utils/image-to-struct.js");
////test image to struct
//ImageToStruct("./tree.png",{},function(err,struct){
//  console.log(struct)
//})

Js2Image.getCode("./resource/moment.js","./resource/tree.png",{}).then(function(code){
    console.log(code);
})

