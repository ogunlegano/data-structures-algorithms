#!/usr/bin/env node

function BinarySearchTree() {

    var Node = function(key) {
        this.key = key;
        this.left = null;
        this.right = null;
    };

    var insertNode = function(node, newNode) {
        if (newNode.key < node.key) {
            if (node.left === null) {
                node.left = newNode;
            } else {
                insertNode(node.left, newNode);
            }
        } else {
            if (node.right === null) {
                node.right = newNode;
            } else {
                insertNode(node.right, newNode);
            }
        }
    };

    var root = null;

    this.insert = function(key) {
        var newNode = new Node(key);
        if (root === null) {
            root = newNode;
        } else {
            insertNode(root, newNode);
        }
    };

    this.search = function(key) {
        var searchNode = function(node, key) {
            if (node === null) {
                return false;
            }

            if(key < node.key) {
                return searchNode(node.left, key);
            } else if (key > node.key) {
                return searchNode(node.right, key);
            } else {
                return true;
            }
        };

        return searchNode(root, key);
    };

    this.inOrderTraverse = function(callback) {
        var inOrderTraverseNode = function(node, callback) {
            if (node !== null) {
                inOrderTraverseNode(node.left, callback);
                callback(node.key);
                inOrderTraverseNode(node.right, callback);
            }
        };

        inOrderTraverseNode(root,callback);
    };

    this.preOrderTraverse = function(callback) {
        var preOrderTraverseNode = function(node, callback) {
            if (node !== null) {
                callback(node.key);
                preOrderTraverseNode(node.left, callback);
                preOrderTraverseNode(node.right, callback);
            }
        };

        preOrderTraverseNode(root, callback);
    };

    this.postOrderTraverse = function(callback) {
        var postOrderTraverseNode = function(node, callback) {
            if(node !== null) {
                postOrderTraverseNode(node.left, callback);
                postOrderTraverseNode(node.right, callback);
                callback(node.key);
            }
        };

        postOrderTraverseNode(root, callback);
    };

    this.min = function() {
        var minNode = function(node) {
            if (node) {
                while(node && node.left !== null) {
                    node = node.left;
                }
                return node.key;
            }
            return null;
        };

        return minNode(root);
    };

    this.max = function() {
        var maxNode = function(node) {
            if (node) {
                while (node && node.right !== null) {
                    node = node.right;
                }
                return node.key;
            }
            return null;
        };

        return maxNode(root);
    };

    this.remove = function(key) {
        var findMinNode = function(node) {
            if (node) {
                while(node && node.left !== null) {
                    node = node.left;
                }
                return node;
            }
            return null;
        };

        var removeNode = function(node,key) {
            if (node === null) {
                return null;
            }

            if (key < node.key) {
                node.left = removeNode(node.left, key);
                return node;
            } else if (key > node.key) {
                node.right = removeNode(node.right, key);
                return node;
            } else {
                // Case 1 - Leaf node
                if(node.left === null && node.right === null) {
                    node === null;
                    return node;
                }

                // Case 2 - Node with only one child
                if (node.left === null) {
                    node = node.right;
                    return node;
                } else if (node.right === null) {
                    node = node.left;
                    return node;
                }

                //Case 3 - Node with 2 children
                var aux = findMinNode(node.right);
                node.key = aux.key;
                node.right = removeNode(node.right, aux.key);
                return node;
            }
        };

        root = removeNode(root, key);
    };

}

module.exports = BinarySearchTree;