# 深浅拷贝

## 对于基本数据类型的拷贝

* 基本数据类型可以通过直接赋值的方式，无需拷贝
```
var a = 3;
var b = a
b = 5
console.log(a)
console.log(b)
```
## 对于引用类型

### 不是特好的拷贝

**只是把在栈中存储的地址赋值给obj2,实际上指向的还是同一个堆内存**

```
var obj = {
    name:'obj',
    age:18
}
var obj2 = obj
console.log(obj2 === obj) //true
obj2.age = 19
console.log(obj) //{ name: 'obj', age: 19 }
console.log(obj2) //{ name: 'obj', age: 19 }
```
### 浅拷贝
    只能拷贝一层子元素(子属性),如果子元素(子属性)还是个引用值，则无法深度拷贝
#### 数组的浅拷贝
```
var arr = [1,2,3]
function deepCopy(arr,arr2) {
    arr2 = []
    for(var i = 0;i < arr.length;i ++) {
        arr2[i] = arr[i]
    }
    return arr2
}
var arr2 = deepCopy(arr,arr2)
console.log(arr2 === arr) //false
arr2.push(4)
console.log(arr) //[1,2,3]
console.log(arr2) // [1,2,3,4]
```
```
var arr = [1,2,{
    name:'arr',
    age:18
}]
var arr2 = [...arr]
console.log(arr)
```
```
var arr = [1,2,{
    name:'obj'
}]
var arr2 = arr.slice(0)
```
```
var arr = [1,2,{
    name:'obj'
}]
var arr2 = arr.concat()
```
#### 对象的浅拷贝

```
var obj = {
    name: 'obj',
    age: 18
}
function deepCopy(obj, obj2) {
    obj2 = {}
    for (var key in obj) {
        obj2[key] = obj[key]
    }
    return obj2
}
var obj2 = deepCopy(obj, obj2)
console.log(obj === obj2) // false
obj2.height = 175
console.log(obj2) //{name:'obj',age:18,height:175}
console.log(obj) //{name:'obj',age:18}
```
### 深拷贝

* Json.parse
**先转为字符串再转为代码,不适合于函数**
```
var arr = ['old', 1, true, ['old1', 'old2'], { old: 1 }]

var new_arr = JSON.parse(JSON.stringify(arr));
```

### 实现

**用到递归深度遍历对象**
```
function deepCopy(obj) {
    var result;

    //引用类型分数组和对象分别递归
    if (Object.prototype.toString.call(obj) == '[object Array]') {
        result = []
        var i
        for (i = 0; i < obj.length; i++) {
            result[i] = deepCopy(obj[i])
        }
    } else if (Object.prototype.toString.call(obj) == '[object Object]') {
        result = {}
        for (var attr in obj) {
            result[attr] = deepCopy(obj[attr])
        }
    }
    //值类型直接返回
    else {
        return obj
    }
    return result
}
```
## js继承的多种方式
(https://wuhaohao1234.github.io/javascriptInterview/#/inherit)