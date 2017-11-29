/**
 * Created by Think on 2016/9/11.
 */

// 因为构造函数是类的公共标识，所以最直接的方法就是使用construtor属性
function typeAndValue(x){
    if (x == null) return "";           // Null和undefined没有构造函数
    switch (x.constructor){
        case Number : return "Number:" + x;         // 处理元素类型
        case String : return "String:'" + x +"'";
        case Date   : return "Date:'" + x +"'";     // 处理内置类型
        case RegExp : return "Regexp:'" + x +"'";
    }
}

/**
 * 返回的类的属性名称
 * @param o
 * @returns {*}
 */
function classof(o){
    if( o === null ) return "Null";
    if( o === undefined ) return "Undefined";
    return Object.prototype.toString.call(o).slice(8,-1);
}

/**
 * 以字符串形式返回o的类型:
 * -如果o是null,返回"null",如果o是NaN，发回"nan"
 * -如果typeof所返回的值是不是"object"，则返回这个值
 * (注意，有些Javascript的实现将正则表达式识别为函数)
 * -如果o的类是不是"object"，则返回这个值
 * -如果o包含构造并且这个构造函数具有名字，则返回这个名词
 * -否则一律返回"Object"
 * @param o
 * @returns {*}
 */
function type(o){
    var t, c, n;    // type,class,name

    // 处理null值的特殊情形
    if(o === null ) return "null";

    // 另一种特殊情形：NaN和自身不相等
    if(o !== o) return "nan";

    // 如果typeof的值不是"object"，则使用这个值
    // 这可以识别出元素原始值的类型和函数
    if( (t = typeof o) !== "object") return t;

    // 返回对象的类名，除非值为"Object"
    // 这种方式可以死别出大多数内置对象
    if((c = classof(o)) !== "Object") return c;

    // 如果对象构造函数的名字存在的话，则返回它
    if(o.constructor && (typeof o.constructor) === "function" &&
        (n = o.constructor.getName())) return n;

    return "Object";
}


// 返回函数的名字(可能是空字符串)，不是函数的话返回null
Function.prototype.getName = function(){
    if("name" in this) return this.name;
    console.log("source:", this.toSource() );
    return this.name = this.toSource().match(/function\s*([^(]*)\(/)[1];
}

var n = 0;
console.log("#1",type(n));

var _null = null;
console.log("#2",type(_null));

var _undefined = undefined;
console.log("#3",type(_undefined));

function add(a,b){
    return a + b;
}
console.log("#4",type(add));


function Add(a,b){
    this.a = a;
    this.b = b;
}
console.log("#5",type( new Add(1,2)));


// 如果o实现了出第一个参数之外的参数所描述的方法，则返回true
function quacks(o /*,....*/){
    for (var i = 1; i < arguments.length; i++){
        var arg = arguments[1];
        switch(typeof arg){         // 如果参数是:
            case 'string' :         // string: 直接用名字做检查
                if( typeof o[arg] !== 'function') return false;
                continue;
            case 'function':        // function:检查函数的原型对象上的方法
                // 如果实参是函数，则使用他的原型
            case 'object' :         // object:检查匹配的方法
                for(var m in arg){  // 遍历对象的每个属性
                    if(typeof arg[m] !== 'function' ) continue;     //跳过不是方法的属性
                    if(typeof o[m] !== "funciton" ) return false;
                }
        }

        // 如果程序执行到这里，说明o实现了所有的方法
        return true;
    }
}

function Add(a,b){
    this.a = a;
    this.b = b;
}

Add.prototype.add = function(){
    return this.a + this.b;
}


