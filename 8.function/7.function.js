/**
 * 函数的属性和方法
 */

/**
 *，从另外一个函数传入给它的arugments数组，它比较arguments.length（实际传入的实参个数）
 *  和arguements.callee.length(期望传的实参个数)来判断传的实参个数是否正确，如果不正确则抛出异常
 */
function check(args){
    var actual   = args.length;               // 实参的真实个数
    var expected = args.callee.length;        // 期望的实参个数
    if (actual !== expected) {
        throw Error( "Exetend "  +  expected + " args; got " + actual);
    }
}

function f(x,y,z){
    check(arguments);                          // 检查实参个数和期望的实参个数是否一致
    return x + y +z;
}

f(1,2,3);



// 传入apply()可以是类数据，也可以是数组。 实际上可以将当前函数的arguments数组直接传入(另一个函数的) apply()来调用另一个函数：
// 将对象o中名为m()的方法替换为另一个方法
// 可以在调用对象原始的方法之前和之后记录日志信息

/**
 * 将对象的方法进行加工处理
 * @param o 对象
 * @param m 方法名
 */
function trace(o,m){
    var original = o[m];            // 在闭包中保存原始方法
    o[m]  = function(){             // 定义新的方法
        console.log( new Date(), "entring (执行方法前)", m );
        var result = original.apply(this,arguments);
        console.log( new Date(), "entring (执行方法后) ", m );
        return result;
    }
}

// 定义对象o
var o = { print : function(){
    console.log("----print------");
}};

// 将对象o中的方法进行AOP
trace(o,'print');

// 调用
o.print();


// bind函数，作用示例
function f(y){                      // 待绑定的函数
    return this.x + y;
}
var o = { x : 1 };                  // 将要绑定的对象
var g = f.bind(o);                  // 通过调用g(x)来调用o.f(x)
console.log("bind结果:", g(2) ) ;   // => 3

// 返回一个函数，通过调用他的来调用o中的方法f(),传递他所有的实参
function bind(f,o){
    if (f.bind) return f.bind(o);                   // 如果bind方法存的话，使用bind()方法
    else return function(){                         // 不然这样绑定
        return f.apply(o,arguments);
    }
}


// bind改变this关键字的示例用法

var sum = function(x,y) { return x + y};            // 返回两个实参的和值
// 创建一个类似sum的新函数,但this的值绑定到null
// 并且第一个参数绑定到1，这个新的函数期望只传入一个实参
var succ = sum.bind(null,1);
succ(2);            // => 3 ：x绑定1,并传入2作为实参y

function f(y,z){ return this.x + y + z; }           // 另外一个作为累加计算的函数
var g = f.bind({x:1},2);                            // 绑定this和y
g(3);                                               // => 6 :  this.x 绑定到1，y绑定到2，z绑定到3

// ECMAScritpt 3版本的Function.bind()方法
if(!Function.prototype.bind){
    Function.prototype.bind = function(o/*,args*/){
        // 将this和arguments的值保存至变量中
        // 以便在后面嵌套的函数中可以使用他们
        var self = this,boundArgs = arguments;

        // bind()方法的返回值是一个函数
        return function() {
             // 创建一个实参列表，将传入bind()的第二个及后续的实参都传入这个函数
             var args = [],i;
             for( i = 1; i < boundArgs.length; i++) args.push( boundArgs[i] );
             for( i = 0; i < arguments.length; i++) args.push( arguments[i] );

            // 现在将self作为o的方法来调用，传入这些实参
            return self.apply(o,args);
        }
    }
}


// 使用Function()构造函数，所创建的函数并不是使用词法作用域，相反，函数体代码的编译总会在顶层函数执行。
var scope = "global";
function constructFunction(){
    var scope = "local";
    return new Function(" return scope");       // 无法捕获局部用于域
}

// 这个一行代码返回global，因为通过Function()构造函数
// 所返回的哈数使用的不是局部作用域
constructFunction()();










