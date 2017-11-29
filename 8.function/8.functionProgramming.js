/**
 * Created by Think on 2016/7/24.
 */

// 计算数组的的平均值和标准差
var data  = [1,1,3,5,5];

// 平均数是所有元素的累加和值除以元素个数
var total = 0;
for(var i = 0; i < data.length; i++) total += data[i];
var mean = total / data.length;                     // 平均数是3

// 计算标准差，首先计算每个数组减去平均数之后的偏差平方然后求和
total = 0 ;
for(var i = 0; i < data.length; i++){
    var deviation = data[i] - mean;
    total += deviation * deviation;
}

var stddev = Math.sqrt(total / (data.length - 1 ));    //标准差的值是2


// 使用map()和reduce()实现
// 首先定义两个简单的函数
var sum = function(x,y) { return x + y; }
var square = function(x) { return x*x; }

// 然后将这些函数和数组方法配合使用计算出平均数和标准差
var data = [1,1,3,5,5];
var mean = data.reduce(sum)/data.length;
var deviation = data.map(function(x) { return x - mean; } );
var stddev = Math.sqrt(deviation.map(square).reduce(sum)/(data.length - 1));


// 高阶函数

// 这个高阶函数返回一个新的函数，这个新函数将他的实参传入f()
// 并返回f的返回值的逻辑非
function not(f){
    return function(){
        var result = f.apply(this,arguments);
        return !result;
    }
}

var even = function(x){
    return x % 2 === 0;
}

var odd  = not(even);               // 一个新的函数，所做的事情和enen()相反
[1,1,3,5,5].every(odd);             // => true: 每个函数的都是奇数


// 所返回的函数的参数应当是一个实参数组，并对每个数组元素执行函数f()
// 并返回所有计算结果组成的数组
// 可以对比一下这个函数和上问提到的map()函数
function mapper(f){
    return function(a) { return map(a,f); }
}

var incrment = function(x) { return x + 1; };
var incrmenter  = mapper(incrment);
console.log( "incrmenter：", incrmenter([1,2,3]) );               // => [2,3,4]



// 返回一个新的可以计算f(g(....))的函数
// 返回的函数h()将他所有的实参传入g()，然后将g()的返回值传入f()
// 调用f()和g()时的this值和调用h()时的this值是同一个this
function  compose(f,g){
    return function(){
        return   f.call( this,g.apply(null,arguments));
    }
}



// 不完全函数
// 实现一个工具函数将类数组对象（或对象）转换为真正的数组
// 在后面的示例代码中用到了这个方法将arguments对象转换为真正的数组
function array(a,n) { return Array.prototype.slice.call(a,n || 0); }

/**
 * 将实参放置至左侧
 * @param f
 * @returns {Function}
 */
function partialLeft(f /*,....*/){
    var args = arguments ;                          // 保存外部的实参数组
    return function(){
        var a = array (args,1);                     // 并返回这个函数
        a = a.concat( array(arguments) );           // 开始处理外部的第1个args
        return f.apply(this,a);                     // 然后基于这个实参列表调用f()
    }
}

/**
 * 将实参放置右侧
 * @param f
 * @returns {Function}
 */
function partialRight(f /*,....*/){
    var args = arguments;
    return function(){
        var a = array(arguments);                   // 将内部参数转换为数组
        a = a.concat( array(args,1) );              // 然后将外部第一个args开始添加
        return f.apply(this,a);                     // 然后基于实参列表进行调用f()
    }
}


/**
 * 这个函数的实参
 * @param f
 * @returns {Function}
 */
function partial(f /**...**/){
    var args = arguments;                           // 保存外部实参数组
    return function(){
        var a = array(args,1);                      // 从外部args开始
        var i = 0, j = 0;
        // 遍历args,从内部实参填充nudefined值
        for(; i < a.length; i++){
            if( a[i] === undefined ) a[i] = arguments[j++];

            // 现在将剩下的内部实参都都追加进行
            a = a.concat( array( arguments,j) );
            return f.apply(this,a);
        }
    }
}

// 这个函数带有三个实参
var f = function(x,y,z){ return x * (y -z ); }

// 注意这个三个不完全调用之间的区别
var _a = partialLeft(f,2)(3,4);                      // => -2
var _b = partialRight(f,2)(3,4);                     // => 6
var _c = partial(f,undefined,2)(3,4);                // => -6
console.log("######a:",_a);
console.log("######b:",_b);
console.log("######c:",_c);

var increment = partialLeft(sum,1);                 // 定义自增函数
var cuberoot  = partialLeft(Math.pow,1/3);            // 返回1/3的y(调用函数的参数数)次幂.
String.prototype.first  = partial(String.prototype.charAt,0);       // 定义获取第一个字符的函数
String.prototype.last   = partial(String.prototype.substr,-1,1);    // 定义获取最后一个字符的函数

var _str = "abc";
console.log("######f1:", cuberoot(2) );               // => 1/9
console.log("######f2:", _str.first() );              // => a
console.log("######f3:", _str.last() );               // => b


var not  = partialLeft(compose,function(x){ return !x; } );
var even = function(x) { return x % 2 === 0; };
var odd  = not(even);
var isNumber = not(isNaN);

// 使用不完全调用的组合来重新组织求平均数和标准差的代码，这样编码风格是非常纯粹的的函数式编程：
var data = [1,1,3,5,5];                             // 我们要处理的数据
var sum  = function(x,y) { return x + y};           // 两个初等函数
var product = function(x,y) { return x * y; };
var neg     = partial(product,-1);
var square  = partial(Math.pow,undefined,2);       // 定义其他函数
var sqrt    = partial(Math.pow,undefined,0.5);
var reciprocal  = partial(Math.pow,undefined,-1);


// 现在计算平均值和标准差，所有的函数调用不带运算符
// 这段代码看起来lisp代码
//var mean = product(reduce(data,sum),reciprocal(data.length));
//var stddev  = sqrt(product(reduce(map(data,compose(square,partial(sum,neg(mean)))), sum),
//    reciprocal(sum(data.length,-1))));
//console.log("######mean:",mean);




// 所返回的函数的参数应该是一个实参数数组，并对对没有数组元素执行函数f
// 并返回所以计算结果组成的数组
// 可以对比一下这个函数和上下文提到的map()函数
function mapper(f){
    return function(a) { return Array.prototype.map.call(a,f); };
}

var increment   = function(x) { return x+1;}
var incrementer = mapper(increment);
var res         = incrementer([1,2,4]);
console.log(res);

// 返回f()的带有记忆功能的版本
// 只有当f()的实参的字符串表示都不相同的他才会工作
function memorize(f){
    var cache = {};     // 将值保存在闭包
    return function() {
        // 讲实参转换为字符串形式，并将其用做缓存的键
        var key = arguments.length +　Array.prototype.join.call( arguments,",");
        if( key in cache) return cache[key];
        else return cache[key] = f.apply(this,arguments);
    }
}


// 返回两个整数的最大公约数
// 使用欧几里德算法
function gcd(a,b){
    var t;
    if (a < b) t = b, b = a, a = t;                 // 确保 a >= b
    while (b != 0) t = b, b = a%b, a = t;           // 求最大公约数的欧几里德算法
    return a;
}

var gcdmemo = memorize(gcd);
var v = gcdmemo(85,187);

console.log("v:",v);

// 注意,当我们写一个递归函数时，往往需要实现记忆功能
// 我们更希望调用实现了记忆功能的递归函数，而不是原递归函数
var factorial = memorize(function(n){
    return ( n <= 1 ) ?  1 : n * factorial(n-1);
});

console.log("###factorial:", factorial(5) );