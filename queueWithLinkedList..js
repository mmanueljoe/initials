import { LinkedList } from "./linkedListTail.js";


class LinkedListQueue{
    list = new LinkedList();



    enqueue(value){
        this.list.append(value);
    }

    dequeue(){
        this.list.removeFromFront();
    }


    peek(){
        return this.list.head.value;
    }

    getSize(){
        return this.list.getSize();
    }

    isEmpty(){
        return this.list.isEmpty();
    }

    print(){
        return this.list.print(); 
    }
}