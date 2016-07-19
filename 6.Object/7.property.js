/**
 * 属性特征
 * Think on 2016/7/13.
 */

// 这个对象可以返回随机数的存取器属性
// 例如:表达是"random.octet"产生一个随机数
// 每次产生的随机数都在0-255之间
var random = {
    get octet(){ return Math.floor(Math.random()*256); },
    get uint16(){ return Math.floor(Math.random()*65536); },
    get int16(){ return Math.floor(Math.random()*65536) - 23768; }
}



// 通过调用Object.getOwnProtyDescript()可以获取某个对象特定属性的属性描述符：

// 属性描述： { value: 1, writable: true, enumerable: true, configurable: true }
var propDesc = Object.getOwnPropertyDescriptor({x:1},'x');
console.log("属性描述：",propDesc);

// 属性描述： { get: [Function: getX],set: undefined,enumerable: true,configurable: true }
var propDesc = Object.getOwnPropertyDescriptor({x:1, get getX(){ return this.x;} },'getX');
console.log("属性描述：",propDesc);

// 查询randam对象的octet属性
var propDesc = Object.getOwnPropertyDescriptor(random,"octet");
console.log("属性描述：",propDesc);

// 对于继承属性和不存在的属性，返回undefined
var propDesc = Object.getOwnPropertyDescriptor({},"X");
console.log("属性描述：",propDesc);

var propDesc = Object.getOwnPropertyDescriptor({},"toString");
console.log("属性描述：",propDesc);

// 要想设置属性的特征，或者想让新建属性具有某种特征，则需要调用Object.defineProperty(),
// 要传入要修改的对象、要创建或者修改的属性的名称以及属性描述符对象：
var o  = {};            //创建一个空对象

// 添加一个不可枚举的数据属性x,并赋值1
Object.defineProperty(o,"x",{value:1,writable:true,enumerable:false, configurable:true} );

// 属性是存在的，但不可枚举
console.log("设置对象属性：", o.x);                     // -> 1
console.log("设置对象属性：", Object.keys(o));          // -> []

// 现在对属性x做修改，让他变成为只读
Object.defineProperty(o,"x",{writable:false});

// 试图改变这个属性的值
o.x = 2;                                              // 操作失败单不报错，而在严格模式中抛出的类型错误异常
console.log("获取x：", o.x );                          // -> 1

// 属性依然可以配置的，因此可以通过这样方式对他进行修改
Object.defineProperty(o,"x",{value:2});
console.log("获取x：", o.x );                          // -> 2

// 现在将x从数据属性修改为存取器属性
Object.defineProperty(o,"x",{ get: function(){ return 0; }} );
console.log("获取x：", o.x );                          // -> 0

// 改或创建多个属性，则需要使用Object.defineProperties()
var p = Object.defineProperties({}, {
    x: {value: 1, writable: true, enumerable: false, configurable: true},
    y: {value: 2, writable: true, enumerable: false, configurable: true},
    r: {
        get: function () {
            return 0;
        },
        enumerable: true,
        configurable: true
    }
});

console.log("获取p.x：", p.x );                    // -> 1
console.log("获取p.y：", p.y );                    // -> 2
console.log("获取p.r：", p.r );                    // -> 0

// 复制属性的特征

/**
 * 给Object.prototype添加一个不可枚举的Extend方法
 * 这个方法继承自调用他的对象，将作为函数传的对象的属性--复制
 * 除了值之外，也复制属性的所有特征，厨房目标对象中存在同名的属性，
 * 参数对象的所有自有属性（包含：不可枚举的属性）也会--复制
 */
Object.defineProperty(Object.prototype,
    "extend",
    {
        writable : true,
        enumerable : false,         // 定义为不可枚举的
        configurable : true,
        value : function(o){        // 值就是这个函数
            // 得到所有的自有属性，包含不可枚举属性
            var names = Object.getOwnPropertyNames(o);
            // 遍历同名
            for(var i = 0 ; i < names.length; i++){
                // 如果已经存在的，则跳过
                if ( names[i] in this ) continue;
                // 获取o中的属性的描述
                var desc = Object.getOwnPropertyDescriptor(o,names[i]);
                // 用他给this创建一个属性
                Object.defineProperty(this,names[i],desc);
            }
        }
});

var a = {x:'1'};
var b = {};
b.extend(a);
console.log("b.x", b.x);            // -> 1


















