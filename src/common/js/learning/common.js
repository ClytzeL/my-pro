/*
 * js基础 
 * @Author: liyan52 
 * @Date: 2020-08-06 17:58:21 
 * @Last Modified by: liyan52
 * @Last Modified time: 2020-08-06 18:10:53
 */
// 模拟实现call,apply,bind ,ref https://github.com/mqyqingfeng/Blog/issues/11
//实现一个call方法：
Function.prototype.myCall = function(context) {
    //此处没有考虑context非object情况
    context.fn = this;
    let args = [];
    for(let i = 1, len = arguments.length; i < len; i++) {
         args.push(arguments[i]);
     }
    context.fn(...args);
    let result = context.fn(...args);
    delete context.fn;
    return result;
}
/*
    实现一个apply方法：
    在浏览器运行，node环境下全局变量是global而非window；
    核心思路就是把函数作为要绑定对象的一个方法,然后执行函数，最后从绑定对象上删除此方法；
*/
Function.prototype.myApply = function (context, arr){
    var context = Object(context) || window;
    //Object(context) 此处考虑调用函数的非object
    context.fn = this;
    // 首先要获取调用call的函数，用this可以获取
    let result;
    if(!arr){
        result = context.fn();
    }else{
        let args = [];
        arr.forEach((item) => {
        args.push(item)
        })
        context.fn(...args);
    }
    return result
    delete context.fn
}
// 模拟实现bind ,借助apply和call,ref https://github.com/mqyqingfeng/Blog/issues/12
Function.prototype.myBind = function(context){
    if (typeof this !== "function") {
        throw new Error("Function.prototype.bind - what is trying to be bound is not callable");
      }
  
      var self = this;
      var args = Array.prototype.slice.call(arguments, 1);
  
      var fNOP = function () {};
  
      var fBound = function () {
          var bindArgs = Array.prototype.slice.call(arguments);
          return self.apply(this instanceof fNOP ? this : context, args.concat(bindArgs));
      }
  
      fNOP.prototype = this.prototype;
      fBound.prototype = new fNOP();
      return fBound;
}
// 简易版,手撕
Function.prototype.myBind = (context,...args1) =>{
    let that=this
    return function(...args2){
        that.apply(context,[...args1,...args2])
    }
}