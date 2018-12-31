# 继承
## 继承的多种方式

### 1.原型链继承
```
function Parent() {
    this.name=['html','css']
}
Parent.prototype.getName = function () {
    console.log(this.name)
}
function Child() {
    
}
Child.prototype = new Parent()
var child1 = new Child()
child1.name.push('js')
child1.getName()//[html,css,js]
var child2 = new Child()
child2.getName()//[html,css,js]
```
问题:
1. 引用类型的属性被所有实例共享
2. 创建Child实例不能像Parent传参
### 2.构造函数继承
```
function Parent() {
    this.names=['html','css']
}
function Child() {
    Parent.call(this)
}
var child1 = new Child()
child1.names.push('js')
console.log(child1.names)//[ 'html', 'css', 'js' ]
var child2 = new Child()
console.log(child2.names)//[ 'html', 'css' ]
```
优势:
1. 避免了应用类型的所有属性被实例共享
2. Child可以向Parent传参数
缺点:
1. 方法都在构造函数中定义，每次创建实例都会创建一遍方法。

### 3.组合式继承

```
function Parent(name) {
    this.names = ['html','css']
    this.names.push(name)
}
Parent.prototype.getNames = function () {
    console.log(this.names)
}
function Child(name,age) {
    Parent.call(this,name)
    this.age = age
}
Child.prototype = new Parent()
Child.prototype.constructor = Child

var child1 = new Child('child1',18)
child1.names.push('js')
var child2 = new Child('child2',22)
child1.getNames()//[ 'html', 'css', 'child1', 'js' ]
child2.getNames()//[ 'html', 'css', 'child2' ]
```

优点:
1. 结合原型链继承与构造函数继承，最常用的继承方式

### 4.es6中的继承

```
class Parent {
    constructor(names) {
        this.names = [names]
    }
    getName(){
        console.log(this.names)
    }
    addName(name){
        this.names.push(name)
    }
}
class Child extends Parent {
    constructor(names) {
        super(names)
        console.log(this.names)
    }
}
let child1 = new Child('html')
child1.addName('css')
child1.getName()
let child2 = new Child('js')
child2.addName('ts')
child2.getName()
```