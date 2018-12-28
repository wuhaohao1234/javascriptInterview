var obj = {
    name: 'obj',
    age: 18
};
function deepCopy(obj, obj2) {
    obj2 = {};
    for (var key in obj) {
        obj2[key] = obj[key];
    }
    return obj2;
}
var obj2 = deepCopy(obj, obj2);
console.log(obj === obj2); // false
obj2.height = 175;
console.log(obj2); //{name:'obj',age:18,height:175}
console.log(obj); //{name:'obj',age:18}
