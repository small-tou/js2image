var Promise = require("bluebird");


/**
 * 保留字符在一行的一个对象
 * @type {{}}
 */
module.exports = {
    /**
     * 把需要保留在一行的字符串从整个字符串中抠出来，用占位符替换
     * @param str
     * @returns {*}
     */
    pickFromCode: function (str) {
        return pickFromCode(str);
    },
    result: result,
    /**
     * 从pickFromCode把不能分离的行替换回来，另外对字符串以5个字符为单位做了分离处理，防止字符串太长影响效果。
     * @param lines
     */
    findBack: function (lines) {
        return findBack(lines);
    }

}
var result = {}
/**
 把字符串中的字符串正则都提取出来，用占位符表示。之后可以替换回来
 */
var PREFIX = "pic_and_code_to_ascii_"
var placeholderIndex = 0;
var double_operator = ["==", ">=", "<=", "+=", "-=", "*=", "/=", "%=", "++", "--", "&&", "||", ">>", "<<"]
var three_operator = ['===', '!==']

var other_operator = ['return function', 'throw new Error']
/**
 return o.call(e,t)
 return!c(n,e)
 return h.call(e)==="[object Array]"
 return typeof e==="function"
 return String(e).replace(/[&<>"'\/]/g,function(e){return v[e]})
 return[new RegExp(p(e[0]
 return this.tail===""
 return"script";


 return[^a-zA-Z_0-1][a-zA-Z_0-1]+
 */
