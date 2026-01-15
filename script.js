// linked list implementation in javascript

class Node {
    constructor(data){
        this.data = data;
        this.next = null;
    }

    toString(){
        return this.data.toString();
    }

    toArray(){
        const result = [];
        let current = this;
        while(current){
            result.push(current.data);
            current = current.next;
        }
        return result;
    }

    toJSON(){
        return {
            data: this.data,
            next: this.next ? this.next.toJSON() : null
        };
    }

    static fromJSON(json){
        const node = new Node(json.data);
        node.next = json.next ? Node.fromJSON(json.next) : null;
        return node;
    }

    static fromArray(array){
        let head = null;
        let current = null;
        for(const item of array){
            const newNode = new Node(item);
            if(!head){
                head = newNode;
            }
        }
        return head;
    }

    static fromString(string){
        return Node.fromArray(string.split(''));
    }

    static fromNumber(number){
        return Node.fromArray(number.toString().split(''));
    }

    static fromBoolean(boolean){
        return Node.fromArray(boolean.toString().split(''));
    }

    
}

class LinkedList {
    constructor(){
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    append(data){
        const newNode = new Node(data);
    }

    prepend(data){
        const newNode = new Node(data);
        if(!this.head){
            this.head = newNode;
            this.tail = newNode;
        }
    }

    insert(index, data){
        if(index < 0 || index > this.length) return false;
        const newNode = new Node(data);
        if(index === 0){
            newNode.next = this.head;
            this.head = newNode;
        }
    }

    remove(index){
        if(index < 0 || index >= this.length) return false;
        if(index === 0){
            this.head = this.head.next;
        }
        if(index === this.length - 1){
            this.tail = this.head;
        }
        const previousNode = this.getNode(index - 1);
        const nodeToRemove = previousNode.next;
        previousNode.next = nodeToRemove.next;
        return true;
    }
    
    getNode(index){
        if(index < 0 || index >= this.length) return null;
        let current = this.head;
        for(let i = 0; i < index; i++){
            current = current.next;
        }
        return current;
    }

    size(){
        return this.length;
    }

    isEmpty(){
        return this.length === 0;
    }
    
    clear(){
        this.head = null;
        this.tail = null;
        this.length = 0;
    }
    
    toString(){
        return this.head.toString();
    }

    toArray(){
        return this.head.toArray();
    }
    
    
}

const list = new LinkedList();
list.append(1);
list.append(2);
list.append(3);
console.log(list.toString());
console.log(list.toArray());
console.log(list.size());
console.log(list.isEmpty());
console.log(list.clear());
console.log(list.toString());
console.log(list.toArray());
console.log(list.size());
console.log(list.isEmpty());


// doubly linked list implementation in javascript

class DoublyNode {
    constructor(data){
        this.data = data;
        this.next = null;
        this.prev = null;
    }
}


class DoublyLinkedList {
    constructor(){
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    append(data){
        const newNode = new DoublyNode(data);
    }

    prepend(data){
        const newNode = new DoublyNode(data);
    }

    insert(index, data){
        if(index < 0 || index > this.length) return false;
        const newNode = new DoublyNode(data);
    }
    
    remove(index){
        if(index < 0 || index >= this.length) return false;
        if(index === 0){
            this.head = this.head.next;
        }
    }
    getNode(index){
        if(index < 0 || index >= this.length) return null;
        let current = this.head;
        for(let i = 0; i < index; i++){
            current = current.next;
        }
        return current;
    }
    size(){
        return this.length;
    }
    isEmpty(){
        return this.length === 0;
    }
    clear(){
        this.head = null;
        this.tail = null;
        this.length = 0;
    }
    toString(){
        return this.head.toString();
    }
    toArray(){
        return this.head.toArray();
    }
}

const doublyList = new DoublyLinkedList();
doublyList.append(1);
doublyList.append(2);
doublyList.append(3);
console.log(doublyList.toString());
console.log(doublyList.toArray());
console.log(doublyList.size());
console.log(doublyList.isEmpty());
console.log(doublyList.clear());
console.log(doublyList.toString());
console.log(doublyList.toArray());
console.log(doublyList.size());
console.log(doublyList.isEmpty());