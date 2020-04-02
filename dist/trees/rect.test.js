"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rect_1 = require("./rect");
var point2d_1 = require("./point2d");
test('Rect must fail if xMin > xMax', function () {
    expect(function () {
        new rect_1.default(1, 0, 0, 1);
    }).toThrow();
});
test('Rect must fail if yMin > yMax', function () {
    expect(function () {
        new rect_1.default(0, 1, 1, 0);
    }).toThrow();
});
test('Rect must fail if both xMin > xMax && yMin > yMax', function () {
    expect(function () {
        new rect_1.default(1, 1, 0, 0);
    }).toThrow();
});
test('Rect must fail if any of the input is not a number', function () {
    expect(function () {
        new rect_1.default(NaN, 0, 1, 1);
    }).toThrow();
});
test('Rect width must be correct', function () {
    var rect = new rect_1.default(0, 0, 3, 2);
    expect(rect.width()).toBe(3);
});
test('Rect height must be correct', function () {
    var rect = new rect_1.default(0, 0, 3, 2);
    expect(rect.height()).toBe(2);
});
test('2 overlapping Rect must intersect', function () {
    var rect1 = new rect_1.default(0, 0, 3, 2);
    var rect2 = new rect_1.default(1, 1, 3, 2);
    expect(rect1.intersects(rect2)).toBeTruthy();
});
test('2 NOT overlapping Rect must NOT intersect', function () {
    var rect1 = new rect_1.default(0, 0, 3, 2);
    var rect2 = new rect_1.default(5, 5, 10, 10);
    expect(rect1.intersects(rect2)).toBeFalsy();
});
test('Rect must contain point in its center', function () {
    var rect = new rect_1.default(0, 0, 3, 2);
    var point = new point2d_1.Point2D(1, 1);
    expect(rect.contains(point)).toBeTruthy();
});
test('Rect must NOT contain point far away', function () {
    var rect = new rect_1.default(0, 0, 3, 2);
    var point = new point2d_1.Point2D(10, 10);
    expect(rect.contains(point)).toBeFalsy();
});
