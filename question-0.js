function getMaxStr (s) {
    let left = 0
    let right = 0
    let max = 0
    let map = {}
    while (right < s.length) {
        //  不满足条件，左指针右移
        let char = s[right]
        if (map[char] >= left) {
            left = map[char] + 1
        }
        max = Math.max(max, right - left + 1)
        map[char] = i
        right++
    }
    return max
    // let max = 0
    // let left = 0
    // let map = {}
    // for (let i = 0; i < s.length; i++) {
    //     let char = s[i]
    //     let right = i
    //     if (map[char] >= left ) {
    //         // 存在重复
    //         left = map[char] + 1
    //     } else {
    //         // 无重复
    //         max = Math.max(max, right - left + 1)
    //     }
    //     map[s[i]] = i
    // }
    // return max
}

console.log(getMaxStr("tmmzuxt"))
// f k s h j

// 输入：s = "ADOBECODEBANC", t = "ABC"
// 输出："BANC
function slideWindow (s, t) {
    let left = 0
    let right = 0
    let map = {}
    for (let i = 0; i < s.length; i++) {
        let char = s[i]
        map[char] = i

    }
}

function isExist (t, str) {
    let subsetMap = {}
    let windowMap = {}
    str.split('').forEach(char => {
        if (subsetMap[ char ]) {
            subsetMap[char]++
        } else {
            subsetMap[char] = 1
        }
    })

    str.split('').forEach(char => {
        if (windowMap[ char ]) {
            windowMap[char]++
        } else {
            windowMap[char] = 1
        }
    })


}


function isContain(s1, s2) {
    let left = 0
    let right = s1.length - 1
    let result = false
    let map = {}
    let window = {}
    if (s1.length > s2.length) {
        return false
    }
    for (let i = 0; i < s1.length; i++) {
        let char = s1[i]
        map[char] = map[char] ? map[char]++ : 1
    }
    while (right < s2.length) {
        let char = s2[right]
        window[char] = window[char] ? window[char]++ : 1
        while (left <= right) {

        }
        if (window == map) {
            // 窗口内字符和s1相等
            return true
        }
        right++
    }
}
// s1: ab; s2: dkffbaler
// window = {d: 1, k}
var checkInclusion = function(s1, s2) {
    const n = s1.length, m = s2.length;
    if (n > m) {
        return false;
    }
    const cnt1 = new Array(26).fill(0);
    const cnt2 = new Array(26).fill(0);
    for (let i = 0; i < n; ++i) {
        ++cnt1[s1[i].charCodeAt() - 'a'.charCodeAt()];
        ++cnt2[s2[i].charCodeAt() - 'a'.charCodeAt()];
    }
    if (cnt1.toString() === cnt2.toString()) {
        return true;
    }
    for (let i = n; i < m; ++i) {
        ++cnt2[s2[i].charCodeAt() - 'a'.charCodeAt()];
        --cnt2[s2[i - n].charCodeAt() - 'a'.charCodeAt()];
        if (cnt1.toString() === cnt2.toString()) {
            return true;
        }
    }
    return false;
};
