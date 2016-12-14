
var ImageToAscii = require("image-to-ascii");
var fs = require("fs");
var _ = require("underscore");
var Promise = require("bluebird");
var path = require("path");
/**
 * 将图片转换成一个可以用来处理的数组结构，用特殊字符填充结构形成字符画。
 * @param imagePath image path
 * @param options {reverse:true/false}
 */
module.exports = function(imagePath,options,callback){
  if(!imagePath){
    imagePath = path.join(__dirname , "./../resource/tree.png");
  }
  return new Promise(function(resolve,reject){
    ImageToAscii(imagePath, _.extend({colored:false,pixels:['☃',' '],reverse:false},options), function(err, converted) {
      if(err) return reject(err);
      var content = converted.replace(/\S\[0m/g,"").replace(/\n/g,"\",\n\"");
      var arr = [];
      converted.replace(/\S\[0m/g,"").split("\n").forEach(function(c){
        arr.push(c);
      })
      resolve(arr);
    });
  })


}