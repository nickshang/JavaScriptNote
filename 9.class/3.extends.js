/**
 *  Javascript中Java式的类继承 Think on 2016/7/25.
 */



// 定一个扩展函数，用来将第二个以及后续参数复制到第一个参数
// 这里我们处理IE bug,在多数IE版本中
// 如果o的属性拥有一个不可枚举的同名属性，则for/in循环
// 不会枚举对象o的可枚举属性，也就是说将不会正确地处理诸如toString的属性
// 除非显示检测它
var extend = (function(){           // 将这个函数的返回值赋值给extend
    // 在修复它之前，首先检查是否存在bug
    for(var p in {toString : null}){
        // 如果代码执行到这里,那么for/in循环会正确的返回
        // 一个简单版本的extend()函数
        return function extend(o){
            for(var i = 0 ; i < arguments.length; i++){
                var source = arguments[i];
                for( var prop in source ) o[prop] = source[prop];
            }
            return o;
        }
    }


    // 如果代码执行到这里，说明for/in循环不会枚举测试对象的toString属性
    // 因此返回另一个版本的extend()函数，这个函数显式测试
    // Object.prototype中的不可枚举属性
    return function pathed_extend(o){
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];
            // 复制所有的可枚举属性
            for (var prop in source ) o[prop] = source[prop];

            // 现在检查特征属性
            for (var j = 0; j < protoprops.length; j++ ) {
                prop = protoprops[j];
                if ( source.hasOwnProperty(prop)) o[prop] = source[prop];
            }
        }
    }

    // 需要检查的特殊属性
    var protoprops = ["toString","valueOf","constructor","hasOwnProperty",
        "isPrototypeOf","propertyIsEnumerable","toLocaleString"];

}());


/**
 * 定义简单类的函数
 * @param constructor  用以设置实例实例的
 * @param methods 实例的方法，复制到原型中
 * @param static  类属性，复制至构造函数中
 */
function defineClass(constructor,methods,statics){
    if( methods ) extend (constructor.prototype,methods);
    if( statics ) extend (constructor,statics);
    return constructor;
}

// Range类的另一个实现
var SimpleRange = defineClass(
    function(f,t){this.f = f; this.t = t;},
    {
        includes : function(x) { return this.f <= x && x <= this.t;},
        toString : function() { return this.f + " ... " +  this.t; }
    },
    {
        upto: function(t) { return new SimpleRange(o,t); }
    }
);
var r = new SimpleRange(3,5);
console.log(r.includes(4));
console.log(r.includes(10));


// 定义表复数的类，展示使用javascript模拟实现Java式的类成员。
// Complex.js: 表示复数的类
/**
 * Complex.js
 * 功能描述：描述复数(复数是实数和虚数的和，并且虚数i是-1的平方根)
 */

/**
 * 描述：描述复数的构造函数
 * @param real 实数
 * @param imaginary 虚数
 * @constructor
 */
function Complex(real,imaginary){
    if (isNaN(real) || isNaN(imaginary))       // 确保两个都是数字
        throw new TypeError();                 // 如果不是都是数字则抛出错误
    this.r = real;
    this.i = imaginary;
};

//  当前复数对象加上两个复数，并返回新的计算和值后的复数对象
Complex.prototype.add = function(that){
    return new Complex(this.r + that.r , this.i +that.i);
};

//  ... 一些其他的操作

// 将复数对象转换为一个字符串
Complex.prototype.toString = function() {
    return "{" + this.r + "," + this.i +"}";
};

// 监测当前复数对象是否和另一个复数值相等
//Complex.prototype.equlas = function(that){
//    return that != null &&                              // 必须顶一个不能是null
//            this.constructor === Complex &&             // 并且基必须是Comple的实例
//            this.r === that.r  && this.i  === this.i;   // 并且必须包含相等的值
//};

/**
 * 类字段（比如常量）和类方法直接定义为构造函数的属性
 * 需要注意的是,类的方法通常不使用关键字this,
 * 他们只对其参数进行操作
 */

// 这里预定义了一些对复数运算有帮助的类字段
// 他们命名 都是大家的，用以表明他们都是常量
// (在ECMAScript 5中，还能设置这些类字段的属性为只读)
Complex.ZERO    = new Complex(0,0);
Complex.ONE     = new Complex(1,0);
Complex.I       = new Complex(0,1);

// 这个类方法将由实例对象的toString方法返回的字符串格式解析为一个Complex对象
// 或者抛出一个类型错误异常
Complex.parse = function(s) {
    try {                                       // 假设解析成果
        var m = Complex._format.exec(s);        // 利用正则表达是进行配备
        return new Complex(parseFloat(m[1]), parseFloat(m[2]));
    }catch(x) {     // 如果接卸失败则抛出异常
        throw new TypeError(" can't parse " + s + " as complex number");
    }
}

// 定义类的"私有"字段,这个字段在Comple.parse()中用到了
// 下划线前缀表明他是类内部使用的，而不属于类的公用API的部分
Complex._format = /^\{([^,]+),([^}]+)\}$/;

// 测试
var c = new Complex(2,3);                      // 使用构造函数创建新的对象
var d = new Complex(c.i, c.r);                 // 用到了c实例属性
var s = c.add(d).toString();
console.log("s:",s);

// 这个稍微复杂的表达式用到了类方法和类字段
//Complex.parse(c.toString()).     // 将c转换为字符串
//    add(c.neg()).               // 加上他的负数
//    equlas(Complex.ZERO);       // 结果应当永远是"零"

// 多次调用这个函数f,传入一个迭代数
// 比如，要输出"hello"三次:
// var n = 3;
Number.prototype.times = function(f,context){
    console.log("f:",f);
    console.log("context:",context);

    var n = Number(this);
    console.log("n:",n);
    for(var i = 0; i < n; i++) f.call(context,i);
}
var n = 3;
n.times(function(n){ console.log(n + " hello"); })

// 如果不存在ES5的String.trim()方法的话，就定义它
// 这个方法用以去除字符串开发和结尾的空格
String.prototype.trim = String.prototype.trim || function(){
    if(!this) return this;                          // 空字符不做处理
        return this.replace(/^\s+|\s+$/g,"");       // 使用正则表达式替换空格
}
console.log("#######String:"," name ".trim());

// 返回函数的名字，如果他有（非标准的）name属性，则直接使用name属性
// 否则，将函数转换为字符串然后从中提取名字
// 如果是没有名字的函数，则返回一个空字符串
Function.prototype.getName = function(){
    return this.name || this.toString().match(/function\s*([^()*]\()/)[1];
}
function add(a,b){
    return a + b;
}
console.log("#####function name:",add.getName());



//
//Complex.parse(c.toString()).equals(Complex.ZERO);       // 结果应当永远是"零"
