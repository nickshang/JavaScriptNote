/**
 * Created by Think on 2016/8/6.
 */

//函数的作用的概念：在函数中声明的变量在整个函数体内都是可见的（包含在嵌套嵌套函数中），在函数外部是不可见的。
//不在任何函数内声明的变量都是全局变量。在整个Javascript程序中都是可见的。在Javascript中无法声明值在一个代码块内课件的变量的。基于这个原因，我们常常简单地定义一个函数用做临时的命名空间，在这个命名空间定义的变量都不会污染到全局变量命名空间。


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
