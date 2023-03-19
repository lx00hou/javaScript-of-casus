// (function(){
    const debounce = function debounce(func,wait) {
        /**
         * func 回调函数
         * wait 自定义间隔时长
         */
        let timer = null;
        return function operate(e){
            // this 指向调用该函数的 btn
            let imm = !timer;  
            timer && clearTimeout(timer);
            timer = setTimeout(() => {
                console.log('清除定时器');
                /**
                 * 不清空定时器 就无法执行 回调 
                 */
                timer = null && clearTimeout(timer);  

            },wait)
            /**
             *  第一次点击 就执行func()
             *  用户不断点击 不断挂载新的定时器
             *  只有当 定时器为null (imm === true) 再次点击 才会再次执行回调  
             */
            if(imm) func.call(this,e)
        }
    } 
    const utils = {
        debounce   // 防抖
    }

    // 导出 api
    // if(typeof window !== 'undefined') window.utils = window._ = utils;
    // if(typeof module === 'object' && typeof module.expors === 'object' ) module.expors = utils 
// })()
