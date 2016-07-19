#Javascrpit 学习笔记
##第六章 对象

* [一、创建对象](#一创建对象)
* [二、属性的查询和设置](#二属性的查询和设置)

###

###一、创建对象
####1.对象直接量（简单，直接）

> 创建对象最简单的方式就是在JavaScript代码中使用对象直接量。
对象直接量是由若干名/值对组成的映射表，名/值对中间用冒号分隔，名/值用逗号分隔。
整个映射表用花括号括起来

```javascript
/**
 * 使用对象对象直接量，创建对象
 */
var empty = {};                             // 没有任何属性的对象
var point = { x:0, y:0 };                   // 两个属性
var point2 = { x: point.x, y : point.y }    // 更复杂的值
var book = {
    "main titel" : "Javacript ",            // 属性里有空格，必须用字符串表示
    'sub-ttile' : "The definitve Guide",    // 属性名称里有连字符、必须用字符串表示
    'for' : "all audiences",                // "for"是保留字，因此必须用引号
    author : {                              // 这个属性的值是一个对象
        firstname : "Davide",               // 注意这个属性名都没有引号
        surname: "Flanagan"
    }
}
```

####2.通过new关键字创建对象
> new运算符创建并初始化一个新对象。关键字new后跟随一个函数调用。
这个函数称为构造函数(constructor),构造函数用以初始化一个新创建的对象。
Javascrpit语言核心的原始类型包含内置构造函数：

```javascript
/**
 * 通过new创建对象
 */
var o = new Object();                       // 创建一个空对象，和{}一样
var a = new Array();                        // 创建一个空数组，和[]一样
var d = new Date();                         // 创建一个表示当前时间的Date对象
var r = new RegExp("js");                   // 创建一个可以进行模式对象
````

####3. 原型
> 每个Javascritpt对象（null除外）都和另个一个对象相关联，"另一个"对象就是我们熟知的原型，每个对象都从原型继承属性。

> 所有通过对象直接量创建的对象都具有同一个原型对象，并可以通过JavaScript代码，Object.prototeyp获得原型对象的引用。通过关键字new和构造函数调用创建的对象的原型就是构造函数prototype属性的值。因此，同使用{}创建对象一样，通过new Object()创建对象也继承自Obejct.prototype.同样，通过new Array()创建的原型就是Array.prototype。通过new Date()创建的对象的原型就是Date.prototype.

> 没有原型的对象为数不对。Object.prototype就是其中之一。它不继承任何属性。其他原型对象都是一个普通对象，普通对象都具有原型。所有的内置构造函数（以及大部分自定义的构造函数）都具有一个继承自Object.prototype的原型。 这个一系列的原型对象就是所谓的“原型链”（prototype chain）

####3. ####3. 原型
> ECMAScript 5定义了一个名为Object.create的方法，它创建一个新对象，其中第一参数为对象的原型。 第一个参数可选。

> Object.create()是一个静态函数，二不是提供某个对象调用的方法，使用他们的方法很简单，只需要传入所需要的原型对象那个即可。

```javascript
/**
 * Object.create() 创建对象
 */
var o1 = Object.create( {x:1,y:2} );       // o1继承了属性x和y

```

> 可以通过传入参数null来创建一个没有原型的新对象，但是同这个方式不会继承任何东西， 甚至还不包含基础方法，比如toString()，他不能和 + 一起工作。


###二、属性的查询和设置
###三、属性的删除
###四、监测属性
###五、枚举属性
###六、创建对象
###七、属性的特征
###八、对象的三个属性
###九、序列化对象
###十、对象的方法