//根据正则保留在一行。
var reg_operator = [
    {
        start: "return\"",
        reg: /^return".*?"/ // return "d" 或者 return ""
    },
    {
        start: "return\'",
        reg: /^return'.*?'/  // return 'd' 或者 return ''
    }, {
        start: "return\/",
        reg: /^return\/.+?\/[igm]*/  // return//g 或者 return ''
    },
    {
        start: "return",
        reg: /^return[^a-zA-Z_0-1"'};][a-zA-Z_0-1.]+/ // return 0.1 或者 return function 或者return aaabb
    },
    {
        start: "throw",
        reg: /^throw [a-zA-Z_0-1]+?/ //throw new 或者 throw obj
    }
]
//向前补全 ddd++ 的情况
var findPrevNotABC = function (str, index) {
    var i = index;
    var s;
    do {
        i--;
        s = str.charAt(i);
    } while(/[a-zA-Z_0-9]/.test(s))
    return i + 1;
}

function createPlaceholder () {
    return " " + PREFIX + (placeholderIndex++) + " ";
}

function pickFromCode (str) {

    //从代码字符串里把所有引号里的字符串和正则抠出来。
    var pickStart_double = 0;
    var pickEnd_double = 0;
    var pickStart_single = 0;
    var pickEnd_single = 0;
    var pickStart_reg = 0;
    var pickEnd_reg = 0;
    var is_in_double_quot = false;
    var is_in_single_quot = false;
    var is_in_reg = false;
    var is_in_other = false;
    var pickStart_other = 0;
    var pickEnd_other = 0;
    var strs = []

    //进入状态机
    for(var i = 0; i < str.length; i++) {
        var now_char = str[i];
        var last_char = i > 0 ? str[i - 1] : null;
        var last_two_char = i > 1 ? str[i - 2] : null;
        var last_three_char = i > 2 ? str[i - 3] : null;
        var last_four_char = i > 3 ? str[i - 4] : null;
        var next_char = i < (str.length - 1) ? str[i + 1] : null;
        var next_two_char = i < (str.length - 2) ? str[i + 2] : null;
        var next_three_char = i < (str.length - 3) ? str[i + 3] : null;


        /**
         * 不在正则，不在引号之内，检查是否存在operator
         */
        if(!is_in_reg && !is_in_double_quot && !is_in_single_quot) {


            if(three_operator.indexOf(now_char + next_char + next_two_char) != -1) {
                pickStart_other = i;
                pickEnd_other = i + 2;
                i += 2;
                strs.push({
                    value: str.substring(pickStart_other, pickEnd_other + 1),
                    type: "other",
                    start: pickStart_other,
                    end: pickEnd_other
                })
                continue;
            } else if(double_operator.indexOf(now_char + next_char) != -1) {
                pickStart_other = i;
                pickEnd_other = i + 1;
                if(now_char + next_char == "++" || now_char + next_char == "--") {
                    pickStart_other = findPrevNotABC(str, i);
                } else {

                }

                i += 1;
                strs.push({
                    value: str.substring(pickStart_other, pickEnd_other + 1),
                    type: "other",
                    start: pickStart_other,
                    end: pickEnd_other
                })
                continue;
            }
            /**
             function(){
          return
          function(){}
        } 报错处理
             */
            other_operator.forEach(function (o) {
                var s = str.substr(i, o.length)
                if(s == o) {
                    pickStart_other = i;
                    pickEnd_other = i + o.length - 1;
                    i += o.length - 1;
                    strs.push({
                        value: str.substring(pickStart_other, pickEnd_other + 1),
                        type: "other",
                        start: pickStart_other,
                        end: pickEnd_other
                    })
                }
            })
            //根据正则保留的处理
            reg_operator.forEach(function (o) {
                var start = o.start;
                var reg = o.reg;
                var s = str.substr(i, start.length)
                if(s == start) {
                    //符合此正则，进入正则判断逻辑
                    var sub = str.substring(i, str.length - 1);
                    var match = sub.match(reg);
                    if(match) {
                        var m = match[0];
                        var s = str.substr(i, m.length)
                        if(s == m) {
                            pickStart_other = i;
                            pickEnd_other = i + m.length - 1;
                            i += m.length - 1;
                            strs.push({
                                value: str.substring(pickStart_other, pickEnd_other + 1),
                                type: "other",
                                start: pickStart_other,
                                end: pickEnd_other
                            })
                        }
                    }
                }
            })

            //处理小数点。 0.11 11.2233
            if(now_char == ".") {
                //往前找数字
                var prev_nums = [];
                var nowI = i;
                nowI--;
                var c = nowI > 0 ? str[nowI] : null;
                while(/[0-9]/.test(c)) {
                    prev_nums.unshift(c);
                    nowI--;
                    c = nowI > 0 ? str[nowI] : null;
                }
                //往后找数字
                var next_nums = [];
                var nowI = i;
                nowI++;
                var c = nowI < (str.length - 1) ? str[nowI] : null;
                while(/[0-9]/.test(c)) {
                    next_nums.push(c);
                    nowI++;
                    c = nowI < (str.length - 1) ? str[nowI] : null;
                }
                if(prev_nums.length || next_nums.length) {
                    var start = i - prev_nums.length;
                    var end = i + next_nums.length;
                    strs.push({
                        value: str.substring(start, end + 1),
                        type: "other",
                        start: start,
                        end: end
                    })
                }

            }

        }
        //如果现在不在字符串里。
        if(!is_in_single_quot && !is_in_double_quot) {
            if(!is_in_reg) {
                if(now_char == "/" && last_char != "<" && !/[0-9a-zA-Z_)\]]/.test(last_char)) {
                    //探测到字符串引号出现，首先判断不是转义的。
                    if(last_char != "\\" && last_char != "\"" && last_char != "\'") {
                        pickStart_reg = i;
                        is_in_reg = true;
                    }
                }
            } else {
                //如果现在在字符串里
                if(now_char == "/") {
                    //探测到字符串出现，首先判断不是转义的。
                    if(last_char != "\\" ||
                      (last_char == "\\" && last_two_char == "\\" && last_three_char != "\\")
                      || (last_char == "\\" && last_two_char == "\\" && last_three_char == "\\" && last_four_char == "\\")) { //
                        pickEnd_reg = i;
                        is_in_reg = false;
                        if("gim".indexOf(next_char) != -1) {
                            pickEnd_reg++;
                            if("gim".indexOf(next_two_char) != -1) {
                                pickEnd_reg++;
                                if("gim".indexOf(next_three_char) != -1) {
                                    pickEnd_reg++;
                                }
                            }
                        }
                        strs.push({
                            value: str.substring(pickStart_reg, pickEnd_reg + 1),
                            type: "reg",
                            start: pickStart_reg,
                            end: pickEnd_reg
                        })
                    }
                }
            }
        }
        //如果现在不在字符串里。
        if(!is_in_single_quot && !is_in_reg) {
            if(!is_in_double_quot) {
                if(now_char == "\"") {
                    //探测到字符串引号出现，首先判断不是转义的。
                    if(last_char != "\\") {
                        pickStart_double = i;
                        is_in_double_quot = true;
                    }
                }
            } else {
                //如果现在在字符串里
                if(now_char == "\"") {
                    //探测到字符串引号出现，首先判断不是转义的。
                    if(last_char != "\\" || (last_char == "\\" && last_two_char == "\\" && last_three_char != "\\")) {
                        pickEnd_double = i;
                        is_in_double_quot = false;
                        strs.push({
                            value: str.substring(pickStart_double, pickEnd_double + 1),
                            type: "double",
                            start: pickStart_double,
                            end: pickEnd_double
                        })
                    }
                }
            }
        }

        if(!is_in_double_quot && !is_in_reg) {
            if(!is_in_single_quot) {
                if(now_char == "\'") {
                    //探测到字符串引号出现，首先判断不是转义的。
                    if(last_char != "\\") {
                        pickStart_single = i;
                        is_in_single_quot = true;
                    }
                }
            } else {
                //如果现在在字符串里
                if(now_char == "\'") {
                    //探测到字符串引号出现，首先判断不是转义的。
                    if(last_char != "\\" || (last_char == "\\" && last_two_char == "\\" && last_three_char != "\\")) {
                        pickEnd_single = i;
                        is_in_single_quot = false;
                        strs.push({
                            value: str.substring(pickStart_single, pickEnd_single + 1),
                            type: "single",
                            start: pickStart_single,
                            end: pickEnd_single
                        })
                    }
                }
            }
        }

    }
    //处理下，把str中的相应部分都替换成占位符
    var str_arr = str.split("");
    var str_result = "";
    var start_offset = 0;
    result = {}
    for(var i in strs) {
        var s = strs[i];
        var placehoder = createPlaceholder();
        str_result += str.substring(start_offset, s.start);
        str_result += placehoder;
        s.placehoder = placehoder;
        start_offset = s.end + 1;
        result[placehoder] = s;
    }
    // console.log(result)
    str_result += str.substring(start_offset, str.length - 1);
    return str_result;
}


