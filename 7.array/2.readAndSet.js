/**
 * Created by Think on 2016/7/16.
 */
var o = {};
o[1]        = '1';              // 创建一个普通的对象
o[2]        = '2';              // 用一个整数来索引它

o[-1.23]    = true;             // 创建一个名为"-1.23"的属性
o[1.000]    = '1';              // 和a[1]相等
console.log(o);

// 以下是[]操作符该语法的使用
var a     = ["wrod"];           // 从一个元素的数组开始
var value = a[0];               // 读取第0个元素
a[1]      = 3.14;               // 写1个元素

var i     = 2;
a[i]      = 3;                  // 写第二个元素
a[i+1]    = "helll0";           // 写第三个元素
a[a[i]]   = a[0];               // 读第零个到第二个元素，写第三个元素




