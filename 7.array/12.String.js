/**
 * Created by Think on 2016/8/1.
 */

// charAt()方法来访问单个的字符以外，还可以使用方括号
var s = 'test';
s.charAt(0);    // =》 't'
s[1];           // => 'e'

// 字符串的行为类似于数组的事实，使得通用的数组方法可以应用与字符串上
var s = "javascript";
var s1 = Array.prototype.join.call(s," ");  //
console.log("##s1:",s1);

var s2 = Array.prototype.filter.call(s,function(x){
    return x.match(/[^aeiou]/);             // 只匹配非元音字母
})
console.log("##s2:",s2);