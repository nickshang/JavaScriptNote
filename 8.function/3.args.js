/**
 * Created by Think on 2016/7/25.
 */
    // 可选参数
    // 将对象o中可枚举的属性名追加至数组a中，并返回这个数组a
    // 如果省略a，这将创建新的数组并返回去这个新的数组
    function getPropertyNames(o, /* optianal*/ a){
        if( a === undefined ) a = [];       // 如果未定义，则使用新数组
        for(var property in o) a.push(property);
        return a;
    }
// 下面的例子展示了使用他来验证实参的个数。从而调正确的逻辑。因为Javscript不会这样做。
function f(x,y,z){
    // 首先，验证传入实参的个数是否正确
    if( arguments.length !=3 ){
        throw new Error("function call with " + arguments.length
            +  "aruguments,but it expents 3 arguments" );
    }
}

// 下面的函数可以接收任意的数据的实参，并返回传入实参的最大值
function max(/*....*/){
    var max = Number.NEGATIVE_INFINITY;
    for(var i = 0; i < arguments.length; i++){
        if(arguments[i] > max) max = arguments[i];

    }
    return max;
}

console.log( "max:", max(1,5,7));

// 将对象属性用做实参：解决性形参定义过多及顺序问题

function arraycopy(/*array*/ from,
                    /*index*/ start,
                    /*array*/ to,
                    /*index*/ to_start,
                    /*integer*/ length){
    // 逻辑代码
}

// 在实际项目中应该添加实参类型检查逻辑，因为宁愿程序传入非法值时报错，也不愿意非法值倒是程序执行时跑错。
// 相比而言，逻辑执行时报错自新不清晰，而且更难处理。下面的例子做类型检查：

// 返回数组(或类数组对象)a的元素的累加和
// 数组a中必须为数组、null和undefined的元素都将忽略
function sum(a){
    if( isArrayLike(a) ){
        var total = 0;
        for (var i = 0 ; i < a.length; i++ ){
            var element = a[i];
            if (element == null ) continue;     // 跳过null和undefined
            if (isFinite(element)) total += element;
            else throw new Error("sum(): elements must be finte numbers");
        }
        return total;
    }
    else throw new Error(" sum(): argurments must be array-like");
}


// 编写实参类型和实参个数不确定性的函数

function flexisum(a){
    var total = 0;
    for (var i =0 ; i <  arguments.length; i++){
        var element = arguments[i],n;
        if (element == null) conintue;          // 忽略null和undefined实参
        if (isArray(element))                   // 如果实参是数组
            n = flexisum.apply(this,elemnet);   // 递归第计算累加和
        else if( typeof element === "function") // 否则，如果是函数
            n = Number(element());              // 调用它并做其他类型转
        else
            n = Number(element);                // 否则直接做类型转换

        if(isNaN(n))                            // 如果无法转换为数组，则抛出异常
            throw Error("flexisum() : can't convert " + element + " to number");
        total += n;
    }

    return total;
}


// 这个版本的实现效率稍微有些低，但是不必去记住实参的顺序
// 并且from_start和to_start都默认为0
function easycopy(args){
    arraycopy(args.from,
        args.from_start || 0,
        args.to,
        args.from_end || 0,
        args.length
    );
}