var findBack = function (lines) {
    var self = this;
    for(var i = 0; i < lines.length; i++) {
        var line = lines[i];

        if(line.indexOf(PREFIX) != -1) {
            var line_data = result[" " + line + " "];//找回占位符的数据
            if(line_data.type == "double") {

                if(lines[i + 3] == ":") {
                    //如果是 "dd":"dd" 不处理
                    lines.splice(i, 1, line_data.value)
                } else {
                    var arr = splitDoubleQuot(line_data.value); //拆分一下字符串
                    lines.splice(i, 1);
                    arr.forEach(function (a, n) {
                        lines.splice(i + n, 0, a) //把数据插回去
                    })
                }


            } else if(line_data.type == "single") {
                // var arr = self.splitSingleQuot(line_data.value); //拆分一下字符串
                if(lines[i + 3] == ":") {
                    //如果是 "dd":"dd" 不处理
                    lines.splice(i, 1, line_data.value)
                } else {
                    var arr = splitSingleQuot(line_data.value); //拆分一下字符串
                    lines.splice(i, 1);
                    arr.forEach(function (a, n) {
                        lines.splice(i + n, 0, a) //把数据插回去
                    })
                }
            } else {
                lines.splice(i, 1, line_data.value)
            }
        }
    }
}

var splitDoubleQuot = function (str) {
    str = str.replace(/\\\\/g, "☃")
    var r = [];
    //把字符串分成三个三个的。例如"abcd" 编程 "acb"+"d"
    var s = str.substring(1, str.length - 1)
    var len = s.length;
    var cut_len = Math.ceil((len) / 5);
    r.push("(")
    var last_cursor = 0;

    while(last_cursor < len) {
        var l = 5;

        if(s.charAt(last_cursor + l - 1) == "\\") { //处理\a
            l++;
            if(s.charAt(last_cursor + l - 1) == "\\") { //处理 \\\
                l++;
            }
        }
        //处理\x0a
        if(s.charAt(last_cursor + l - 1) == "x" && s.charAt(last_cursor + l - 2) == "\\") {
            l += 2;
        }
        var n = s.substring(last_cursor, last_cursor + l)
        last_cursor = last_cursor + n.length;
        n = n.replace(/☃/g, "\\\\");
        r.push("\"" + n + "\"")

        r.push("+")
    }

    if(len == 0) {
        r.push('""')
    } else {
        r.pop()
    }
    r.push(")")
    return r;
}
var splitSingleQuot = function (str) {
    str = str.replace(/\\\\/g, "☃")
    var r = [];
    //把字符串分成三个三个的。例如"abcd" 编程 "acb"+"d"
    var s = str.substring(1, str.length - 1)
    var len = s.length;
    var cut_len = Math.ceil((len) / 5);
    r.push("(")
    var last_cursor = 0;

    while(last_cursor < len) {
        var l = 5;
        if(s.charAt(last_cursor + l - 1) == "\\") { //处理\a
            l++;
            if(s.charAt(last_cursor + l - 1) == "\\") { //处理 \\\
                l++;
            }
        }
        if(s.charAt(last_cursor + l - 1) == "x" && s.charAt(last_cursor + l - 2) == "\\") {
            l += 2;
        }
        var n = s.substring(last_cursor, last_cursor + l)
        last_cursor = last_cursor + n.length;
        n = n.replace(/☃/g, "\\\\");
        r.push("\'" + n + "\'")


        r.push("+")
    }

    if(len == 0) {
        r.push("''")
    } else {
        r.pop()
    }
    r.push(")")
    return r;
}