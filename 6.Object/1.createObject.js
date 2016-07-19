/**
 * 使用对象对象直接量，创建对象
 */
var empty = {};                             // 没有任何属性的对象
var point = { x:0, y:0 };                   // 两个属性
var point2 = { x: point.x, y : point.y }    // 更复杂的值
var book = {
    "main titel" : "Javacript ",            // 属性里有空格，必须用字符串表示
    'sub-ttile' : "The definitve Guide",    // 属性名称里有连字符、必须用字符串表示
    'for' : "all audiences",                // "for"是保留字，因此必须用引号
    author : {                              // 这个属性的值是一个对象
        firstname : "Davide",               // 注意这个属性名都没有引号
        surname: "Flanagan"
    }
}

/**
 * 通过new创建对象
 */
var o = new Object();                       // 创建一个空对象，和{}一样
var a = new Array();                        // 创建一个空数组，和[]一样
var d = new Date();                         // 创建一个表示当前时间的Date对象
var r = new RegExp("js");                   // 创建一个可以进行模式


/**
 * Object.create() 创建对象
 */
var o1 = Object.create( {x:1,y:2} );       // o1继承了属性x和y
var o2 = Object.create(null);              // 02不继承任何属性和方法  toString()方法也不继承
var o2 = Object.create(Object.prototype);  // 03和{} 和new Object()一样都继承自Object


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

var o = { x　: "don't change this value" }
libary_function(inherit(o));                // 防止对0的意外修改








