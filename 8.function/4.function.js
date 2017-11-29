/**
 * Created by Think on 2016/8/3.
 */
// 将函数作为值
// 在这里定义了一些简单的函数
function add(x,y) {return x + y; }
function subtract(x,y) { return x - y; }
function multiply(x,y) { return x * y; }
function divide(x,y) { return x / y; }

// 这里的函数以上面的某个函数做为参数
// 并传给他的两个操作数然后调用它
function operate(operator,operand1,operand2){
    return operator(operand1,operand2);
}

// 这行代码所示的函数调用上计算(2+3) + (4*5) 的值
// 这次实现使用函数直接量，这次函数直接量定义在一个对象直接量中
var operators = {
    add : function(x,y) {return x + y; },
    subtract:function(x,y) { return x - y; },
    multiply: function(x,y) { return x * y; },
    divide: function(x,y) { return x / y; },
    pow:Math.pow            // 使用预定义的函数
};

// 这个函数接收一个名字作为运算符，在对象中查找这个运算符
// 然后将他们作勇提供的操作数
// 注意这里调用的运算符函数的语法
function operate2(operation,operand1,operand2){
    if( typeof operators[operation] === "function"){
        return operators[operation](operand1,operand2);
    }else {
        throw "unkonwn operator";
    }
}

// 这样来计算("hello" + " " + "world") 的值
var j = operate2("add","hello", operate2("add"," ", " world!"));

// 使用预定义的函数Math.pow()
var k = operate2("pow",10,2);


// 初始化函数对象的计数器属性
// 由于函数声明被提前了，因此这里是可以在函数声明之前定义的
uniqueInteger.counter = 0;

// 每次调用这个函数都会返回一个不同的整数
function uniqueInteger() {
    return uniqueInteger.counter++;          // 先返回计数器的值，然后计数器自增1
}

console.log("u:", uniqueInteger());
console.log("u:", uniqueInteger());


// 计算阶乘，并将结果缓存到函数的属性中
function factorial(n){
    if(isFinite(n) && n >0 && n == Math.round(n) ){         // 有限的正整数
        if( !( n in factorial )){                           // 如果没有缓冲结果
            factorial[n] = n * factorial(n-1);              // 返回缓冲结果
        }
        return factorial[n];
    }else return NaN;
}















