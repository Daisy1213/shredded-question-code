/*
* 实现一个限流器，add方法接受一个返回promise的函数，同时执行任务数量不超过两个
* 限流器保证同时最多只有两个任务在执行，如果任务是异步的，会等待异步任务完成之后，才去执行其他未执行任务。
* */

class Scheduler {
    constructor () {
        this.taskList = []
        this.cacheTaskList = []
        this.maxNum = 2
        this.count = 0
        // 在这里count和taskList的用途一致，都是来记录当前执行中的任务数量
    }

    async add (task) {
        // if (this.taskList.length >= this.maxNum) {
        if (this.count >= this.maxNum) {
            await new Promise(resolve => {
                this.cacheTaskList.push(resolve)
            })
        }
        // this.taskList.push(task)
        this.count++
        const res = await task()
        this.count--
        // let index = this.taskList.indexOf(task)
        // this.taskList.splice(index, 1)
        if (this.cacheTaskList.length > 0) {
            let firstTaskInCache = this.cacheTaskList.shift()
            firstTaskInCache()
        }
        return res
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

addTask(1000, 1)
addTask(500, 2)
addTask(300, 3)
addTask(400, 4)

async function B () {
    await new Promise((resolve => {
        setTimeout(() => resolve())
    }, 2000))
}
