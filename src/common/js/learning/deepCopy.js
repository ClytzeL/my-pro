/*
 * js深拷贝 
 * @Author: liyan52 
 * @Date: 2020-07-27 11:40:55 
 * @Last Modified by: liyan52
 * @Last Modified time: 2020-07-27 12:02:26
 */
// 方法一：JSON    缺陷：1，不能复制function、正则、Symbol；2，循环引用报错；3，相同的引用会被重复复制
let obj = JSON.parse(JSON.stringify(obj))
// 方法二：递归实现
export default function deepCopy(target){
    //此数组解决了循环引用和相同引用的问题，它存放已经递归到的目标对象
    let copy_objs=[]
    function _deepCopy(target){
        if((typeof target !== 'object') || !target) return target
        if(typeof target == 'function') return target
        for(let i=0;i<copy_objs.length;i++){
            if(copy_objs[i].target === target){
                return copy_objs[i].copyTarget
            }
        }
        let obj = {}
        if(Array.isArray(target)){
            obj =[]
        }
        copy_objs.push({target:target,copyTarget:obj})
        Object.keys(target).forEach(key => {
            if(!obj[key]){return;}
            obj[key] = _deepCopy(target[key])
        })
        return obj
    }
    return _deepCopy(target)
}