/**
 * Created by Think on 2016/7/22.
 */

var o = {                           // 对象0

    m : function(){                 // 对象中的方法m()
        var self = this;            // 将this的值保存到一个变量中
        console.log( this === o );  // 输出true,this就是这个对象o
        f();                        // 调用辅助函数f()

        function f() {                      // 定义一个嵌套函数f()
            console.log( this === 0);       // "false": this的值全局对象那个或undefined
            console.log( self === 0);       // "true" ：self指想外部函数的this值
        }
    }
}
