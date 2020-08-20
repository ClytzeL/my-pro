/*
 * this 
 * @Author: liyan52 
 * @Date: 2020-06-28 23:29:43 
 * @Last Modified by: liyan52
 * @Last Modified time: 2020-06-28 23:59:13
 */
function foo(num){
    console.log('foo:'+num)
    // 记录foo被调用的次数
    this.count++
}
foo.count = 0
for(var i=0;i<10;i++){
    if(i>5){
        foo(i)
    }
}
console.log(foo.count)
console.log(count)
// foo:6
// foo:7
// foo:8
// foo:9
// 0
// NaN
// -------------------------------
function foo(num){
    console.log('foo:'+num)
    // 记录foo被调用的次数
    foo.count++// foo指向foo本身
}
foo.count = 0
for(var i=0;i<10;i++){
    if(i>5){
        foo(i)
    }
}
console.log(foo.count)
// foo:6
// foo:7
// foo:8
// foo:9
// 4
// -------------------------------
function foo(num){
    console.log('foo:'+num)
    // 记录foo被调用的次数
    this.count++// foo指向foo本身
}
foo.count = 0
for(var i=0;i<10;i++){
    if(i>5){
        foo.call(foo,i)// 强制this指向foo
    }
}
console.log(foo.count)
// foo:6
// foo:7
// foo:8
// foo:9
// 4
// -------------------------------
function foo1(){
    var a=2;
    // this.bar()
}
function bar(){
    console.log(this)
    console.log(this == global)
    console.log(this.a)
}
// foo1()
bar.call(foo)
bar()
