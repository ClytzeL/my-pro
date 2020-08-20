/*
 * 检查工具函数 
 * @Author: liyan52 
 * @Date: 2020-07-15 16:52:26 
 * @Last Modified by: liyan52
 * @Last Modified time: 2020-07-15 17:00:16
 */
/**
 * 判断是否是纯对象，仅字面量方式创建的对象返回true
 * @param {*} obj 
 */
export default function isPlainObject(obj){
    if(typeof object !== 'object' || obj === null) return false
    let proto = obj
    while(Object.getPrototypeOf(proto) !== null){
        proto = Object.getPrototyprOf(proto)
    }
    return Object.getPrototypeOf(obj) === proto
}
// 区别
// Object.prototype.toString.call({}) === '[object Object]'
// Object.prototype.toString.call(new function Person(){}) // [object Object]
// isPlainObject(new function Person(){}) false
// isPlainObject({}) true
// Object.getPrototypeOf(Object.prototype) === null   true
// Object.getPrototypeOf(Object.prototype) === null // true