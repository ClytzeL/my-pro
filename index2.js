function fn(start,end){
    if(typeof start !='number' || typeof end !='number')return
    if(start <= 0 || end <= 0) return
    if(start == end) return 0
    if(start>end){
        return start-end
    }
    let count=0,curLevel = start
    while(curLevel != end){
        if(curLevel>end){
            count=count+curLevel-end
            curLevel = end
        }else{
            count = count+1
            curLevel=curLevel*2
        }
    }
    return count
}
console.log(fn(2,7))


// 滴滴一面
function myNew(cons){
    if(Object.prototype.toString.call(cons) != '[object Function]')return
    let obj={}
    obj.__proto__ = cons.prototype
    let res = obj.call(cons)
    if(res){
        return res
    }
    return obj
}
person.say.myCall(obj)
call 
Function.prototype.myCall = (context,...args) => {
    let self = this
    return self.apply(context,args)
    
}
// var arr1 = [     {ID: "4001104",pxId: 2001,dj: 1,bh: 4001104},     {ID: "4001105",pxId: 2005,dj: 1,bh: 4001105},     {ID: "4010102",pxId: 2001,dj: 10,bh: 4010102},     {ID: "4010103",pxId: 2005,dj: 10,bh: 4010103},     {ID: "4010104",pxId: 2001,dj: 10,bh: 4010104},     {ID: "4001102",pxId: 2001,dj: 1,bh: 4001102},     {ID: "4001103",pxId: 2002,dj: 1,bh: 4001103},     {ID: "4001106",pxId: 2003,dj: 1,bh: 4001106},     {ID: "4001101",pxId: 2001,dj: 2,bh: 4001101},     {ID: "4010101",pxId: 2001,dj: 10,bh: 4010101} ];
// sort（function(){return 1}，）
arr1.sort((a,b)=>{return a.ID-b.ID})
function fn(n){
    if(n==0 || n==1)return 1
    fn(n-1)+fn(n-2)
}
// nanachi 中后台  小程序

// 网易  一面
const log = (...args) => {
    return console.log('log',...args)
}
console.prototype.log = (...args) => {
    return function (...args2){
        console.log('log',...args2)
    }
}

function sum(a,b,c){
    return a+b+c
}

function curry(fn){
    let argu = fn.arguments
    let argArr=[]
    return function c(...args){
        if(args.length === argu.length){
            return fn(...args)
        }
        while(args.length < argu.length){
            argArr.concat(args)
            return c(argArr)
        }

    }
}
const cSum=curry(sum)
console.log(cSum(1,2,3))
console.log(cSum(1,2)(3))
console.log(cSum(1)(2)(3))
