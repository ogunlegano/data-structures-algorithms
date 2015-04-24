#!/usr/bin/env node
var Dictionary = require('./Dictionary');
var Queue = require('./Queue');

function Graph() {
    var vertices = [];
    var adjList = new Dictionary();

    var Colors = {
        WHITE: 'undiscovered',
        GREY: 'discovered',
        BLACK: 'visited'
    };

    var initializeColor = function() {
        var color = [];
        for (var i = 0; i < vertices.length; i++) {
            color[vertices[i]] = Colors.WHITE;
        }
        return color;
    };

    this.addVertex = function(v) {
        vertices.push(v);
        adjList.set(v, []);
    };

    this.addEdge = function(v, w) {
        adjList.get(v).push(w);
        adjList.get(w).push(v);
    };

    this.toString = function() {
        var s = '';
        for (var i = 0; i < vertices.length; i++) {
            s += vertices[i] + ' -> ';
            var neighbors = adjList.get(vertices[i]);
            for (var j = 0; j < neighbors.length; j++) {
                s += neighbors[j] + ' ';
            }
            s += '\n';
        }
        return s;
    };

    this.bfs = function(v, callback) {
        var color = initializeColor(),
            queue = new Queue();

        queue.enqueue(v);
        while (!queue.isEmpty()) {
            var u = queue.dequeue(),
                neighbors = adjList.get(u);

            color[u] = Colors.GREY;
            for (var i = 0; i < neighbors.length; i++) {
                var w = neighbors[i];
                if (color[w] == Colors.WHITE) {
                    color[w] = Colors.GREY;
                    queue.enqueue(w);
                }
            }
            color[u] = Colors.BLACK;
            if (callback) {
                callback(u);
            }
        }
    };

    this.BFS = function(v) {
        var color = initializeColor(),
            queue = new Queue(),
            d = [],
            pred = [];

        queue.enqueue(v);
        for (var i = 0; i < vertices.length; i++) {
            d[vertices[i]] = 0;
            pred[vertices[i]] = null;
        }
        while (!queue.isEmpty()) {
            var u = queue.dequeue(),
                neighbors = adjList.get(u);
            color[u] = Colors.GREY;
            for (var i = 0; i < neighbors.length; i++) {
                var w = neighbors[i];
                if (color[w] == Colors.WHITE) {
                    color[w] = Colors.GREY;
                    queue.enqueue(w);
                    d[w] = d[u] + 1;
                    pred[w] = u;
                }
            }
            color[u] = Colors.BLACK;
        }
        return {
            distances: d,
            predecessors: pred
        };
    };

    this.dfs = function(callback) {
        var dfsVisit = function(u, color, callback) {
            color[u] = Colors.GREY;
            if (callback) {
                callback(u);
            }
            var neighbors = adjList.get(u);
            for (var i = 0; i < neighbors.length; i++) {
                var w = neighbors[i];
                if (color[w] === Colors.WHITE) {
                    dfsVisit(w, color, callback);
                }
            }
            color[u] = Color.BLACK;
        };

        var color = initializeColor();
        for (var i = 0; i < vertices.length; i++) {
            if (color[vertices[i]] === Colors.WHITE) {
                dfsVisit(vertices[i], color, callback);
            }
        }
    };

    this.DFS = function(callback) {

    };
}

module.exports = Graph;