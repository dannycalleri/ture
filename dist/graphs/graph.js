"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GraphImpl = /** @class */ (function () {
    function GraphImpl(vertices) {
        this._vertices = vertices.length;
        this._edges = 0;
        this._adj = vertices.reduce(function (acc, vertex) { return (acc.set(vertex, [])); }, new Map());
    }
    Object.defineProperty(GraphImpl.prototype, "vertices", {
        get: function () { return this._vertices; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GraphImpl.prototype, "edges", {
        get: function () { return this._edges; },
        enumerable: true,
        configurable: true
    });
    GraphImpl.prototype.validateVertex = function (vertex) {
        if (!this._adj.get(vertex)) {
            throw new Error("vertex " + vertex + " doesn't exist");
        }
    };
    GraphImpl.prototype.addEdge = function (v, w) {
        this.validateVertex(v);
        this.validateVertex(w);
        this._edges++;
        var vAdjList = this._adj.get(v);
        vAdjList.unshift(w);
        var wAdjList = this._adj.get(w);
        wAdjList.unshift(v);
    };
    GraphImpl.prototype.adj = function (vertex) {
        this.validateVertex(vertex);
        return this._adj.get(vertex);
    };
    GraphImpl.prototype.degree = function (vertex) {
        this.validateVertex(vertex);
        return this._adj.get(vertex).length;
    };
    return GraphImpl;
}());
function createGraph(vertices) {
    return new GraphImpl(vertices);
}
exports.createGraph = createGraph;
