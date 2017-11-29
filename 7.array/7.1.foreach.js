/**
 * Created by Think on 2016/7/26.
 */

function foreach(a, f, t) {
    try {
        a.forEach(f, t);
    } catch (e) {
        if (e === foreach.break) return;
        else throw e;
    }
}

foreach.break = new Error("stopInteration");

var a = [1, 2, 3, 4, 5, 6, 7];
function f(v, i, a) {
    console.log(i, ":", v);
    if (i >= 3) {
        throw  new Error("stopInteration");
    }
}

foreach(a, f, null);
