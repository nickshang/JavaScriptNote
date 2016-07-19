/**
 * Created by Think on 2016/7/3.
 */

/**
 * 面向对象编程
 * @param name
* @param age
*/
function person(name,age){
    this.name = name;
    this.age = age;
}


/*
function r(t) {
    return t.toLowerCase().replace(/[xy]/g, function (t) {
        var n = 16 * Math.random() | 0, r = "x" == t ? n : 3 & n | 8;
        return r.toString(16)
    }).toUpperCase()
}

console.log( r("xxx"));*/

/**
 * 枚举n对象的属性，如果n对象中的属性为自有属性（非继承），将属性定义为t的原型。
 * @param t t
 * @param n
 */
function n(t, n) {
    var r;
    //for (r in n)n.hasOwnProperty(r) && (t.prototype[r] = n[r])

    for (r in n){
        n.hasOwnProperty(r);
        (t.prototype[r] = n[r]);
    }

}

var a = { a:5};
var b = { b:15};
n(a,b);
//console.log(a.b);

