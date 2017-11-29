/**
 * Created by Think on 2016/7/24.
 */
// 表示值的范围类：构造函数实现方式

// 这个是一个构造函数，用以初始化新创建的"范围对象"
// 注意，这里并没有创建并返回一个对象，仅仅是初始化
function Range(from,to){
    // 存储"范围对象"的起始位置和结束位置（状态）
    // 这两个属性是不可继承的，每个对象都有唯一的属性
    this.from = from;
    this.to   = to;
}


// 所有的"范围对象"都继承自这个对象
// 注意，属性的名称必须是"prototype"
Range.prototype = {

    // 如果x在范围内，则返回ture,否则返回false
    // 这个方法可以比较数字范围，也可以比较字符串和日期为范围
    includes :function(x){ return this.from <= x && x <= this.to; },

    // 这个范围内的每个整数都调用一次f
    // 这个方法只可用于数字范围
    foreach : function(f){
        for(var x = Math.ceil(this.from); x <= this.to; x++) {
            f(x);
        }
    },

    // 返回表示这个范围的字符串
    toString : function(){
        return "(" + this.from + "....." + this.to + ")";
    }
}


var r = new Range(3, 5);
console.log( r.includes(4) );


// 一个用以定义简单的函数
function defineClass(constructor,                    // 用以设置实例的属性的函数
                     methods,                      // 实例的方法，复制至原型中
                     statics)                      // 类属性，复制至构造函数中
{
    if (methods) extend(constructor.prototype, methods);
    if (statics) extend(constructor.portotype, statics);
    return constructor;
}

// 这是Range类的另一个实现
var SimpleRange = defineClass(
    function(f,t){this.f = f; this.t = t;},
    {
        includes:function(x) {return this.f <= x && x <= this.t; },
        toString:function() { return this.f + "...." + this.t;}
    },
    {
        upto : function(t) {
            return new SimpleRange(o,t);
        }
    }
);















