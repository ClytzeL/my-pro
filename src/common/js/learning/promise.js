/*
 * 实现promise   promise.all  promise.retry  promise.race 
 * ref:https://juejin.im/post/5dc383bdf265da4d2d1f6b23#heading-5
 * @Author: liyan52 
 * @Date: 2020-07-23 07:54:36 
 * @Last Modified by: liyan52
 * @Last Modified time: 2020-08-04 14:55:35
 */
const PENDING = 'pending'
const RESOLVED ='resolved'
const REJECTED ='rejected'
// 1. 定义 status 状态
// 2. onResolveCallback, onRejectCallback 的数组
// 3. 定义 resolve reject 方法
// 4. executor 执行
function Promise(executor){
    let self = this
    // 初始化state为等待态
    self.status = PENDING
    // 成功的值
    self.value = undefined
    // 失败的原因
    self.reason = undefined
    // 存放执行成功的回调
    self.onResolveCallback=[]
    // 存放执行失败的回调
    self.onRejectCallback=[]
    // 成功
     // resolve 做到事情
    // 1. 修改this 实例的状态
    // 2. 修改this 这里的data
    // 3. 遍历执行 this fn1Callback 上挂载的方法
    let resolve = (value) => {
        if (value instanceof Promise) {
            return value.then(resolve, reject);
        }
        setTimeout(() => {//异步执行所有的回调函数
            if(self.status == PENDING){
                self.status = RESOLVED
                self.value = value
                self.onResolveCallback.forEach(fn => fn(value))
            }
        })
    }
    // 失败
    let reject = (reason) =>{
        setTimeout(() => {
            if(self.status == PENDING){
                self.status = REJECTED
                self.reason = reason
                self.onRejectCallback.forEach(fn=>fn(reason))
            }
        })
    }
    
    try{
        // 立即执行
        executor(resolve,reject)
    }catch(err){
        reject(err)
    }
}
// then 链式调用
// Promise对象有一个then方法，用来注册在这个Promise状态确定后的回调。
// 当Promise的状态发生了改变，不论是成功或是失败都会调用then方法
// 原则上then的两个参数需要异步调用
Promise.prototype.then = (onResolved,onRejected) => {
    let self = this
    let promise2
    // 首先对入参onResolved,onRejected做判断,onResolved,onRejected都是可选参数
    onResolved = typeof onResolved == 'function' ? onResolved : function(v){}
    onRejected = typeof onRejected == 'function' ? onRejected : function(r){}
    // 如果 promise 状态是 resolved，需要执行 onResolved ；
    // 如果 promise 状态是 rejected， 需要执行 onRejected ；
    // 如果 promise 状态是 pending， 我们并不能确定调用 onResolved 还是 onRejected ，只能先把方法都保存在 onResolveCallback, onRejectCallback 数组中。等到Promise的状态确定后再处理。
    if(self.status == RESOLVED){
        return promise2 = new Promise((resolve,reject) => {
            // 把 onResolved,onRejected 放在 try catch 里面，毕竟 onResolved,onRejected是用户传入的，报错嘛，很常见
            try{
                let x=onResolved(self.value)
                // onResolved 执行后，会有返回值，通过 resolve 注入到 then 返回的 promise 中
                // 如果 x 是简单值，直接 resolve(x);
                // resolve(x);
                // 需要使用 resolvePromise 方法封装
                resolvePromise(promise2, x, resolve, reject);
            }catch(err){
                reject(err)
            }
        })
    }
    if(self.status == REJECTED){
        return promise2 = new Promise((resolve,reject) => {
            try{
                let x = onRejected(self.value)
                // 如果 x 是简单值，直接 reject(x)   
                // reject(x)
                resolvePromise(promise2, x, resolve, reject);
            }catch(err){
                reject(err)
            }
        })
    }
    if(self.status == PENDING){
        return promise2 = new Promise((resolve,reject) =>  {
            self.onResolveCallback.push((v) => {
                try{
                    let x = onResolved(self.value)
                    resolve(x)
                }catch(err){
                    reject(err)
                }
            })
            self.onRejectCallback.push((v) => {
                try{
                    let x =onRejected(self.value)
                    reject(x)
                }catch(err){
                    reject(err)
                }
            })
        })
    }
}
// resolvePromise 方法，就是为了把 x 包裹成一个正常的promise
// x可能取值：1，普通值resolve(x)；2，promise值，.then(...);3,thenable值  then.call,标志位；4，防止循环引用
function resolvePromise(promise2, x, resolve, reject){
    // 为了防止循环引用
    if (promise2 === x) {
        return reject(new TypeError('Chaining cycle detected for promise!'));
    }
    // 如果 x 是 promise
    if (x instanceof Promise) {
        x.then(function (data) {
            resolve(data)
        }, function (e) {
            reject(e)
        });
        return;
    }
    // 如果 x 是 object 类型或者是 function
    if ((x !== null) && ((typeof x === 'object') || (typeof x === 'function'))) {
        // 拿x.then可能会报错
        try {
            // 先拿到 x.then
            var then = x.then;
            var called
            if (typeof then === 'function') {
                // 这里的写法，是 then.call(this, fn1, fn2)
                then.call(x, (y) => {
                    // called 是干什么用的呢？
                    // 有一些 promise 实现的不是很规范，瞎搞的，比如说，fn1, fn2 本应执行一个，
                    // 但是有些then实现里面，fn1, fn2都会执行
                    // 为了 fn1 和 fn2 只能调用一个, 设置一个 called 标志位
                    if (called) {
                        return;
                    }
                    called = true;
                    return resolvePromise(promise2, y, resolve, reject);
                }, (r) => {
                    if (called) {
                        return;
                    }
                    called = true;
                    return reject(r);
                });
            } else {
                resolve(x);
            }
        } catch (e) {
            if (called) {
                return;
            }
            return reject(e);
        }
    } else {
        resolve(x);
    }
}
// --------------------------------------------------------------------------
// Promise顺序执行：有一个数组，数组元素是返回Promise对象的函数，怎样顺序执行数组中的函数，即在前一个数组中的Promise resolve之后才执行下一个函数
// 准备数据
function generatePromiseFunc(index){
    return function (){
        return new Promise((resolve,reject) => {
            setTimeout(()=> {
                console.log(index)
                resolve(index)
            },1000)
        })
    }
}
const list = []
for(let i=0;i<10;i++){
    list.push(generatePromiseFunc(i))
}
// 方法一：递归调用
function promise_queue(list,index){
    if(index>=0 && index<list.length){
        list[index]().then(()=>{
            promise_queue(list,index+1)
        })
    }
}
promise_queue(list,0)
// 方法二：使用await & async
async function promise_queue(list){
    let index=0
    if(index<list.length){
        await list[index++]()
    }
}
promise_queue(list)
// 方法三：使用Promise.resolve()
//// 这个需要解释下，遍历数组，每次都把数组包在一个Promise.then()中，相当于list[0]().then(list[1]().then(list[2]().then(...))),
// 这样内层Promise依赖外层Promise的状态改变，从而实现逐个顺序执行的效果
function promise_queue(list){
    var sequence = Promise.resolve()
    list.forEach(item => {
        sequence = sequence.then(item)
    })
}
// ----------------------------------------------------------
// 实现promise.all
// 实现promise.race
// 实现promise.allSettled
// 实现promise.retry