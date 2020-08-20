/*
 * 快速排序 
 * @Author: liyan52 
 * @Date: 2020-07-20 10:14:48 
 * @Last Modified by: liyan52
 * @Last Modified time: 2020-07-20 12:22:15
 */
/**
 * 
 * 它的基本思想是：通过一趟排序将要排序的数据分割成独立的两部分，
 * 其中一部分的所有数据都比另外一部分的所有数据都要小，然后再按此方法对这两部分数据分别进行快速排序，
 * 整个排序过程可以递归进行，以此达到整个数据变成有序序列。
 */
/**
 * 
 * @param {*} arr 
 */
export function quickSort(arr){
    if(arr.length<=1)return arr
    let preIndex = Math.floor(arr.length/2)
    let pre = arr.splice(preIndex,1)[0]
    let left = [],right = []
    for(let i = 0;i<arr.length;i++){
        if(arr[i]<pre){
            left.push(arr[i])
        }else{
            right.push(arr[i])
        }
    }
    return quickSort(left).concat([pre],quickSort(right))
}
// ------------分割线，快排2------------------
//数组内元素交换
export function swap(arr,i,j){
    let t = arr[i]
    arr[i] = arr[j]
    arr[j] = t
}
