/**
 * 可以等待所有异步执行完后 拿到统一结果
 * 解决 异步并发 同步处理
 * Promise.all:返回一个Promise;
 * ---循环参数 参数如果是Promise 执行Promise then 拿到 返回值 push 数组 
 * ---循环参数 参数不是Promise push进数组
 * 最后 返回 Promise 
 */

let Promise = require('./promise');
let promise1 = new Promise((resolve,reject) => {
    setTimeout(() => {
        resolve(100)
    },100)
})
let promise2 = new Promise((resolve,reject) => {
    resolve(200)
})
let isPromise = (value) => {
    if( (typeof value === 'object' && value !== null) || typeof value === 'function'){
        // 是个对象 不能为 null 或者 是个函数
        if(typeof value.then === 'function'){
            // 有 then 方法 并且 是个函数  判断是个Promise
            return true
        }
    }else {
        return false
    }
}
// 静态方法 (通过类名调用)
Promise.all = function(values){
    return new Promise((resolve,reject) => {
        let arr = [];   // 存储返回值
        let ids = 0;  // 解决多个异步并发问题 建议使用计数器
        function process(key,value){
            arr[key] = value;
            console.log('');
            if(++ids == values.length){ 
                resolve(arr);  // Promise.all 执行then 方法 拿到 arr;
            }
        }
        for (const [index,item] of values.entries()) {
            if(isPromise(item)){
                item.then((data) => {
                    process(index,data);   // 将每个成功Promise的返回值 push到数组里
                },reject)   // 任何一个Promise 失败了,Promise.all返回失败
            } else process(index,item)
        }
    })
}
Promise.all([promise1,123,promise2]).then(res => {
    console.log('res',res);
})