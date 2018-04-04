var Js2Image = require("./../index.js");
var path = require("path");
var source = "./../resource/jquery.js";
var image = path.join(__dirname,"./../resource/happy.png");
var out = source.replace(".js",".xmas.js");

Js2Image.writeToFile(source,image,out,{
    reverse:false,
    size:{
        width:70
    }
}).then(function(code){

});

