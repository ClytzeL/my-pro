/*
 * compose函数 
 * 所以流程就是从init自右到左依次执行，下一个任务的参数是上一个任务的返回结果，并且任务都是同步的，这样就能保证任务可以按照有序的方向和有序的时间执行。
 * 第一个函数是多元的（接受多个参数），后面的函数都是单元的（接受一个参数）
 * 执行顺序的自右向左的
 * 所有函数的执行都是同步的
 * @Author: liyan52 
 * @Date: 2020-06-24 15:18:40 
 * @Last Modified by: liyan52
 * @Last Modified time: 2020-06-24 17:19:17
 */

function fun1(a){
    // console.log(a+111)
    return a+111
}
function fun2(b){
    // console.log(b+222)
    return b+222
}
function fun3(){
    // console.log(333)
    return 333
}

// 方法一：面向过程
function compose1(...args){
    // console.log('args',args)
    let count = args.length-1
    let result
    return (function fn(...arg){
        // console.log('arg',arg)
        // console.log('this',this == global)
        result = args[count].apply(null,arg)
        if(count <= 0){
            count--
            return result
        }
        count--
        return fn.call(null,result)
    })()
}
console.log(compose1(fun1,fun2,fun3))
// 方法二：函数组合
const _pipe = (f, g) => (...arg) => g.call(null, f.apply(null, arg))
const compose2 = (...args) => args.reverse().reduce(_pipe, args.shift())
console.log(compose2(fun1,fun2,fun3)())
// 方法三：AOP
//ref: https://segmentfault.com/a/1190000011447164
// 方法四：promise
// ES6引入了Promise，Promise可以指定一个sequence，来规定一个执行then的过程，then函数会等到执行完成后，再执行下一个then的处理。启动sequence可以使用
// Promise.resolve()这个函数。构建sequence可以使用reduce
const compose4 = function(...args) {
    let init = args.pop()
    return function(...arg) {
        return args.reverse().reduce(function(sequence, func) {
            return sequence.then(function(result) {
                return func.call(null, result)
            })
        }, Promise.resolve(init.apply(null, arg)))
    }
}
console.log(compose4(fun1,fun2,fun3)) //不成
// 方法五：Generator
// Generator主要使用yield来构建协程，采用中断，处理，再中断的流程。可以事先规定好协程的执行顺序，
// 然后再下次处理的时候进行参数（结果）交接，有一点要注意的是，由于执行的第一个next是不能传递参数的，所以第一个函数的执行需要手动调用，再空耗一个next，后面的就可以同步执行了。
function* iterateSteps(steps) {
    let n
    for (let i = 0; i < steps.length; i++) {
      if (n) {
        n = yield steps[i].call(null, n)
      } else {
        n = yield
      }
    }
  }
  const compose5 = function(...steps) {
    let g = iterateSteps(steps)
    return function(...args) {
      let val = steps.pop().apply(null, args)
      // 这里是第一个值
      console.log(val)
      // 因为无法传参数 所以无所谓执行 就是空耗一个yield
      g.next()
      return steps.reverse().reduce((val, val1) => g.next(val).value, val)
    }
  }
  console.log(compose5(fun1,fun2,fun3)())// 不成