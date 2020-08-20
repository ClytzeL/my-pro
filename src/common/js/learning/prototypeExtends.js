/*
 * 原型，原型链，继承 
 * @Author: liyan52 
 * @Date: 2020-07-27 10:54:25 
 * @Last Modified by: liyan52
 * @Last Modified time: 2020-07-28 21:29:31
 */
// 原型和原型链
Person.prototype.constructor == Person
person.__proto__ = Person.prototype
// 寄生组合式继承
// 结合借用构造函数传递参数和寄生模式实现继承
function inheritPrototype(subType,superType){
    let prototype = Object.create(superType.prototype)// 创建对象，创建父类原型的一个副本
    prototype.constructor = subType// 增强对象，弥补因重写原型而失去的默认的constructor 属性
    subType.prototype=prototype// 指定对象，将新创建的对象赋值给子类的原型
}

// 父类初始化实例属性和原型属性
function SuperType(name){
    this.name = name;
    this.colors = ["red", "blue", "green"];
}
SuperType.prototype.sayName = function(){
    console.log(this.name);
};
// 借用构造函数传递增强子类实例属性（支持传参和避免篡改）
function SubType(name, age){
    SuperType.call(this, name);
    this.age = age;
}
// 将父类原型指向子类
inheritPrototype(SubType, SuperType);
// 新增子类原型属性
SubType.prototype.sayAge = function(){
    alert(this.age);
}
// ------------------------------------------------------------------------------------------
// JavaScript常用的八种继承方案
// 方法一：原型链继承
// 构造函数、原型和实例之间的关系：每个构造函数都有一个原型对象，原型对象都包含一个指向构造函数的指针，而实例都包含一个原型对象的指针
// 继承的本质就是复制，即重写原型对象，代之以一个新类型的实例
function SuperType(){
    this.property = true
}
SuperType.prototype.getSuperValue=function(){
    return this.property
}
function SubType(){
    this.subproperty = false
}
// 这里是关键，创建SuperType的实例，并将该实例赋值给SubType.prototype
SubType.prototype = new SuperType()
SubType.prototype.getSubValue=function(){
    return this.subproperty
}


// -------------------第一题----——---------------
// 实现一个评星方法, 逻辑如下：
/**
 * 实现一个评星方法
 * 说明：
 *   1. 可根据传入的评分和总数，返回评星结果（用 ★ 和 ☆ 描述）
 *   2. 评分必选项，四舍五入，总数可选，大于0的整数，默认为5
 *   3. 对于评分为空或小于0、评分大于总数、总数小于0或总数非整数的情况，返回'errror'
 *   
 * 示例：
 *  getRate(4); // ★★★★☆
 *  getRate(4, 8); // ★★★★☆☆☆☆
 *  getRate(3.4); //  ★★★☆☆
 *  getRate(5, 2); // 'error'
 *  getRate(-2); // 'error'
 *  getRate(3, 5.5); // 'error'
 */
 
 
function getRate() {
  
}


// -------------------第二题----——---------------
// 完成 convert(list) 函数，实现将 list 转为 tree
/**
 * @param list {object[]}, 
 * @param parentKey {string}
 * @param currentKey {string}
 * @param rootValue {any}
 * @return object
 */
function convert(list, parentKey, currentKey, rootValue) {
}

const list = [
  {
    "id": 19,
    "parentId": 0,
  },
  {
    "id": 18,
    "parentId": 16,
  },
  {
    "id": 17,
    "parentId": 16,
  },
  {
    "id": 16,
    "parentId": 0,
  }
];

const result = convert(list, 'parentId', 'id', 0);
const tree = {
  "id": 0,
  "children": [
    {
      "id": 19,
      "parentId": 0
    },
    {
      "id": 16,
      "parentId": 0,
      "children": [
        {
          "id": 18,
          "parentId": 16
        },
        {
          "id": 17,
          "parentId": 16
        }
      ]
    }
  ]
}

