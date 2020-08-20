/*
 * 节流 
 * 节流的核心思想: 如果在定时器的时间范围内再次触发，则不予理睬，等当前定时器完成，才能启动下一个定时器任务。
 * @Author: liyan52 
 * @Date: 2020-06-28 16:07:22 
 * @Last Modified by: liyan52
 * @Last Modified time: 2020-06-28 17:46:09
 */
// 定时器方式一：定时器回调函数中的this会丢失，通过bind绑定
function throttle(fn,interval){
    let flag = true
    return function(...args){
        if(!flag)return
        flag = false
        setTimeout(function timer(){
            fn.apply(this,args)
            flag=true
        }.bind(this),interval)
    }
}
// 定时器方式二：定时器回调函数中的this会丢失，通过箭头函数用当前词法作用域覆盖this的值
function throttle2(fn,interval){
    let flag = true
    return function(...args){
        if(!flag)return
        flag = false
        setTimeout(()=>{
            fn.apply(this,args)
            flag=true
        },interval)
    }
}
// 节流方式三：面向过程，判断时间差
function throttle3(fn,interval){
    // let last = 0
    let last = 0 // 让第一次执行
    return function(...args){
        // let current = Date.now()
        let now = + new Date()
        if(now - last < interval)return;
        last = now
        fn.apply(this,args)
    }
}
/* 
 * 防抖
 * 核心思想: 每次事件触发则删除原来的定时器，建立新的定时器。跟王者荣耀的回城功能类似，你反复触发回城功能，那么只认最后一次，从最后一次触发开始计时。 
*/
function debounce(fn,delay){
    let timer = null
    return function(...args){
        
        if(timer)clearTimeout(timer);
        timer = setTimeout(()=>{
            fn.apply(this,args)
        },delay)
    }
}
/* 
 * 防抖加节流
 * 原因：防抖触发过于频繁时会导致一次响应都没有，期望到了固定时间必须给用户一个响应。 
*/
function throttleAndDebounce(fn,delay){
    let last = 0,timer = null
    return function(...args){
        let now = +new Date()
        if(now - last > delay){
            if(timer)clearTimeout(timer)
            timer = setTimeout(()=>{
                last = now
                fn.apply(this,args)
            },delay)
        }else{
            // 这个时候表示时间到了，必须给响应,逻辑应该有问题
            last = now;
            fn.apply(this,args)
        }
    }
}