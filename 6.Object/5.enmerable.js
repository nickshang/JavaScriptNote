/**
 * 枚举属性 by Think on 2016/7/13.
 */

/**
 * for/循环可以在循环可以在循环体中遍历对象中所有可枚举的属性（包括自有属性和继承的属性），
 * 把属性名称赋值给循环变量。对对象继承的方法不可枚举，但是在代码中给对象添加的属性是可以枚举。
 * @type {{x: number, y: number, z: number}}
 */
var o = { x: 1, y :2, z: 3};                        // 三个可枚举的自有属性
console.log(o.propertyIsEnumerable("toString"));    // =>false ，不可枚举
for(var p in o)
console.log(p)                                      // 输出x、y和z

/**
 * 对对象的属性（非自有属性）过滤，常见两种方式：
 */

// 方式一：
for(p in o){
    if(!o.hasOwnProperty(p)) continue;              // 跳过继承属性
    console.log("方式一:",p);
}

for(p in o){
    if( typeof o[p]  === 'funciton' ) continue;    // 跳过函数方法
    console.log("方式二:",p);
}


// 用来枚举属性的对象工具函数

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
 * 将p中的可枚举属性复制到o中，并返回o
 * 如果o和p中同名的属性，o中的属性将不受影响
 * 这个函数并不处理setter和getter以及复制属性
 * @param o
 * @param p
 */
function merge(o,p){
    for(prop in p ){                                // 遍历p中所有属性
        if(p.hasOwnProperty(prop)) continue;        // 过滤已经在o中存在的属性
        o[prop] = p[prop];                          // 将属性添加至0中
    }
    return o;
}

/**
 * 如果o中的属性没有在p中没有同名的属性，则从o中删除这个属性
 * @param o
 * @param p
 * @returns {*}
 */
function restrict(o,p) {        //限制
    for(prop in o) {                                // 遍历o中的所有的属性
        if(! (prop in p)) delete o[prop];           // 如果在p中不存在，则删除
    }
    return o;
}

/**
 * 如果o中的属性在p中存在同名的属性，则从o中删除这个属性
 * return 0
 */
function subtract(o,p) {        // 减去
    for(prop in p){             // 遍历p中的所有属性
        delete o[prop];         // 从o中删除(删除一个不存在的属性不会报错)
    }
    return 0;
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

/**
 * 返回一个新对象，这个对象拥有同时o和的出现的属性
 * 像求o和p的交集,但是p中的属性值忽略
 */
function intersection(o,p){
    return restrict(extend({},o),p);
}

/**
 * 返回一个数组，这个数组包含是的o中可枚举的自有属性的名称
 * @param o
 * @returns {Array}
 */
function keys(o){
    if (typeof o !== "object" ) throw TypeError();              // 参数必须是对象
    var result = [];                                            // 属性数组
    for( var prop in o ){
        if(o.hasOwnProperty(prop)) result.push(prop);
    }
    return result;
}

// ECMAScript5定义了两个个用以枚举属性名称的函数
// 第一个:Object.keys( o );
// 第二个:Object.getOwnPropertyNames( o );
console.log("Object keys:", Object.keys(o));
console.log("Object keys:", Object.getOwnPropertyNames(o));







