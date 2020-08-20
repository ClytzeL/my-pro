/*
 *  闭包
 * @Author: liyan52 
 * @Date: 2020-06-26 12:32:41 
 * @Last Modified by: liyan52
 * @Last Modified time: 2020-07-22 15:21:20
 */
for(var i=1;i<=5;i++){
    (function(){
        var j=i;
        setTimeout(function(){
            console.log(j);
        },j*1000)
    })()
}
for(var i=1;i<=5;i++){
    (function(j){
        setTimeout(function(){
            console.log(j);
        },j*1000)
    })(i)
}
for(var i=1;i<=5;i++){
    (function(i){
        setTimeout(function(){
            console.log(i);
        },i*1000)
    })(i)
}

for(var i=1;i<=5;i++){
    let j=i;
    setTimeout(function(){
        console.log(j);
    },j*1000)
}
// 扩展一个已有数组，不新建数组
var a = [1,2]
var b=[3,4]
a.push.apply(a,b)
Array.prototype.push.apply(a,b)

function reverse(head){
    if(!head.next)return head
    let prev=null,cur = head ,tmp
    while(cur){
        tmp = cur.next
        cur.next=prev
        prev = cur
        cur =cur.next
    }
}