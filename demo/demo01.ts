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