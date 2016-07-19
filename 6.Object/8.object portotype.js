/**
 * 类的三个属性-原型属性、类属性、对象属性
 */

/**
 * 检测一个对象是否是另一个对象的原型
 */
var p = {x: 1};                            // 定义一个原型对象
var o = Object.create(p);                  // 使用这个原型来创建一个对象
p.isPrototypeOf(o);                         // -> true:o继承自p
Object.prototype.isPrototypeOf(o);       // -> true:p继承自Object

console.log(p);
console.log(o);


/**
 * 返回的类的属性名称
 * @param o
 * @returns {*}
 */
function classof(o) {
    if (o === null) return "Null";
    if (o === undefined) return "Undefined";
    return Object.prototype.toSource().call(o).slice(8, -1);
}

/**
 * 对象的扩展性实例
 * 创建一个封闭的对象，包含一个冻结的原型和一个不可枚举的属性
 *
 */
var o = Object.seal(Object.create(Object.freeze({x: 1}), {y: {value: 2, writable: true}}));










