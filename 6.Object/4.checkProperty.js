/**
 * Created by Think on 2016/7/5.
 */

// in运算符的检测对象的属性 （自有属性，继承而来的返回true）
var o = {x : 1};
o.y = 5;
console.log( "---------in----------");          // false
console.log( "x" in o);                         // true
console.log( "y" in o);                         // false
console.log( "toString" in o);                  // true toString属性是继承而来


// 对象的hasOwnProperty()方法来检查给定名字是否为对象的自有属性，对于继承属性将返回false;
console.log( "---------hasOwnProperty----------");
console.log( o.hasOwnProperty("x") );                       // true
console.log( o.hasOwnProperty("y") );                       // false
console.log( o.hasOwnProperty("toString"));                 //  false toString属性是继承而来,返false


// propertyIsEnumerable()是hasOwnProperty的增强版本，
// 只有监测是只有属性而且这个属性是可以枚举（ enumerable atrribute）为true时它才返回ture。
console.log( "---------propertyIsEnumerable----------");
var o = {y: 2};
o.x = 1;
console.log(o.propertyIsEnumerable("toString"));            // 继承为属性-》不可枚举
console.log(o.propertyIsEnumerable("x"));                   // 定义的实例变量可枚举
console.log(o.propertyIsEnumerable("y"));                   // 定义的静态变量可枚举


//  “!==”判断一个属性是否undefined，来检查对象属性
var o = {y: 2};
console.log( "---------propertyIsEnumerable----------");
console.log(o.y !== undefined );            // true 有属性
console.log(o.z !== undefined );            // false 无此属性
console.log(o.y);            // false 无此属性


// 注意:上述代码中使用的是"!=="运算符，而不是"!=".  "!=="可以区分undefined和null
// 有时不必须区分
// 如果o中含有属性x,且x的值不是null或者undefinned，0.x乘以2
if(o.x != undefined ) o.x *= 2;
// 如果o中含有属性x,且x的值不能转换为false,o.x乘以2
// 如果x是undefined,null,false," "，0或NaN，则它保持不变
if(o.x) o.x *=2;

