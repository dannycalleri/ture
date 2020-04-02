"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var kdtree_1 = require("./kdtree");
var point2d_1 = require("./point2d");
var rect_1 = require("./rect");
test('KdTree with one element', function () {
    var tree = new kdtree_1.KdTree();
    tree.insert(new point2d_1.Point2D(0.1, 0.2));
    expect(tree.size).toBe(1);
});
test('KdTree with three elements', function () {
    var tree = new kdtree_1.KdTree();
    tree.insert(new point2d_1.Point2D(0.7, 0.2));
    tree.insert(new point2d_1.Point2D(0.5, 0.4));
    tree.insert(new point2d_1.Point2D(0.2, 0.3));
    tree.insert(new point2d_1.Point2D(0.4, 0.7));
    tree.insert(new point2d_1.Point2D(0.9, 0.6));
    expect(tree.size).toBe(5);
});
test('KdTree contains() should return true for a point just inserted', function () {
    var tree = new kdtree_1.KdTree();
    tree.insert(new point2d_1.Point2D(0.7, 0.2));
    tree.insert(new point2d_1.Point2D(0.5, 0.4));
    tree.insert(new point2d_1.Point2D(0.2, 0.3));
    tree.insert(new point2d_1.Point2D(0.4, 0.7));
    tree.insert(new point2d_1.Point2D(0.9, 0.6));
    expect(tree.contains(new point2d_1.Point2D(0.4, 0.7))).toBeTruthy();
});
test('KdTree contains() should return false for a point that has NOT been inserted', function () {
    var tree = new kdtree_1.KdTree();
    tree.insert(new point2d_1.Point2D(0.7, 0.2));
    tree.insert(new point2d_1.Point2D(0.5, 0.4));
    tree.insert(new point2d_1.Point2D(0.2, 0.3));
    tree.insert(new point2d_1.Point2D(0.4, 0.7));
    tree.insert(new point2d_1.Point2D(0.9, 0.6));
    expect(tree.contains(new point2d_1.Point2D(0.3, 0.7))).toBeFalsy();
});
test('KdTree range() should return the points contained in the specified rectangle', function () {
    var tree = new kdtree_1.KdTree();
    tree.insert(new point2d_1.Point2D(0.1, 0.4));
    tree.insert(new point2d_1.Point2D(0.6, 0.5));
    var points = tree.range(new rect_1.default(0.4, 0.3, 0.8, 0.6));
    expect(points.length).toBe(1);
    expect(points[0]).toEqual(new point2d_1.Point2D(0.6, 0.5));
});
test('KdTree range() should not return any point when the rectangle does not match', function () {
    var tree = new kdtree_1.KdTree();
    tree.insert(new point2d_1.Point2D(0.1, 0.4));
    tree.insert(new point2d_1.Point2D(0.6, 0.5));
    var points = tree.range(new rect_1.default(0.7, 0.7, 1, 1));
    expect(points.length).toBe(0);
});
test('KdTree with nodes forming a circle should return the sixth point as nearest to (0.81, 0.30)', function () {
    var tree = new kdtree_1.KdTree();
    tree.insert(new point2d_1.Point2D(0.206107, 0.095492)); // A
    tree.insert(new point2d_1.Point2D(0.975528, 0.654508)); // B
    tree.insert(new point2d_1.Point2D(0.024472, 0.345492)); // C
    tree.insert(new point2d_1.Point2D(0.793893, 0.095492)); // D
    tree.insert(new point2d_1.Point2D(0.793893, 0.904508)); // E
    tree.insert(new point2d_1.Point2D(0.975528, 0.345492)); // F
    tree.insert(new point2d_1.Point2D(0.206107, 0.904508)); // G
    tree.insert(new point2d_1.Point2D(0.500000, 0.000000)); // H
    tree.insert(new point2d_1.Point2D(0.024472, 0.654508)); // I
    tree.insert(new point2d_1.Point2D(0.500000, 1.000000)); // L
    var nearestPoint = tree.nearest(new point2d_1.Point2D(0.81, 0.30));
    expect(nearestPoint).toEqual(new point2d_1.Point2D(0.975528, 0.345492));
});
test('Testing draw iterator', function () {
    var tree = new kdtree_1.KdTree();
    tree.insert(new point2d_1.Point2D(0.206107, 0.095492)); // A
    tree.insert(new point2d_1.Point2D(0.975528, 0.654508)); // B
    tree.insert(new point2d_1.Point2D(0.024472, 0.345492)); // C
    tree.insert(new point2d_1.Point2D(0.793893, 0.095492)); // D
    tree.insert(new point2d_1.Point2D(0.793893, 0.904508)); // E
    tree.insert(new point2d_1.Point2D(0.975528, 0.345492)); // F
    tree.insert(new point2d_1.Point2D(0.206107, 0.904508)); // G
    tree.insert(new point2d_1.Point2D(0.500000, 0.000000)); // H
    tree.insert(new point2d_1.Point2D(0.024472, 0.654508)); // I
    tree.insert(new point2d_1.Point2D(0.500000, 1.000000)); // L
    var lines = [];
    var points = [];
    var iterator = tree.draw();
    var current = iterator.next();
    while (!current.done) {
        if (current.value instanceof kdtree_1.KdTreeLine) {
            lines.push(current.value);
        }
        else if (current.value instanceof kdtree_1.KdTreePoint) {
            points.push(current.value);
        }
        current = iterator.next();
    }
    expect(points.length).toBe(10);
    expect(lines.length).toBeGreaterThan(1);
});
