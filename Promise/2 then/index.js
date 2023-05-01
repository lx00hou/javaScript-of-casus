/**
 * then 特点 
 * 两种情况会失败 返回失败Promise 或者 抛出异常
 * 每次执行Promise时 都会返回一个新的promise 实例
 */


let Promise = require('./promise');
let p = new Promise((resolve,reject) => {
    resolve(100);
}).then(data => {
    throw new Error('错了')
}).then(e => {
},err => {
    console.log(err);
})
