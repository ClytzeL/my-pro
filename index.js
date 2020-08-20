// 贝壳找房？十一贝？
Promise.prototype.all=(...args) => {
    let count = 0,result,rej
    for(let i=0;i<args.length;i++){
       await new Promise(args).then(() =>{
            count+=1
        },()=>{
            rej= reject()
        })
    }
    if(count == args.length){
        result =resolve(callback)
    }
    return new Promise(result,rej)
}

Function.prototype.bind = (context,...args1) =>{
    let that=this
    return function(...args2){
        that.apply(context,[...args1,...args2])
    }
}

// 美团一面 二面
console.log('Hello World!');
function reverseStr(str){
    if(typeof str != 'string') return;
    return str.split('').reverse().join()
}
function arrToSet(arr){
    if(!Array.isArray(arr)) return
    let arrObj = {}
    let repeatIndex=[]
    for(let i=0;i<arr.length;i++){
        if(arrObj.hasOwnProperty(arr[i])){
           repeatIndex.push(i)
       }else{
           arrObj[arr[i]].item = arr[i]
           arrObj[arr[i]].index = i
       }
    }
    for(let i =0;i<repeatIndex.length;i++){
        arr.splice(repeatIndex[i],1)
    }
    return arr
}
Array.prototype.slice = function(...args){
    let start,end
    let self = this
    let arr=[]
    if(args.length == 0) return self
    if(args.length ==1){
        start = args[0]
        if(typeof start != 'number'){
           console.log('start need number')
        }
        if(start>self.length || start < 0 )return []
        for(let i=start;i<self.length;i++){
            arr.push(self[i])
        }
        return arr
    }
    if(args.length == 2){
        [start,end] = [...args]
        if(typeof start !='number' || typeof end !='number'){
            console.log('...')
        }
        if(start> self.length){
             return []
        }
        if(start > end){
            if(end > 0){
                return []
            }else{
                for(let i=start;i<(end+self.length);i++){
                    arr.push(self[i])
                }
            }
        }else{
            if(start<0)return []
            for(let i = start;i<Math.min(self.length,end);i++){
                arr.push(self[i])
            }
        }
        return arr
    }
}
console.log([1,2,3,4,5].slice('1',-2))

// 百度 一面
// function A(a) {
//     this.a = a
// }
// A.prototype.hello = function () {
//     console.log(this.a)
// }
// function B(a) {
//     this.a = a * 2
// }
// let a = new A(1)
// let b = new B(1)
// b.__proto__ = A.prototype
// B.prototype.hello = function () {
//     console.log(this.a)
// }
// a.hello()
// b.hello()

// function exten(consFather, consSon) {
//     consSon.prototype.__proto__ = consFather.prototype
// }

// A->B->C...

// a<-b<-c

// A.prototype.constructor=A
// c.__proto__.__proto__ = a  null

function quickSort(arr) {
    // if (!Array.isArray(arr)) return
    if (arr.length == 0) return []
    if (arr.length == 1) return arr
    let left = [], right = []
    // let tIndex = Math.floor(arr.length / 2)
    // console.log(tIndex, arr.length)
    let t = arr[0]
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < t) {
            left.push(arr[i])
        } else {
            right.push(arr[i])
        }
    }
    return quickSort(left).concat([t], quickSort(right))
}
let a = [3, 2, 4, 1, 0, 6]
console.log(quickSort(a))
function quickSort(arr) {
    let t = 0, i = 1, j = arr.length - 1
    let tmp
    while (i <= j) {
        if (arr[t] > arr[i]) {
            tmp = arr[t]
            arr[t] = arr[i]
            arr[i] = tmp
            t = i
            i++
        }
    }
}

//美团快驴
var aHello = {
    name : "hello", 
    showName : function() {
    console.log(this.name); 
    } 
}
document.querySelector('a').onclick = aHello.showName; // hello

var A = function(){}
A.prototype.n = 1;
var b = new A();
A.prototype = {
    n: 2,
    m: 3
}
A.prototype.constructor =A
A.prototype.__proto__= {
    n: 2,
    m: 3
}
var c = new A();
console.log(b.n, b.m, c.n, c.m);//1,undefined,undefined,undefined

var a = 1;

var obj = {
  i: 10,
  b: () => console.log(this.i, this),
  c: function () {
    console.log(a);
    var a = 2; 
  },
  d: function () {
    console.log(0);
    setTimeout(_ => console.log(1));
    new Promise(resolve => {
      console.log(2);
    }).then(_ => {
      console.log(3);
    });
    console.log(4)
  }
}
obj.b()//undefined,window
obj.c()// undefined   1
obj.d()// 0 2 4 3 1
// 斐波那契优化
function fn(n){
    let tmp=[]
    if(n==0) return tmp[n]=0
    if(n==1 || n==2) return tmp[n]=1
    if(n>2){
        tmp[n]=tmp[n-1]+tmp[n-2]
    }
    return tmp[n]
}
// 美团外卖一面

