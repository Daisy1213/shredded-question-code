/*
* 实现一个限流器，add方法接受一个返回promise的函数，同时执行任务数量不超过两个
* 限流器保证同时最多只有两个任务在执行，如果任务是异步的，会等待异步任务完成之后，才去执行其他未执行任务。
* 参考链接：https://segmentfault.com/a/1190000040322281
* */

class Scheduler {
    constructor () {
        this.taskList = []
        this.cacheTaskList = []
        this.maxNum = 2
    }

    add (task) {
        if (this.taskList.length >= this.maxNum) {
            // 当前任务数量超出最大数量 2，先放入缓存列表中
           return new Promise((resolve) => {
                this.cacheTaskList.push(resolve)
            }).then(() => {
              return  task().then(() => {
                    let index = this.taskList.indexOf(task)
                    this.taskList.splice(index, 1)
                    if (this.cacheTaskList.length > 0) {
                        let firstTaskInCache = this.cacheTaskList.shift()
                        this.taskList.push(firstTaskInCache)
                        firstTaskInCache()
                    }
                })
            })
        } else {
            this.taskList.push(task)
            // 每个任务执行完以后，弹出该任务，把缓存的任务推进执行列表
            let p = task().then(() => {
                let index = this.taskList.indexOf(task)
                this.taskList.splice(index, 1)
                if (this.cacheTaskList.length > 0) {
                    let firstTaskInCache = this.cacheTaskList.shift()
                    this.taskList.push(firstTaskInCache)
                    firstTaskInCache()
                }
            })
            return p
        }
    }
}

const scheduler = new Scheduler(2)

const timeout = (time) => {
    return new Promise(r => {
        setTimeout(() => {
            console.log('任务正在执行', time)
            r()
        }, time)
    })
}
const addTask = async (time, order) => {
    scheduler.add(() => timeout(time))
      .then(() => console.log(order))
}

addTask(1000, 2)
addTask(300, 3)
addTask(2000, 1)
addTask(800, 4)
// 2 1
