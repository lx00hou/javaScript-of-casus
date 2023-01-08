/**
 * let mpPromise = new Promise((resolve,rehect) => {})
 * 
 */

class MyPromise {
    /**
     * 静态属性 声明 Promise 的三种状态
     * * */
    static PENDING = 'pedding';
    static FULFILLED = 'fulfilled';
    static REJECTED = 'rejected';
    constructor(executor){  
        this.status = MyPromise.PENDING;   // 默认是 pedding 状态
        this.value = null;      // 值默认为 null
        try {
            executor(this.resolve.bind(this),this.reject.bind(this))   
        } catch (error) {
            this.reject('error')
        }
    }
    resolve(val){
        if(this.status === MyPromise.PENDING) {
            this.value = val;
            this.status = MyPromise.FULFILLED;
        }
    }
    reject(reason){
        if(this.status === MyPromise.PENDING){
            this.value = reason;
            this.status = MyPromise.REJECTED;
        }
    }
}