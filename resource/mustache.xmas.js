(function(e,t){if(typeof exports ===  ("objec"+"t")  && exports){t(exports)}else
{var r={};t(r);if(typeof define ===  ("funct"+"ion")  && define.amd){define(r)}
else{e.Mustache=r}}})(this,function(e){var t=  /\s*/ ;var r= /\s+/ ;var n= /\S/ ;
var i= /\s*=/ ;var s= /\s*\}/ ;var a=   /#|\^|\/|>|\{|&|=|!/ ;var o=RegExp
.prototype.test;function c(e,t){ return o.call    (e,t)}function l(e){ return!c (n
,e)}var h=Object.prototype.toString;var      u=Array.isArray || function(e){ 
return h.call (e) ===  ("[obje"+"ct Ar"+      "ray]") };function f(e){ 
return typeof  e ===  ("funct"+"ion") }        function p(e){ return e.replace
 ( /[\-\[\]{}()*+?.,\\\^$|#\s]/g , ("\\$&"         ) )}var v={ "&" : ("&amp;") , "<"
 : ("&lt;") , ">" : ("&gt;") , '"' : (           "&quot"+";") , "'" : ("&#39;")
 , "/" : ("&#x2F"+";") };function g(e)             { return String (e).replace( 
/[&<>"'\/]/g ,function(e){ return v [               e]})}function w(e){if(!u(e) ||
 e.length !== 2){ throw new Error (                   ("Inval"+"id ta"+"gs: ") +e
)} return[new  RegExp(p(e[0])+ (                    "\\s*") ),new RegExp( ("\\s*"
) +p(e[1]))]}function d(n,o){o=o                        || e.tags;n=n ||  ("") ;if
(typeof o ===  ("strin"+"g")                           ){o=o.split(r)}var c=w(o);
var h=new b(n);var u=[];var                               f=[];var v=[];var g=false
;var d=false;function x(){  if                             (g && !d){while(v.length
){delete f[v.pop()]}}else{v=[] }                         g=false;d=false}var U,
m,E,T,j,C;while(!h.eos()){U=h.pos;                           E=h.scanUntil(c[0]);
if(E){for(var A=0,R=E.length;A<R;                     ++   A){T=E.charAt(A);if(l(T
)){v.push(f.length)}else{d=true}                      f.push([ ("text") ,T,U,U+1]
);U += 1;if(T ===  ("\n") ){x(                         )}}}if(!h.scan(c[0]))break
;g=true;m=h.scan(a) ||  (                            "name") ;h.scan(t);if(m ===
  ("=") ){E=h.scanUntil(i)                               ;h.scan(i);h.scanUntil(c
[1])}else if(m ===  ("{"                                   ) ){E=h.scanUntil(new 
RegExp( ("\\s*") +p( ("}"                                     ) +o[1])));h.scan(s);
h.scanUntil(c[1]);m=    ("&"                                    ) }else{E=h.scanUntil
(c[1])}if(!h.scan(c    [1]                                      )){ throw new Error
 ( ("Unclo"+"sed t"+  "ag at"                                   +" ") +h.pos)}j=[m
,E,U,h.pos];f.push(j);if(m ===                          ("#")     || m ===  ("^") 
){u.push(j)}else if(m ===  (                          "/") ){C=u.pop();if(!C){ 
throw new Error ( ('Unope'+                           'ned s'+'ectio'+'n "') +E+ 
('" at ') +U)}if(C[1] !==                               E){ throw new Error ( (
'Unclo'+'sed s'+'ectio'                                 +'n "') +C[1]+ ('" at ') 
+U)}}else if(m ===                                        ("name")  || m ===  ("{"
)  || m ===  ("&")                                          ){d=true}else if(m ===
  ("=") ){c=w(o=E                                              .split(r))}}C=u.pop(
);if(C){   throw new Error     (                                           ('Unclo'+'sed s'+
'ectio'+'n "'  ) +C   [1]                                            + ('" at ') +h.pos
)} return y (k(f)  )} function                            k(    e){var t=[];var r,n;
for(var i=0,s=e.length; i<s; ++ i      ){           r=e[i];if  (r){if(r[0] ===  (
"text")  && n && n[0] ===  ("text") ){n     [1] +=  r[1];n[3]=r[3]}else{t.push(r);n=r
}}} return t }function y(e){var t=[];var      r=t;var n=[];var i,s;for(var a=0,o=e
.length;a<o; ++ a){i=e[a];switch(i[0]){      case "#" :case "^" :r.push(i);n.push
(i);r=i[4]=[];break;case "/" :s=n.pop(       );s[5]=i[2];r=n.length>0?n[n.length-
1][4]:t;break;default:r.push(i)}} return t       }function b(e){this.string=e;this.
tail=e;this.pos=0}b.prototype.eos=function(){ return this.tail  ===  ("") };b.

prototype.scan=function(e){var t=this.tail.match(e);if(t && t.index === 0){var r=t
[0];this.tail=this.tail.substring(r.length);this.pos += r.length; return r } 
return"" };b.prototype.scanUntil=function(e){var  t=this.tail.search(e),r;switch(t)
{case-1:r=this.tail;this.tail= ("") ;break;case   0:r= ("") ;break;default:r=this.
tail.substring(0,t);this.tail=this.tail.   substring(t)}this.pos += r.length
; return r };function x(e,t){this.view=e ==      null?{}:e;this.cache={ "." :this
.view};this.parent=t}x.prototype.      push=function(e){ return new  x(
e,this)};x.prototype.lookup=function(e){var         t;if(e in this.cache){t=this.
cache[e]}else{var r=this;while(r){if(e.         indexOf( (".") )>0){t=r.view;var
 n=e.split( (".") ),i=0;while(t!=null &&            i<n.length){t=t[n[ i++ ]]}}else
{t=r.view[e]}if(t!=null)break;r=r.parent             }this.cache[e]=t}if(f(t)){t=t.
call(this.view)} return t };function                U(){this.cache={}}U.prototype
.clearCache=function(){this.cache={                  }};U.prototype.parse=function
(e,t){var r=this.cache;var n=r[e]                    ;if(n == null){n=r[e]=d(e,t)
} return n };U.prototype.                       render=function(e,t,r){var 
n=this.parse(e);var i=t                           instanceof x?t:new x(t); 
return this.renderTokens (n                              ,i,r,e)};U.prototype.
renderTokens=function(t,r,  n,                             i){var s= ("") ;var 
a=this;function o(e){  return a.render                          (e,r,n)}var c,l;for(var
 h=0,p=t.length;h<p; ++ h){c=t[h];                           switch(c[0]){case "#"
 :l=r.lookup(c[1]);if(!l)continue;                    if(  u(l)){for(var v=0,g=l.
length;v<g; ++ v){s += this.                      renderTokens(c[4],r.push(l[
v]),n,i)}}else if(typeof l ===                           ("objec"+"t")  || typeof
 l ===  ("strin"+"g") ){s +=                             this.renderTokens(c[4],r
.push(l),n,i)}else if(f(l)                               ){if(typeof i !==  (
"strin"+"g") ){                                    throw new Error ( (
"Canno"+"t use"+" high"                                     +"er-or"+"der s"+
"ectio"+"ns wi"+"thout"   +                                    " the "+"origi"+
"nal t"+"empla"+"te"    ) )                                      }l=l.call(r.view,i
.slice(c[3],c[5]),o);if(  l!=null                                   )s += l}else{s += 
this.renderTokens(c[4],r,n,i)}                        break;   case "^" :l=r.lookup
(c[1]);if(!l || u(l) && l.                          length === 0){s += this.
renderTokens(c[4],r,n,i)}                           break;case ">" :if(!n)
continue;l=this.parse(f(n                              )?n(c[1]):n[c[1]]);if(
l!=null)s += this.                                 renderTokens(l,r,n,i);break
;case "&" :l=r.lookup                                      (c[1]);if(l!=null)s += 
l;break;case "name"                                          :l=r.lookup(c[1]);if(
l!=null)s += e.                                              escape(l);break;case
 "text" :s +=   c    [1                                          ];break}} return s
 };e.name=   (   "musta"                                            +"che.j"+"s") ;e
.version= ("0.8.0"  ) ;e. tags=                           [ (    "{{") , ("}}") ];var
 m=new U;e. clearCache=function      ()           {   return m.clearCache (
)};e.parse=function(e,t){ return m.parse      (e,t )};e.render=function(e,t,r){ 
return m.render (e,t,r)};e.     to_html=function(t,r,n,i){var s=e.
render(t,r,n);if(f(i)){i(s)}else{       return s }};e.escape=g;e.Scanner=b;e
.Context=x;e.Writer=U})       
      


