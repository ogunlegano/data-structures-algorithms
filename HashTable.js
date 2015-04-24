#!/usr/bin/env node

function HashTable() {
    var table = [];

    // TODO -- add/use better hashing function
    var loseLoseHash = function(key) {
        var hash = 0;
        for (var i = 0; i < key.length; i++) {
            hash += key.charCodeAt(i);
        }
        return hash % 37;
    };

    var djb2Hash = function(key) {
        var hash = 5381;
        for (var i = 0; i < key.length; i++) {
            hash = hash * 33 + key.charCodeAt(i);
        }
        return hash % 1013;
    };

    var hashFn = function(key) {
        return djb2Hash(key);
    };

    this.put = function(key, value) {
        var position = hashFn(key);
        console.log('%s - %s', position, key);
        table[position] = value;
    };

    this.remove = function(key) {
        table[hashFn(key)] = undefined;
    };

    this.get = function(key) {
        return table[hashFn(key)];
    };
}

module.exports = HashTable;