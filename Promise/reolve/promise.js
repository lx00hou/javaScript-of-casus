// 将状态存放为常量
const PENDING = 'PENDING';
const RESOLVED = 'RESOLVED';
const REJECTED = 'REJECTED';
/**
 * 统一处理 Promise 返回值
 * 返回值可能是普通纸 也可能是个Promise
 * 判断 x 的值
 */
function resolvePromise(promise2,x,resolve,reject) {
    if(promise2 === x){
        /**
         * 出现下面这种情况,需要抛出错误
         * let PromiseX = new Promise((resolve,reject) => {
         *   return PromiseX
         * })
         */
        return reject(new TypeError('死循环了!!!'))
    }
    if((typeof x === 'object' && x !== null) || typeof x === 'function'){
        /**
         * 对象 或者是 函数
         * 取then(返回结果) 报错 直接返回 失败的Promise
         */
        try {
            let then = x.then;
            if(typeof then === 'function'){
                /**
                 * 有then 方法就认为 当前是个Promise
                 * 不用x.then 原因:不必再次取then的值
                 *  x.then(y =>{},r => {})
                 */
                then.call(x,y => {
                    resolve(y);   // 拿到 promise成功结果 向下传递  
                },r => {
                    reject(r)   // 拿到 promise失败原因 向下传递
                });
            }else {
                /**
                 * {then:123}
                 * 说明x 是个普通对象 直接返回成功的Promise
                 */
                resolve(x);
            }
        } catch (error) {reject(error)}
    }else {
        /**
         * x 是普通值 直接让 Promise 成功
         */
        resolve(x);
    }

    
}

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
class Promise{
    constructor(executor){
        this.status = PENDING;    // 默认pending状态
        this.value = undefined;   // 成功的值(实例上)
        this.reason = undefined;  // 失败的原因
        /**
         * 异步调用
         * 只有当resolve 或者 reject 被异步执行 then方法时
         * status 是pending 状态, 需要订阅 发布
         * onResolvedCb: 成功的 回调数组
         * onRejectedCb: 失败的 回调数组
         */
        this.onResolvedCb = [];
        this.onRejectedCb = [];
        let resolve = (val) => {   // 私有
            /**
             * 成功函数 
             * 只有当前是等待状态 才执行
             * 更改状态 赋值成功值
             */
            if(this.status === PENDING){
                this.value = val;
                this.status = RESOLVED;
                // 处理异步
                this.onResolvedCb.length && this.onResolvedCb.forEach(fn => fn())  //发布
            }

        }
        let reject = (reason) => {
            /**
             * 失败函数 
             * 只有当前是等待状态 才执行
             * 更改状态 赋值失败原因
             */
            if(this.status === PENDING){
                this.reason = reason;
                this.status = REJECTED;
                // 处理异步
                this.onRejectedCb.length && this.onRejectedCb.forEach(fn => fn())   // 发布
            }

        }
        try {
            // 报错 直接走失败状态
            executor(resolve,reject)    // 执行器立即执行
        } catch (error) { reject(error) }
    }
    // 原型then方法 
    then(onfulfilled,onrejected){
        onfulfilled = typeof onfulfilled === 'function' ? onfulfilled : val => val; 
        onrejected = typeof onrejected === 'function' ? onrejected : err => {
            throw err
        } 
        /**
         * onfulfilled,onrejected 是可选参数
         * 为了实现then的 连续调用
         *  需要递归调用自身 并返回一个新的 Promise
         */
        let promise2 = new Promise((resolve,reject) => {
                // 同步调用
                if(this.status === RESOLVED){
                    setTimeout(() => {//为了 resolvePromise 能获取 new Promise的返回结果 promise2,所以需要异步处理
                        try {     // then 回调中 抛出错误,需要 用tryCatch 进行捕获
                            let x = onfulfilled(this.value);   // 
                            /**
                             * 判断返回结果x和 Promise2 的关系
                             * x 的值 可能是Promise 也可能是 普通值
                             */
                            resolvePromise(promise2,x,resolve,reject)
                        } catch (error) {
                            // onfulfilled() 抛出错误 直接执行 reject
                            reject(error)
                        }
                        
                    },0)
                }    
                if(this.status === REJECTED){
                    setTimeout(() => {
                        try {
                            let x = onrejected(this.reason);
                            // x 的值 可能是Promise 也可能是 普通值 
                            resolvePromise(promise2,x,resolve,reject);
                        } catch (error) {
                            reject(error)
                        }
                        
                    },0)
                }
                // 异步调用 此时状态时 'PENDING'  需要借助发布订阅
                if(this.status === PENDING){   
                    
                    this.onResolvedCb.push(() => {  // 订阅
                        setTimeout(() => {
                            try {
                            let x = onfulfilled(this.value);
                                resolvePromise(promise2,x,resolve,reject);
                            } catch (error) {
                                reject(error)
                            }
                        },0)
                    });
                    this.onRejectedCb.push(() => {  // 订阅
                        setTimeout(() => {
                            try {
                                let x = onrejected(this.reason);
                                resolvePromise(promise2,x,resolve,reject);                            
                            } catch (error) {
                                reject(error)
                            }

                        },0)
                    })

                }
        })

        return  promise2   // 返回新的Promise 能够持续调用then

    }
    //  类名调用 
    static resolve(value){
        if(!isPromise(value)) {   // 不是Promise 返回一个 成功的 Promise
            return new Promise(resolve => resolve(value))
        }else {
            return value
        }
    }
    
}

module.exports = Promise 