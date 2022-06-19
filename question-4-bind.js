/*
* 实现思路：
* 1、先实现最基本的bind函数功能，返回一个函数，通过apply方法来绑定this指向，支持传递参数
* */
function myBind_1 () {
    let _this = this
    let obj = Array.prototype.shift.call(arguments)
    let _args = Array.prototype.slice.call(arguments)
    return function () {
        let _args1 = Array.prototype.slice.call(arguments)
        return _this.apply(obj, _args.concat(_args1))
    }
}

/*
* 2、bind返回的函数可以作为构造函数使用，此时之前绑定的this就会失效被忽略（注释1），但是传入的参数仍然有效；并且使用该函数new出来的对象继承了绑定函数的原型对象的所有属性和方法（注释2）
* 📢得到最终版如下：
* */
function myBind () {
    let _this = this
    let obj = Array.prototype.shift.call(arguments)
    let _args = Array.prototype.slice.call(arguments)
    function A () {
        let self = this
        let _args1 = Array.prototype.slice.call(arguments)
        if (self instanceof A) {
            // 注释1
            return _this.apply(self, _args.concat(_args1))
        }
        return _this.apply(obj, _args.concat(_args1))
    }
    // 注释2
    A.prototype = _this.prototype
    /*
    * 👆上面的写法：当我们修改A.prototype时，也会直接修改绑定函数_this的原型对象。
    * 所以可以通过一个空函数来中转，写法如下：
    * */
    // function B () {}
    // B.prototype = _this.prototype
    // A.prototype = new B()
    return A
}

Function.prototype.myBind = myBind

function fun (arg1) {
    this.status = 'happy'
    console.log(this.name, arg1, '在fun内')
    return 'success'
}

fun.prototype.superStatus = 'very happy'

let obj = {
    name: 'shasha'
}

let bindFun = fun.myBind(obj, 1)
// console.log(bindFun(2), '自己实现的bind')
let result = new bindFun(2)
console.log(result.superStatus)

// let bindFun1 = fun.bind(obj, 3)
// let result = new bindFun1(2)
// console.log(result.superStatus)
// console.log(bindFun1(4), '原生bind')
