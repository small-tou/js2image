what's this?
=============

use this ,you can create a animate number increase；
 


usage
=============

first add npm package animate-num to your package.json

```

var AnimateToNum = require("animate-num");

var numAnim = new AnimateToNum({
  animTime:2000, //每次数字变动持续的时间，
  initNum:500, //初始化的数字
  callback:function(num){
    process.stdout.write('\u001B[2J\u001B[0;0f'); //清屏
    console.log(num);
  }
});
var num = 0;
//产生随机数，然后滚动到这个数字；
setInterval(function(){
  num = num + Math.floor(Math.random()*1000)
  numAnim.toNum(num);
},5000)

```

