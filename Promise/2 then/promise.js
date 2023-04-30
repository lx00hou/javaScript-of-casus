// 将状态存放为常量
const PENDING = 'PENDING';
const RESOLVED = 'RESOLVED';
const REJECTED = 'REJECTED';
class Promise{
    constructor(executor){
        this.status = PENDING;    // 默认pending状态
        this.value = undefined;   // 成功的值(实例上)
        this.reason = undefined;  // 失败的原因
        /**
         * 异步调用
         * 只有当resolve 或者 reject 被异步执行时 then方法时
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
        // 同步调用
        if(this.status === RESOLVED){
            onfulfilled(this.value)
        }
        if(this.status === REJECTED){
            onrejected(this.reason)
        }
        // 异步调用 此时状态时 'PENDING'  需要借助发布订阅
        if(this.status === PENDING){   // 订阅
            this.onResolvedCb.push(() => {    
                onfulfilled(this.value)
            });
            this.onRejectedCb.push(() => {
                onrejected(this.reason)
            })
        }

    }
    
}

module.exports = Promise 