Function.prototype.myApply = function () {
    let obj = Array.prototype.shift.call(arguments)
    let _args = Array.prototype.slice.call(arguments)
    let _thisFun = this
    _thisFun.prototype = obj
    return new _thisFun(_args)
}

Function.prototype.myCall = function (context) {
    let _args = Array.prototype.slice.call(arguments, 1)
    console.log(_args, '@@@@')
    context.fn = this
    let result = eval('context.fn(' + _args + ')')
    delete context.fn
    return result
}

let obj = {
    name: 'shasha'
}

function fun (arg1, arg2) {
    console.log(this.name)
    console.log(arg1, 'arg1')
    console.log(arg2, 'arg2')
}

fun.myApply(obj)
fun.myCall(obj, 'apple', 4)
