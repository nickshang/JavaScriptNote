/**
 * Created by Think on 2016/7/16.
 */

var o = {x:1, y:{ z: [ false, null ,"" ] } };               // 定义一个测试对象
var json = JSON.stringify(o);                               // 对象转换为字符串
var p = JSON.parse(json);                                   // 字符转换为对象
