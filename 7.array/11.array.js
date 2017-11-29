/**
 * Created by Think on 2016/7/19.
 */

// 以下代买为一个常规对象添加属性使其变成类数组对象，然后遍历生成的伪数组的"元素

// 创建一个类数组
var a = {};     // 从一个常规对象开始
var i = 0;     // 添加一些属性，称为类数组
while (i < 10) {
    a[i] = i * i;
    i++;
}
a.length = i;

// 把类数组，当做数据遍历
var total = 0;
for(var j = 0 ; j < a.length; j++){
    total += a[j];
}
console.log("把类数组，当做数据遍历计算结果：",total);


// 对象对象是否有为类数组对象
function isArrayLike(o){
    if( o &&                                        // o 非null,undefine等
        typeof o == 'object' &&                     // o是对象
        isFinite(o.length) &&                       // o.length是有限制数组
        o.length >= 0 &&                            // o.length是有限数值
        o.length === Math.floor(o.length) &&        // o.length是非负数
        o.length < 4294967296){                     // o.length < 2^32
        return true;                                // o是类型数组对象
    }else {
        return false;                       // 否则不是
    }
}
console.log(" 对象对象是否有为类数组对象：", isArrayLike(a));


// 可以间接的使用Funciton.call方法调用，使用Array方法
var arr = {"0":"a","1":"b",length:2};
console.log( Array.prototype.join.call(arr,'-').toString() );


// 将ECMAScript 5数组方法的版本在Array构造函数上定义为函数。
Array.join = Array.join || function(a,sep){
        return Array.prototype.join.call(a,sep);
}

Array.slice = Array.slice || function(a,form,to){
        return Array.prototype.slice.call(a,form,to);
    }

Array.map = Array.map || function(a,f,thisArg){
        return Array.prototype.map.call(a,f,thisArg);
    }

Array.forEach = Array.forEach || function(a,f){
        return Array.prototype.forEach.call(a,f);
    }

Array.filter = Array.filter || function(a,f){
        return Array.prototype.filter.call(a,f);
    }

Array.reduce = Array.reduce || function(a,f,thisArg){
        return Array.prototype.reduce.call(a,f,thisArg);
    }

Array.reduceRight = Array.reduceRight || function(a,f){
        return Array.prototype.reduceRight.call(a,f);
    }


Array.some = Array.some || function(a,f){
        return Array.prototype.some.call(a,f);
    }

Array.every = Array.every || function(a,f){
        return Array.prototype.every.call(a,f);
    }

// 测试
console.log("join:",Array.join(a,"-"));
console.log("slice:",Array.slice(a,2,3));
console.log("map:",Array.map(a,function(a,b){ return a + b;}));
console.log("reduce:",Array.reduce(a,function(a,b){ return a + b;}),1);