const eventType=['onClick','onTouchStart','onTouchEnd','...']
function EventEmitter(){
    this.queue={}
}
EventEmitter.prototype.on = (eventName,callback)=>{
        if(this.queue[eventName]){
            this.queue[eventName].push(callback)
        }else{
            this.queue[eventName]=[callback]
        }
    }
EventEmitter.prototype.triger=async function(eventName){
        if(!this.queue[eventName])return
        this.queue[eventName].forEach(fn => await fn.call())
    }
EventEmitter.prototype.unbind=(eventName,callback) =>{
        let index = this.queue[eventName].indexOf(callback)
        if(index>-1){
            this.queue[eventName].splice(index,1)
        }
    }
//on 
//triger  
//unbind(eventName,callback)

String.prototype.trim = (str) => {
    return str.split('').filter(s => s!= ' ').join()
}

function debounce(callback,defer){
    let flag=true
    return function(){
        setTimeout(()=>{
           flag = false
           callback()
           flag = true
        },defer)
    }
}


function A(){}

function newMethod(callback){
    let obj={}
    obj.__proto__ = callback.prototype
    obj.callback()
    return obj
}
// 字节跳动 一面
function promisify(fn){
    return function (...args){
        return new Promise((resolve,reject) => {
            try{
                let data = fn(...args)
                resolve(data)
            }catch(err){
                reject(err)
            }
            
        })
    }
}


async function async1() { 
     console.log('async1 start'); 
     await async2(); 
     console.log('async1 end');
} 

async function async2() {    
    console.log('async2'); 
} 

console.log('script start'); 

setTimeout(function() {    
    console.log('setTimeout'); 
}, 0); 

async1(); 

new Promise(function(resolve) {    
    console.log('promise1'); 
     resolve(); 
}).then(function() { 
     console.log('promise2'); 
}); 

 console.log('script end');
// 宏任务 setTimeout 
// 微任务 async1 promise
// 'script start'  'async1 start' 'async2' 'promise1' 'script end' 'async1 end'
// 'promise2' 'setTimeout'
// 最大连续子数组
function fn(arr){
    let tmp=[arr[0]],count
    for(j =1;j<arr.length;j++){
        
    }
    while(i<arr.length){
        let tmpCount=count(tmp)
        if(tmpCount+arr[i]>=tmpCount){
            tmp.push(arr[i++])
        }else{
            if(tmp[0]<arr[i]){
                tmp.shift()
                tmp.push(arr[i])
            }
        }
    }
}
    function count(arr){
        return arr.reduce((a,b) =>a+b,0)
    }
// 快手平台研发  一面   主要技术栈vue
//.container{
//    display:flex;
//    align-items:center;
//    justify-content:center;
//}
//.box{
//    padding:calc(~'100vh/4');
//    border:solid 1px #000;
//}
//<div className="container">
//    <div className="box"></div>
//</div>

//2,3,undefined
//get-element-by-id 转化成getElementById
// 方法一：str.split(''),查找-后面的字母。替换成大写字母，再join
// 方法二：正则+replace
function trans(s){
    if(typeof s !='string')return;
    let arr = s.split('-')
    
    for(let i=1;i<arr.length;i++){
        let tmp = arr[i].split('')
        tmp[0]=tmp[0].toUpperCase()
        arr[i]=tmp.join('')
    }
    return arr.join('')
}
let result = trans('get-element-by-id')
console.log(result)
// webpack打包问了很多，打包优化，bundle那些

// Promise.allSettled(arr).then(res => {
//     // res
// })
// [
// {
//     status: string;
//     value?: any;
//     reason?: Error;
// }
// ]

// polyfill
Promise.prototype.allSettled = (arr) => {
    return new Promise((resolve,reject) => {
        let result=[],count=0,obj={}
        for(let i=0;i<arr.length;i++){
            arr[i].then(res => {
                obj.status='resolved'
                obj.value = res
                result[i]=obj
                count=count+1
                if(count == arr.length){
                    resolve(result)
                }
            }).catch(err => {
                obj.status='rejected'
                obj.reason=err
                result[i]=obj
                count=count+1
                if(count == arr.length){
                    resolve(result)
                }
            })
        }
        
    })
}
function Foo(a){
    this.a=1
    return {a:2,b:3}
}
Foo.prototype.a =4
Foo.prototype.b =5
Foo.prototype.c =6
var o = new Foo()
console.log(o.a,o.b,o.c)//2 3 undefined

// 电梯  上 每次走当前楼层的数量level*2
// 楼梯  下  level+1
//  x up y down z terminal
//  start 2    end 7    3
// 2 4 8    f = 2x - y 
function fn(start,end){
    if(start == end) return 0
    if(start>end){
        return start-end
    }
    let count=0,curLevel = start
    while(curLevel != end){
        if(curLevel>end){
            count=count+curLevel-end
        }else{
            curLevel=curLevel*2
            count = count+1
        }
    }
    return count
}