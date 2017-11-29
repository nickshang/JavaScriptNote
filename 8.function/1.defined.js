/**
 * Created by Think on 2016/8/2.
 */
// 定义函数

// 输出o的每个属性的名和值， 返回undefined
function printprops(o){
    for(var p in o){
        console.log( p + " : " + o[p] +"\n");
    }
}

// 计算两个迪卡坐标(x1,y1)和(x2,y2)之间的距离
function distance(x1,y1,x2,y2){
    var dx = x1 - y1;
    var dy = x2 - y1;
    return Math.sqrt(dx*dx + dy*dy);
}

// 函数表达式可以作为参数传递给其他函数
var ar = [1,2,5,9,10];
ar.sort(function(a,b){ return a - b;} )

// 函数表达式定义后立即调用
var tensquared = (function(x){ return x*x;}(10));















