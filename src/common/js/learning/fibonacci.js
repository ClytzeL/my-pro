/*
 * 斐波那契数列优化 
 * @Author: liyan52 
 * @Date: 2020-08-03 11:06:00 
 * @Last Modified by: liyan52
 * @Last Modified time: 2020-08-03 14:10:11
 */
// 递归实现,优化的思路都是减少相同函数的重复调用
function fib(n){
    if(n==0) return 0
    if(n==1 || n==2) return 1
    return fib(n-1)+fib(n-2)
}
// 非递归实现:两个指针同步向后移动
function fib(n){
    if(n==0) return 0
    if(n==1 || n==2) return 1
    let last1 = 1,last2 = 1,tmp
    for(let i=3;i<=n;i++){
        tmp = last1+last2
        last1=last2
        last2=tmp
    }
    return last2
}
// 优化2：空间换效率,把计算出的值放到数组里
function fib(n){
    let arr = [0,1,1]
    for(let i=3;i<=n;i++){
        arr[i] = arr[i-1]+arr[i-2]
    }
    return arr[n]
}
// 优化3：使用缓存
function fib(n){
    let cache = [0,1,1]
    function _fib(n){
        if(cache[n])return cache[n]
        cache[n]=fib(n-1)+fib(n-2)
        return cache[n]
    }
    return _fib(n)
}
// 优化4：使用缓存数组二
function fib(n,memory){
    if(!memort){
        memory=[]
    }
    if(n<2)return n
    if(!memory[n]){
        memory[n] = fib(n-1,memory)+fib(n-2,memory)
    }
    return memory[n]
}
// 优化5：使用动态规划
function fib(n){}