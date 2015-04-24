#!/usr/bin/env node

var Stack = require('./Stack');
var Queue = require('./Queue');
var PriorityQueue = require('./PriorityQueue');
var LinkedList = require('./LinkedList');
var DoublyLinkedList = require('./DoublyLinkedList');
var Set = require('./Set');
var Dictionary = require('./Dictionary');
var HashTable = require('./HashTable');
var BinarySearchTree = require('./BinarySearchTree');
var Graph = require('./Graph');
var ArrayList = require('./ArrayList');

/*---------------------------------------------------------------------------------
* Stack
* */
console.log('\n-- Stack --');

// Binary Converter
function divideBy2(decNumber) {
    var remStack = new Stack(),
        rem,
        binaryString = '';

    while(decNumber > 0) {
        rem = Math.floor(decNumber % 2);
        remStack.push(rem);
        decNumber = Math.floor(decNumber / 2);
    }

    while(!remStack.isEmpty()) {
        binaryString += remStack.pop().toString();
    }

    return binaryString;
}

// Base Coverter
function baseConverter(decNumber, base) {
    var remStack = new Stack(),
        rem,
        baseString = '',
        digits = '0123456789ABCDEF';

    while(decNumber > 0) {
        rem = Math.floor(decNumber % base);
        remStack.push(rem);
        decNumber = Math.floor(decNumber / base);
    }

    while(!remStack.isEmpty()) {
        baseString += digits[remStack.pop()];
    }

    return baseString;
}

console.log('divideBy2');
console.log(divideBy2(233));
console.log(divideBy2(10));
console.log(divideBy2(1000));
console.log('baseConverter');
console.log(baseConverter(100345,2));
console.log(baseConverter(100345,8));
console.log(baseConverter(100345,16));

/*---------------------------------------------------------------------------------
* Queue
* */
console.log('\n-- Queue --');

// Hot Potato Game
function hotPotato (nameList, num) {
    var queue = new Queue();
    for (var i = 0; i < nameList.length; i++) {
        queue.enqueue(nameList[i]);
    }

    var eliminated = '';

    while (queue.size() > 1) {
        for (var i = 0; i < num; i++) {
            queue.enqueue(queue.dequeue());
        }
        eliminated = queue.dequeue();
        console.log('%s was eliminated from the Hot Potato game.', eliminated);
    }

    return queue.dequeue();
}

var names = ['John', 'Jack', 'Camila', 'Ingrid', 'Carl'];
var rand = Math.ceil(Math.random() * 10);

console.log('Hot Potato\n');
console.log('SEED:', rand);

var winner = hotPotato(names, rand);

console.log('The winner is: %s', winner);

/*---------------------------------------------------------------------------------
* LinkedList
* */
console.log('\n-- Linked List --');

var list = new LinkedList();

list.append(15);
list.append(10);
list.insert(1,12);
list.print();
console.log(list.indexOf(10));
list.print();

/*---------------------------------------------------------------------------------
 * Set
 * */
console.log('\n-- Set --');

var setA = new Set();
setA.add(1);
setA.add(2);

var setB = new Set();
setB.add(1);
setB.add(2);
setB.add(3);

var setC = new Set();
setC.add(2);
setC.add(3);
setC.add(4);

console.log(setA.subset(setB));
console.log(setA.subset(setC));

/*---------------------------------------------------------------------------------
 * Dictionary
 * */
console.log('\n-- Dictionary --');

var dictionary = new Dictionary();
dictionary.set('Gandalf', 'gandalf@email.com');
dictionary.set('John', 'johnsnow@email.com');
dictionary.set('Tyrion', 'tyrion@email.com');

console.log(dictionary.has('Gandalf'));
console.log(dictionary.size());
console.log(dictionary.keys());
console.log(dictionary.values());
console.log(dictionary.get('Tyrion'));

dictionary.remove('John');

console.log(dictionary.keys());
console.log(dictionary.values());
console.log(dictionary.getItems());

/*---------------------------------------------------------------------------------
 * Hash Table
 * */
console.log('\n-- Hash Table --');

var hashTable = new HashTable();
hashTable.put('Gandalf', 'gandalf@email.com');
hashTable.put('John', 'johnsnow@email.com');
hashTable.put('Tyrion', 'tyrion@email.com');

/*---------------------------------------------------------------------------------
 * Binary Search Tree
 * */
console.log('\n-- Binary Search Tree --');

var tree = new BinarySearchTree();
tree.insert(11);
tree.insert(7);
tree.insert(15);
tree.insert(5);
tree.insert(3);
tree.insert(9);
tree.insert(8);
tree.insert(10);
tree.insert(13);
tree.insert(12);
tree.insert(14);
tree.insert(20);
tree.insert(18);
tree.insert(25);

tree.insert(6);

var printNode = function(value) {
    console.log(value);
};

var key1 = 11;

console.log('Key %s %s found', key1, tree.search(key1) ? '' : 'not');

tree.inOrderTraverse(printNode);
console.log('\n');
tree.remove(key1);
console.log('\n');
tree.inOrderTraverse(printNode);

/*---------------------------------------------------------------------------------
 * Graph
 * */
console.log('\n-- Graph --');

var graph = new Graph();
var myVertices = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];

for (var i = 0; i < myVertices.length; i ++) {
    graph.addVertex(myVertices[i]);
}

graph.addEdge('A', 'B');
graph.addEdge('A', 'C');
graph.addEdge('A', 'D');
graph.addEdge('C', 'D');
graph.addEdge('C', 'G');
graph.addEdge('D', 'G');
graph.addEdge('D', 'H');
graph.addEdge('B', 'E');
graph.addEdge('B', 'F');
graph.addEdge('E', 'I');

var printVertex = function(value) {
    console.log('Visited vertex: ' + value);
};

graph.bfs(myVertices[0], printVertex);

var shortestPathA = graph.BFS(myVertices[0]);
console.log(shortestPathA);

var fromVertex = myVertices[0];
for (var i = 0; i < myVertices.length; i++) {
    var toVertex = myVertices[i],
        path = new Stack();
    for (var v = toVertex; v !== fromVertex; v = shortestPathA.predecessors[v]) {
        path.push(v);
    }
    path.push(fromVertex);

    var s = path.pop();
    while (!path.isEmpty()) {
        s += ' - ' + path.pop();
    }
    console.log(s);
}

/*---------------------------------------------------------------------------------
 * Sorting (using ArrayList)
 * */
console.log('\n-- Sorting (using ArrayList) --');

function createNonSortedArray(size) {
    var array = new ArrayList();
    for (var i = size; i > 0; i--) {
        array.insert(i);
    }
    return array;
}

var array = createNonSortedArray(5);
console.log('Bubble Sort');
console.log(array.toString());
array.bubbleSort();
console.log(array.toString());


