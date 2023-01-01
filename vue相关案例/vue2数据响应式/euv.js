/**
 *  将对象中的每个属性 挂载到 Object.defineProperty();
 *  通过全局变量获取 所在属性触发时的 所在函数
 *  赋值时 依次更新依赖函数
 * * */
function observer(obj){
    for (const key in obj) {
        let value = obj[key];
        let func = new Set();
        Object.defineProperty(obj,key,{
            get:() => {
                /*
                * 收集依赖 : 收集当前读取该属性的函数
                * */
                window._fun && func.add(window._fun);
                return value
            },
            set:(val) => {
                value = val; 
                // 派发更新 : 依次运行依赖函数
                for (const iterator of [...func]) {
                    iterator();
                }
            }
        })
    }
}

// 方便收集依赖 函数执行时,将函数先挂在到全局变量 window._fun
function autoRun(fn){
    window._fun = fn;
    fn();
    window._fun = null;
}