var fs = require("fs");
var ImageToStruct = require("./utils/image-to-struct.js");
var JSMin = require("./utils/js-min.js");
var KeepLine = require("./utils/keep-line.js");
var Promise = require("bluebird");

var Js2Image = function(jsPath,imagePath,options,callback){
    ImageToStruct(imagePath,options).then(function(struct){
        JSMin(jsPath).then(function(code){
            //提取不换行的字符串
            var hold_code = KeepLine.pickFromCode(code);
            //分离代码，以可分割单位拆分成数组。
            var lines = hold_code.replace(/([^a-zA-Z_0-9=!|&])/g,"\n$1\n").split("\n");
            //把分离后的代码里的占位符替换回代码。
            KeepLine.findBack(lines);
            var result = "";
            while(lines.length>0){
                //循环往struct里填充代码
                struct.forEach(function(s){
                    var chars_arr = s.replace(/ +/g," ");//一行有多组分离的*****
                    var r = s;
                    chars_arr.split(/ +/).forEach(function(chars){
                        if(chars.length == 0){
                            return;
                        }
                        var char_count = chars.length;
                        var l = pickFromLines(lines,char_count);

                        r = r.replace(chars,function(){
                            return l;
                        })
                    })
                    result += r+"\n"
                })

            }
            //result就是最终的代码
            callback(null,result);
        });
    })



    
}

module.exports = {
    /**
     *
     * @param jsPath
     * @param imagePath
     * @param outputPath
     * @param options
     * @param callback
     */
    writeToFile:function(jsPath,imagePath,outputPath,options){

        return new Promise(function(resolve,reject){
            Js2Image(jsPath,imagePath,options,function(e,code){
                fs.writeFileSync(outputPath,code,'utf-8');
                resolve(code);
            })
        })
    },
    getCode:function(jsPath,imagePath,options){
        return new Promise(function(resolve,reject){
            Js2Image(jsPath,imagePath,options,function(e,code){
                resolve(code);
            })
        })

    }
};
/**
 * 从lines数组里顺序取字符来填充到指定的长度，不一定精确。
 * @param count
 * @returns {string}
 */
function pickFromLines(lines,count){

    var t = "";
    var has_pick_count = 0; //取了多少次
    var now_length = 0; //当前填充的长度
    for(var i =0;i<lines.length;i++){
        var l = lines[i];
        now_length += l.length;
        has_pick_count ++;
        if(now_length>count){
            if(now_length - count >3&&has_pick_count>1){
                //如果长度超长太多，去掉最后一个填充进来的字符串。
                has_pick_count--;
            }
            break;
        }
    }
    for(var i =0;i<has_pick_count;i++){
        var s = lines.shift();
        t += s;
    }
    return t;
}