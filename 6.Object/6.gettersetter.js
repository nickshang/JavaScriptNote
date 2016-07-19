/**
 * 属性getter和setter
 * Think on 2016/7/13.
 */
//定义存取器属性最简单的方法是使用对象直接量语法的一种扩展写法：
var o = {

    // 普通的数据属性
    data_prop : 'value',

    // 存取器属都是成对定义的函数
    get accessor_prop() {  return this.data_prop; },        // 函数体的结束和下一个方法或者属性之间用逗号分隔（不使用冒号）
    set accessor_prop(value) { this.data_prop = value; }

}

console.log("get:", o.accessor_prop);
//console.log("set:", o.accessor_prop('_value'));           // 疑问：不能访问
console.log("set:", o.accessor_prop);

var p = {
    // x和y是普通的可读写的数据属性
    x : 1.0,
    y : 1.0,

    // r是可读可写的存取器属性，他有getter和setter
    // 函数体结束后不要忘记带上逗号
    get r(){ return Math.sqrt(this.x*this.x + this.y*this.y); },

    set r(newValue) {
        var oldValue = Math.sqrt(this.x*this.x + this.y * this.y );
        var ratio = newValue / oldValue;
        this.x *= ratio;
        this.y *= ratio;
    },

    // theta是只读存取器属性，他只有getter方法
    get theta() { return Math.atan2(this.y,this.x);}

}

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


var q = inherit(p);                         // 创建一个继承getter和setter的新对象
q.x = 1, q.y = 1;                           // 给添加两个属性
console.log("q.r",q.r);                           // 可以使用继承的存取器属性
console.log("q.theta",q.theta);



// 属性setter , getter应用场景:智能监测属性的写入值已经在每次属性读取时返回不同的值
// 这个对象产生严格自增的序列号
var serialNum = {
    // 这个数据属性包含下一个序列号
    $n : 0,

    // 返回当前值,然后自增
    get netxt() { return  this.$n++; },

    // 给n设置新的值,但是只有当大于当前值才设置成功
    set next(n){
        if ( n >= this.$n ) this.$n = n;
        else throw "序列号的值不能比当前值小";
    }

};

// 这个对象可以返回随机数的存取器属性
// 例如:表达是"random.octet"产生一个随机数
// 每次产生的随机数都在0-255之间
var random = {
    get octet(){ return Math.floor(Math.random()*256); },
    get uint16(){ return Math.floor(Math.random()*65536); },
    get int16(){ return Math.floor(Math.random()*65536) - 23768; }
}




















