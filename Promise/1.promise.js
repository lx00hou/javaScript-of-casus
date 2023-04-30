/**
 * Promise 特点
 * 三种状态 等待(默认) 成功 失败,一旦成功就不能失败 反之一样,同时 无法终止
 * 每个Promise实例都有then 方法
 * new Promise 报错 会变成失败状态
 */

let Promise = require('./Promise');
let promise = new Promise((resolve,reject) => {   // 参数是一个函数 executor 执行器 (立即执行)
    /**
     * 同步执行
     * throw new Error('失败') 报错会直接变为失败状态
     *  */ 
    resolve('suc');
}).then((data) => {
    console.log('成功',data);
},err => {
    console.log('失败');
})


