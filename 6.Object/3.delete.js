/**
 * Created by Think on 2016/7/16.
 */

//
var book =  {
    name : 'Javascript ',
    author : 'nick'
}

delete book["name"];

for(var prop in book){
    console.log( prop );
}

// 当delete表达式删除成功或没有任何副作用时，总是返回true。
var o = {x:1};                  // o有一个属性x,并继承属性toString
delete o.x;                     // 删除x,返回true
delete o.x;                     // 什么都没有做(x已经不存在)，返回true
delete o.toString;              // 什么都没有做，（不能删除继承属性）
delete 1;                       // 无意义 返回true;

//      delete不能删除那些可配置性为false的属性（尽管可以通过删除不可扩展对象的属性）
// ，某些属性是不可配置的，这些情况下会返回false;
delete Object.prototype;        // 不能删除，属性是不可配置的
var x = 1;                      // 申明一个全局变量
delete this.x;                  // 不能删除这个属性
function f(){};                 // 声明一个全局函数
delete this.f;                  // 不能删除全局函数


var v = {
    "id" : ['studentid','type']
}