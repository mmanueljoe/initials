import { LinkedList } from "./linkedListTail.js";


class LinkedListStack{
    list = new LinkedList();

    push(value){
        this.list.prepend(value);
    }


    pop(){
        return this.list.removeFromFront();
    }


    peek(){
        return this.list.head.value;
    }

    isEmpty(){
        return this.list.isEmpty();
    }


    getSize(){
        return this.list.getSize();
    }

    print(){
        return this.list.print();
    }
}


const stack = new LinkedListStack();

stack.push(10);
console.log(stack.isEmpty())
stack.print();
console.log('head: ' + stack.peek());
