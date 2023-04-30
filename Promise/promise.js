// 将状态存放为常量
const PENDING = 'PENDING';
const RESOLVED = 'RESOLVED';
const REJECTED = 'REJECTED';
class Promise{
    constructor(executor){
        this.status = PENDING;    // 默认pending状态
        this.value = undefined;   // 成功的值
        this.reason = undefined;  // 失败的原因
        let resolve = (val) => {
            /**
             * 成功函数 
             * 只有当前是等待状态 才执行
             * 更改状态 赋值成功值
             */
            if(this.status === PENDING){
                this.value = val;
                this.status = RESOLVED;
            }

        }
        let reject = (reason) => {
            /**
             * 失败函数 
             * 只有当前是等待状态 才执行
             * 更改状态 赋值失败原因
             */
            if(this.status === PENDING){
                this.reason = reason
                this.status = REJECTED;
            }

        }
        try {
            // 报错 直接走失败状态
            executor(resolve,reject)    // 执行器立即执行
        } catch (error) {
            reject(error);
        }
    }

    then(onfulfilled,onrejected){
        if(this.status === RESOLVED){
            onfulfilled(this.value)
        }
        if(this.status === REJECTED){
            onrejected(this.reason)
        }

    }
}
module.exports = Promise 