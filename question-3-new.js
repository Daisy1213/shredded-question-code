function Obj () {
    let fun = Array.prototype.shift.call(arguments)
    let result = {}
    result.__proto__ = fun.prototype
    let obj = fun.apply(result, arguments)
    if ((typeof obj === 'object' && obj !== null) || typeof obj === 'function') {
        return obj
    }
    return result
}

function Cat (name, sex) {
    this.name = name
    this.sex = sex
}

let obj = Obj(Cat, 'mimi', 'female')
console.log(obj)
