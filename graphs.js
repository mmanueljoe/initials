// adjacency matrix

const matrix = [
  [0, 1, 0],
  [1, 0, 1],
  [0, 1, 0],
];


// adjacency list
const adjancencyList = {
    'A' : ['B'],
    'B' : ['A', 'C'],
    'C' : ['B']
}


// implementation of graph using adjacency list
class Graph{
    constructor(){
        this.adjancencyList = {};
    }


    addVertex(vertex){
        if(!this.adjancencyList[vertex]){
            this.adjancencyList[vertex] = new Set();
        }
    }

    addEdge(vertex1, vertex2) {
        if(!this.adjancencyList[vertex1]){
            this.addVertex(vertex1);
        }

        if(!this.adjancencyList[vertex2]){
            this.addVertex(vertex2);
        }

        this.adjancencyList[vertex1].add(vertex2);
        this.adjancencyList[vertex2].add(vertex1);
    }

    hasEdge(vertex1, vertex2){
        return (
            this.adjancencyList[vertex1].has(vertex2) && 
            this.adjancencyList[vertex2].has(vertex1)
        );
    }

    removeEdge(vertex1, vertex2){
        this.adjancencyList[vertex1].delete(vertex2);
        this.adjancencyList[vertex2].delete(vertex1);
    }

    removeVertex(vertex){
        if(!this.adjancencyList[vertex]){
            return null;
        }

        for(let adjancentVertex of this.adjancencyList[vertex]){
            this.removeEdge(vertex, adjancentVertex);
        }

        delete this.adjancencyList[vertex];
    }

    display(){
        for(let vertex in adjancencyList){
            console.log(vertex + "->" + [...this.adjancencyList[vertex]]);
        }
    }
}