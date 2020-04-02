"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var math_1 = require("../math");
var Point2D = /** @class */ (function () {
    function Point2D(x, y) {
        this._x = x;
        this._y = y;
    }
    Object.defineProperty(Point2D.prototype, "x", {
        get: function () { return this._x; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Point2D.prototype, "y", {
        get: function () { return this._y; },
        enumerable: true,
        configurable: true
    });
    Point2D.prototype.distanceTo = function (that) {
        var dx = this.x - that.x;
        var dy = this.y - that.y;
        return Math.sqrt(dx * dx + dy * dy);
    };
    Point2D.prototype.distanceSquaredTo = function (that) {
        var dx = this.x - that.x;
        var dy = this.y - that.y;
        return dx * dx + dy * dy;
    };
    Point2D.prototype.equals = function (other) {
        if (other == this)
            return true;
        if (other == null)
            return false;
        var that = other;
        return math_1.numberEquals(this.x, that.x) && math_1.numberEquals(this.y, that.y);
    };
    return Point2D;
}());
exports.Point2D = Point2D;
