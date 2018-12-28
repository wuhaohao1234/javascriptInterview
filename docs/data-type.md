# 数据类型

## 一、js六大基本数据类型

### Number(数字)
    常用的数字:二进制，十进制，八进制，Infinty(无穷大)
* 二进制:0b

    实例:0b01

* 八进制:0o

    实例:0o77

* 十六进制:0x

    实例:0xfd11

### String(字符串)

* es2015以前(js)

    使用单引号(')或双引号(")括起来的字符

* es2015~typescript

    模板字符串反引号(`)括起来的字符

### Boolean(布尔值)

    true(真) and false(假)

### Undefined

    已经声明，但没有定义

### Null

    根本不存在
### 总结
```

console.log(NaN == NaN)  //false
console.log(NaN == undefined) //false
console.log(undefined == undefined) //true
```

### Symbol(es6新增内容)

```
var s1 = Symbol();
var s2 = Symbol();

console.log(s1 === s2) // false

// 有参数的情况
var s1 = Symbol("foo");
var s2 = Symbol("foo");

console.log(s1 === s2) // false
```

### 基础数据类型特性:

**存储在栈内存当中**

#### 定义方法:

1. 使用var关键字
```
var a = 3;
a = '字符串'
a = true
```
**非常灵活,具有变量声明提升的特点,无块级作用域的概念**
```
console.log(a) //undefined
var a = 3
```
2. 使用let关键字

**解决了var的很多不足之处**
```
let a = 3;
console.log(c) //没有声明
a = '字符串' //报错
{
    let b = 3;//在块级作用域内定义，外界无法访问
}
console.log(b) //无法访问
let c = 4
```
3. const定义常量

**如果定义基本数据类型只能访问，无法改变,但是如果定义的是引用数据类型的话，可以改变引用内部的属性或方法**

```
const a = 10
a = 5//报错
```

## 二、js引用数据类型

    js中一切皆为对象

**js引用数据类型是保存在堆内存当中,它们的地址是在栈内存当中**
### Object(对象)

    定义对象的三种方式:对象字面量，构造函数,es6的class
```
//对象字面量
let obj = {
    name:'对象',
    age:11,
    fn:function(){
        console.log(this.name)
    }
}
//构造函数
function FnObj() {
    this.age = 18
}
var fnobj = new FnObj()
//class
class objCls {
    
}
```
    一个对象主要关注它属性与方法，依赖

### Array(数组)
```
var arr = [1,2,'字符串',true,Function,Undefined,Array]
```
**数组内部的值可以是任何数据类型,也可以是数组**

### Function(函数)

1. 函数会被提升
```
abc()
function abc() {
    console.log(1)
}
```
2. 函数可以访问外部作用域的变量
```
var a = 3;
function abc() {
    console.log(a)
}
abc()
```
3. 函数内部若已经定义变量便不会再访问外部变量
```
var a = 3;
function abc() {
    var a = '我是一定定义'
    console.log(a)
}
abc()
```
4. 函数参数
    1. 函数可以直接传参，通过arguments接收参数,其中的arguments是个伪数组
```
function abc() {
    console.log(arguments)
}
abc(1,2,3)
```
    2. **函数接收参数特点**

        * 当函数接受的参数是基本数据类型的时候，它会拷贝一个新的基本数据类型变量，会改变这个新变量的值，**不会产生任何作用**，函数一旦执行结束，这个新变量也就销毁
        * 当函数接受的参数是引用数据类型的时候，它就会得到这个引用数据类型的地址，并且可以改变这个引用数据类型
```
var a = 3;
var arr = [1,2,3];
function fn(a,arr) {
    a = 10
    arr.push(4)
}
fn(a,arr)
console.log(a) //3
console.log(arr) //[1,2,3,4]
```

5. 函数的返回值

**函数的返回值可以是一个函数，这样就会造成闭包，这个函数可以访问这个函数内部定义的变量**

```
var d = 20
function abc() {
    var a = 10
    return function def() {
        console.log(a) 
        console.log(d)
    }
}
abc()()
```
6. 函数内部定义的变量,外部无法访问
```
function abc() {
    var a = 3
}
console.log(a)//没有定义,报错
```
7. 立即执行函数
**不会污染全局**
```
(function(root){
    var a = 3;
    function fn() {

    }
    root.fn = fn
})(window)
```
    * 升级版本
    ```
    (function(root,callback){
        root.名字 = callback(参数)
    })(window,function(){
        通过arguments接收参数
        return 暴露的东西
    })
    ```
8. 函数上下文
执行上下文的代码会分成两个阶段进行处理：分析和执行

```
function foo(a) {
  var b = 2;
  function c() {}
  var d = function() {};

  b = 3;

}

foo(1);
```

分析
```
AO = {
    arguments: {
        0: 1,
        length: 1
    },
    a: 1,
    b: undefined,
    c: reference to function c(){},
    d: undefined
}
```
执行
```
AO = {
    arguments: {
        0: 1,
        length: 1
    },
    a: 1,
    b: 3,
    c: reference to function c(){},
    d: reference to FunctionExpression "d"
}
```

### 正确的判断类型:

```
Object.prototype.toString.call(变量)
```

```
// 以下是11种：
var number = 1;          // [object Number]
var string = '123';      // [object String]
var boolean = true;      // [object Boolean]
var und = undefined;     // [object Undefined]
var nul = null;          // [object Null]
var obj = { a: 1 }         // [object Object]
var array = [1, 2, 3];   // [object Array]
var date = new Date();   // [object Date]
var error = new Error(); // [object Error]
var reg = /a/g;          // [object RegExp]
var func = function a() { }; // [object Function]

function checkType() {
    for (var i = 0; i < arguments.length; i++) {
        console.log(Object.prototype.toString.call(arguments[i]))
    }
}

checkType(number, string, boolean, und, nul, obj, array, date, error, reg, func)
//打印结果
[object Number]
[object String]
[object Boolean]
[object Undefined]
[object Null]
[object Object]
[object Array]
[object Date]
[object Error]
[object RegExp]
[object Function]

```
## js深浅拷贝的实现

[js深浅拷贝的实现](https://wuhaohao1234.github.io/javascriptInterview/#/copy)