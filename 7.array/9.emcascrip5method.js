/**
 * Created by Think on 2016/7/28.
 */
// reduceRight() 简化函数
var a = [2, 3, 4];
// 计算2`(3`4)。乘方操作的优先顺序是从右到左
var big = a.reduceRight(function (accumulator, value) {
    return Math.pow(value, accumulator);
});
console.log(big);


/**
 * 把p中的可枚举属性复制到o中，并返回o
 * 把o和p中含有同名属性，并覆盖ozho
 * 备注：不能解决IE中的bug
 * @param o
 * @param p
 */
function extend(o,p){
    for (var prop in p){        // 遍历p中的所有属性
        o[prop] = p[prop];      // 遍历属性添加至o中
    }
    return o;
}


/**
 * 返回一个新对象，这个对象同时拥有o的属性和p的属性
 * 如果o和p有重名属性，使用p中的属性值
 * @param o
 * @param p
 * @returns {*}
 */
function union(o,p){
    return extend(extend({},o),p);
}

// 将两个对象合并
var objects = [{x:1},{y:2},{z:3}];
var marged  = objects.reduce(union);
console.log(marged);


// indexOf lastIndexOf() 使用
var a = [0,1,2,3,4];
a.indexOf(1);               // => 1:a[1]是1
a.lastIndexOf(3);           // => 3:a[3]是1
a.indexOf(-3);              // => -1:没有值为3的元素


/**
 * 在数组中查找所有出现的x,并返回一个包含匹配索引的数组
 * @param a 数组
 * @param x 查找的内容
 */
function findall(a,x){
    var result = [],
        len    = a.length,
        pos    = 0;
    while(pos < len){
        pos = a.indexOf(x,pos);
        if(pos == -1) break;
        result.push(pos);
    }
    return result;
}
