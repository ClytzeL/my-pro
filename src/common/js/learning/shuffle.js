/*
 * 打乱数组 
 * @Author: liyan52 
 * @Date: 2020-07-21 10:38:49 
 * @Last Modified by: liyan52
 * @Last Modified time: 2020-07-21 10:59:48
 */
/**
 * 思想：Fisher–Yates shuffle 洗牌算法
 * 第一遍：随机产生一个位置，该位置元素与最后一个元素进行交换。第二遍：随机产生一个位置，与倒数第二个位置元素交换。循环整个数组
 * @param {*} arr 
 */
export function shuffle(arr){
    let length=arr.length
    let t,i
    while(length){
        i = Math.floor(Math.random()*m--)
        t = arr[m]
        arr[m]=arr[i]
        arr[i]=t
    }
    return arr
}
var reversePrint = function(head) {
    console.log(head)
    if(!head) return
    let stack=[]//使用栈
    while(head){
        stack.unshift(head.val)
        head=head.next
    }
    for(let i=0;i<stack.length;i++){
        console.log(stack[i])
    }
    return stack
};