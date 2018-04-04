
var UglifyJS = require("uglify-js");
var fs = require("fs");
var Promise = require("bluebird");
module.exports = function(source,callback){
    return new Promise(function(resolve,reject){
        try{
            var ast = UglifyJS.parse(source);
            ast.figure_out_scope();
            ast.compute_char_frequency();
            ast.mangle_names();
            var code = ast.print_to_string();
            resolve(code);
        }catch(e){
            console.log('js minify error:',e);
            reject(e);
        }
    })
};