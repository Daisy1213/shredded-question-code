/**
 * 模拟实现一个 JSON.stringify object、array、number、string
 */
function stringifyObj (obj) {
    let keys = Object.keys(obj)
    let result = '{'
    keys.forEach(key => {
        let value = typeof obj[key] === 'number' ? obj[key] : obj[key].toString()
        result += ('"' + key + '"' + ':' + value + ',')
    })
    return result + '}'
}

function stringify(input) {
    return input.map(item => {
        let type = typeof item
        if (type === "object") {
            type = Array.isArray(item) ? 'array' : 'object'
        }
        switch (type) {
            case 'string':
                return item.toString()
            case 'number':
                return item
            case 'object':
                return stringifyObj(item)
        }

    })


}

const a = [1, 'b', { c: 1, d: 'e' }]
// [1,"b",{"c":1,"d":"e"}]

console.log(stringify(a))

let b = {
    length: true
}

let list = [1, 2, 4]
let str = 'fdadfa'
console.log(Object.prototype.toString.call(str))

function Test () {

}

Test.prototype = Array.prototype
let test = new Test()
function isArray (val) {
    // object instanceof constructor
    // return val instanceof Array
    return Object.prototype.toString.call(val) === '[object Array]'
}

console.log(isArray(test))
