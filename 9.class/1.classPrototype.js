/**
 * Created by Think on 2016/9/9.
 */

/**
 * 通过原型继承创建一个新对象
 * inherit()返回一个继承自原型对象p的属性的新对象
 * 这里使用ECMAScript 5中的Object.reate()函数（如果存在的话）
 * 如果不存在Object.crate()。则退化使用其他方法
 * @param p
 */
function inherit(p){
    if( p == null ) throw TypeError();      // p是一个对象,但是不能是null;
    if(Object.create){                      // 如果Object.create()存在
        return Object.create(p);            // 直接使用它
    }
    var t = typeof p;                       // 否则进一步检测
    if( t !== "object" && t!== "function" ) throw TypeError();

    function f(){};                         // 定义空的构造函数
    f.prototype = p;                        // 将其原型设置为p
    return new f();                         // 使用f()创建继承对象
}

// range.js: 实现一个能表示值的范围的类

// 这个工厂方法翻一个新的"范围对象"
function range(from ,to ){
    // 使用inherit()函数来创建对象，这个对象继承自在下面定义的原型对象
    // 原型对象作为函数的一个属性存储，并定义所有"范围对象"多共享的访问(行为)
    var r = inherit(range.methods);

    // 存储新的"范围对象"的起始为止和结束位置(状态)
    // 这个两个属性是不可继承的，每个对象都有唯一的属性
    r.from = from;
    r.to   = to;

    // 返回这个新创建的对象
    return r;
}

// 原型对象定义方法，这些方法为每个范围对象所继承
range.methods =  {
    //  如果x在范围内，则返回true,否则返回false
    //  这个方法可以比较数字范围，有可以比较字符串和日期范围
    includes : function(x) {
        return this.from <= x && x <= this.to;
    },

    // 对于范围内的每个整数都调用一次f
    foreach : function(f){
        for (var x = Math.ceil(this.from); x <= this.to; x++) f(x);
    },

    // 返回表示这个范围的字符串
    toString : function() { return "(" + this.from + "..." + this.to + ")"; }
}

var r = range(1,3);             // 创建一个范围对象
r.includes(2);                  // => true: 2 在这个范围内
r.foreach(console.log)          // 输出:1,2,3
console.log(r);                 // 输出:(1..3)

