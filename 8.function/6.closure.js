/**
 *  理解闭包首先理解嵌套函数的词法作用域规则
 */
var scope = "global scope";     // 全局变量
function checkscope(){
    var scope = "local sopce";  // 局部变量
    function f(){
        return scope;
    }
    return f();
}

console.log( checkscope() ) ;  //local sopce


/**
 * 修改一下f()函数的定义
 * @returns {f}
 */
function checkscope(){
    var scope = "local sopce";  // 局部变量
    function f(){
        console.log("this:",this);
        return scope;
    }
    return f;
}
console.log( checkscope()() ) ;  //local sopce


//利用闭包实现uniqueInter()函数（闭包可以捕获到单个函数调用的局部变量，并将这些局部变量用做私有状态。）
var uniqueInteger = (function(){            // 定义函数并立即调用
    var counter = 0 ;                       // 函数的私有状态
    return function(){ return counter++;}
}());
uniqueInteger();                            // => 1
uniqueInteger();                            // => 2


//counter一样的私有变量不是只能用在一个单独的闭包内，在同一个外部函数内定义的多个嵌套函数也可以访问它，这多个嵌套函数都可以共享一个作用域：
function counter(){
    var n = 0;
    return {
        count : function() { return n++; },
        reset : function() { return n = 0; }
    }
}

var c = counter();   d = counter();         // 创建两个计数器
c.count();                                  // => 0
d.count();                                  // => 0 互不干扰
c.reset();                                  // rest()和count()方法共享状态
c.count();                                  // => 0： 因为我们重置了c
d.count();                                  // => 1:  而没有重置d

// 利用闭包实现的私有属性首先存取器方法
// 这个函数给对象o增加了属性存取器方法
// 方法名称为get<name>和set<name>，如果提供了一个判定函数
// setter方法就回用他来检测参数的合法性，然后再存储它
// 如果判断函数返回fasle，setter方法抛出一个异常
//
// 这个函数有一个非同寻常之处，就是setter和getter函数
// 搜操作的属性值并没有存储在对象o中
// 相反，这个值仅仅是保存在函数中的局部变量中
// getter和setter方法同样是局部函数，因此可以访问这个局部变量
// 也就是说，对于两个存取器方法来说这个变量是私有的
// 没有办法绕过这个存取器方法来设置或者修改这个值
function addProivateProperty(o,name,predicate){
    var value;                      // 私有变量

    // getter方法简单返回值
    o["get"+name] = function(){ return value; }

    // setter方法首先检查值是否合法，若不合法就抛出异常
    // 否则就将其存储起来
    o["set"+name] = function(v){
        if ( predicate &&　!predicate(v) ){
            throw Error("set" + name  + ":invalid value " + v);
        }else {
            value  = v;
        }
    }
}

// 测试
var o = {};                         // 设置一个空对象

// 增加属性存取器方法getName()和setName()
// 确保只允许字符串值
addProivateProperty(o,"Name", function(v){
    console.log( typeof v == "string" );
    return typeof v == "string"; } )
o.setName("NICK");                              //  设置值
console.log("获取值:" +　o.getName()) ;          //  获取值
//o.setName(o);                                   //  抛出异常



// 同一作用域链中定义了两个闭包，这两个闭包共享同样的私有变量活变量。
// 这个一个非常重要的技术，但是还要特别小心那些不希望共享往往共享了其他的闭包：
// 这个函数返回一个总是返回v的函数
function constfunc(v) { return function() { return v; };  }

// 创建一个数组用来存储常数函数
var funcs = [];
for( var i = 0; i < 10 ; i++ ) funcs[i] = constfunc(i);

// 在第5个位置的元素所表示的返回值5
funcs[5]();                    // => 5


//// 这段代码利用循环创建了很多个闭包，当写类这种代码的时候往往会犯一个错误，
//// 那么就是试图将循环和代码移入定义这个闭包的函数之内，看看这段代码：
//// 返回一个函数组成的数组，他们的返回值0-9
//function constfunc(){
//    var fancs = [];
//    for(var i = 0; i < 10; i++ ){
//        fancs[i] = function() { return i; };
//    }
//    return fancs;
//}
//
//var funcs = constfunc();
//var s = funcs[5]();   // 返回值是什么
//console.log( "######s:" + s );









