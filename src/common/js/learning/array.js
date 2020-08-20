/*
 * 数组相关 
 * @Author: liyan52 
 * @Date: 2020-07-28 15:04:10 
 * @Last Modified by: liyan52
 * @Last Modified time: 2020-07-31 12:02:25
 */
// 七种方法实现数组去重
/**
 * 方法一：双重循环去重
 * 双重for（或while）循环是比较笨拙的方法，它实现的原理很简单：先定义一个包含原始数组第一个元素的数组，然后遍历原始数组，
 * 将原始数组中的每个元素与新数组中的每个元素进行比对，如果不重复则添加到新数组中，
 * 最后返回新数组；因为它的时间复杂度是O(n^2)，如果数组长度很大，那么将会非常耗费内存
 * @param {*} arr 
 */
function unique(arr){
    if(!Array.isArray(arr)){
        console.log('type error')
        return
    }
    let res = [arr[0]]
    for(let i=1;i<arr.length;i++){
        let flag = true
        for(let j=0;j<res.length;j++){
            if(arr[i] == res[j]){
                flag = false
                break
            }
        }
        if(flag){
            res.push(arr[i])
        }
    }
    return res
}
/**
 * 方法二：indexOf方法去重法1
 * 数组的indexOf()方法可返回某个指定的元素在数组中首次出现的位置。
 * 该方法首先定义一个空数组res，然后调用indexOf方法对原来的数组进行遍历判断，如果元素不在res中，则将其push进res中，最后将res返回即可获得去重的数组
 * @param {*} arr 
 */
function unique(arr){
    if(!Array.isArray(arr)){
        console.log('type error')
        return
    }
    let res = []
    for(let i =0;i<arr.length;i++){
        if(res.indexOf(arr[i]) === -1){
            res.push(arr[i])
        }
    }
    return res
}
/**
 * 方法三：indexOf方法去重法2  优选
 * 利用indexOf检测元素在数组中第一次出现的位置是否和元素现在的位置相等，如果不等则说明该元素是重复元素
 * @param {*} arr 
 */
function unique(arr){
    if(!Array.isArray(arr)){
        console.log('type error')
        return
    }
    return Array.prototype.filter.call(arr,function(item,index){
        return arr.indexOf(item) === index
    })
}
/**
 * 方法四：相邻元素去重
 * 这种方法首先调用了数组的排序方法sort()，然后根据排序后的结果进行遍历及相邻元素比对，如果相等则跳过改元素，直到遍历结束
 * @param {*} arr 
 */
function unique(arr){
    if(!Array.isArray(arr)){
        console.log('type error')
        return
    }
    arr=arr.sort()
    let res=[]
    for(let i=0;i<arr.length;i++){
        if(arr[i]!==arr[i-1]){//索引异常  arr[0]需要优化处理
            res.push(arr[i])
        }
    }
    return res
}
/**
 * 方法五：利用对象属性去重（哈希表的理论）  优选
 * 创建空对象，遍历数组，将数组中的值设为对象的属性，并给该属性赋初始值1，每出现一次，对应的属性值增加1，这样，属性值对应的就是该元素出现的次数了
 * @param {*} arr 
 */
function unique(arr){
    if(!Array.isArray(arr)){
        console.log('type error')
        return
    }
    let res=[],obj={}
    for(let i=0;i<arr.length;i++){
        if(!obj[arr[i]]){
            res.push(arr[i])
            obj[arr[i]]=1
        }else{
            obj[arr[i]]++
        }
    }
    return res
}
/**
 * 方法六：set与解构赋值去重
 * ES6中新增了数据类型set，set的一个最大的特点就是数据不重复。Set函数可以接受一个数组（或类数组对象）作为参数来初始化，利用该特性也能做到给数组去重
 * @param {*} arr 
 */
function unique(arr){
    if(!Array.isArray(arr)){
        console.log('type error')
        return
    }
    return [...new Set(arr)]
}
/**
 * 方法七：Array.from与set去重
 * Array.from方法可以将Set结构转换为数组结果，而我们知道set结果是不重复的数据集，因此能够达到去重的目的
 * @param {*} arr 
 */
function unique(arr){
    if(!Array.isArray(arr)){
        console.log('type error')
        return
    }
    return Array.from(new Set(arr))
}
// ------------------------------------------------------------------------------------------------------
// 判断是否是数组  typeof只适合判断基本类型，判断引用类型时不能具体到哪一种类型
typeof null // object
typeof undefined // undefined
// 比较好的方法
Array.isArray(arr)
Object.prototype.toString(arr)
Object.prototype.toString.call(obj).slice(8,-1);
// 两种简单，但是不准确的方法
var arr = [4,67,23];
arr instanceof Array; //return true 
arr.constructor == Array; // return true
// instanceof 用法：1、判断一个实例是否属于某种类型；2、判断一个实例是否属于它的父类型
function Person() {};
function Student() {};
var p = new Person();
Student.prototype = p;
var s = new Student();
console.log(s instanceof Student); //true
console.log(s instanceof Person); //true
// 记忆：
// A instanceof C   等价于  A 是否是 C子类，或者后代？
// f instanceof Foo 判断逻辑是：f的__proto__一层一层往上，能否对应到Foo.prototype
// 简单实现instanceof函数
function _instanceof(L,R){
    var R=R.prototype
    var L=L.__proto__
    while(true){
        if(L == null){
            return false
        }
        if(L==R){
            return true
        }
        L=L.__proto__
    }
}
// instanceof不准确的原因：instanceof操作符的问题在于，它假定只有一个全局环境。
// 如果网页中包含多个框架，那实际上就存在两个以上不同的全局执行环境，从而存在两个以上不同版本的Array构造函数。
// 如果你从一个框架向另一个框架传入一个数组，那么传入的数组与在第二个框架中原生创建的数组分别具有各自不同的构造函数。
var iframe = document.createElement('iframe');
document.body.appendChild(iframe);

var arr = [1,2,3];
xArray = window.frames[0].Array;  //iframe中的构造函数
var arrx = new xArray(4,5,6);

console.log(arrx instanceof Array);  //false
console.log(arrx.constructor == Array);// false

console.log(Array.prototype == xArray.prototype); //false
console.log(arr instanceof xArray); //false

console.log(arrx.constructor === Array);// false
console.log(arr.constructor === Array);// true
console.log(arrx.constructor === xArray);// true
console.log(Array.isArray(arrx));  //true
// constructor不准确的原因：因为constructor可以被重写，所以不能确保一定是数组
var str = 'abc';
str.constructor = Array;
str.constructor === Array // return true
// ----------------------------------------------------------------------------
// 最大连续子数组
// 方法一，暴力搜索，即在C(n,2)种可能的方法中寻找符合题意得一种，显然时间复杂度为θ(n²);
export function findCrossbigSubarray(arr){
    if(!Array.isArray(arr) || arr.length == 0) return
    if(arr.length == 1) return arr[0]
    let  sum= Number.MIN_SAFE_INTEGER,curSum
    for(let i=0;i<arr.length;i++){
        curSum=0
        for(let j=i;j<arr.length;j++){
            curSum+=arr[j]
            if(curSum>sum){
                sum=curSum
            }
        }
    }
    return sum
}