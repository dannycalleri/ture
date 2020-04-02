"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Rect = /** @class */ (function () {
    function Rect(xMin, yMin, xMax, yMax) {
        this._xMin = xMin;
        this._yMin = yMin;
        this._xMax = xMax;
        this._yMax = yMax;
        if (isNaN(xMin) || isNaN(xMax)) {
            throw new Error("x-coordinate is NaN: " + this.toString());
        }
        if (isNaN(yMin) || isNaN(yMax)) {
            throw new Error("y-coordinate is NaN: " + this.toString());
        }
        if (xMax < xMin) {
            throw new Error("xmax < xmin: " + this.toString());
        }
        if (yMax < yMin) {
            throw new Error("ymax < ymin: " + this.toString());
        }
    }
    Object.defineProperty(Rect.prototype, "xMin", {
        get: function () { return this._xMin; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(Rect.prototype, "yMin", {
        get: function () { return this._yMin; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(Rect.prototype, "xMax", {
        get: function () { return this._xMax; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(Rect.prototype, "yMax", {
        get: function () { return this._yMax; },
        enumerable: true,
        configurable: true
    });
    ;
    Rect.prototype.width = function () {
        return this.xMax - this.xMin;
    };
    Rect.prototype.height = function () {
        return this.yMax - this.yMin;
    };
    Rect.prototype.intersects = function (that) {
        return this.xMax >= that.xMin && this.yMax >= that.yMin &&
            that.xMax >= this.xMin && that.yMax >= this.yMin;
    };
    Rect.prototype.contains = function (p) {
        return (p.x >= this.xMin) && (p.x <= this.xMax) &&
            (p.y >= this.yMin) && (p.y <= this.yMax);
    };
    Rect.prototype.distanceTo = function (p) {
        return Math.sqrt(this.distanceSquaredTo(p));
    };
    Rect.prototype.distanceSquaredTo = function (p) {
        var dx = 0.0;
        var dy = 0.0;
        if (p.x < this.xMin)
            dx = p.x - this.xMin;
        else if (p.x > this.xMax)
            dx = p.x - this.xMax;
        if (p.y < this.yMin)
            dy = p.y - this.yMin;
        else if (p.y > this.yMax)
            dy = p.y - this.yMax;
        return dx * dx + dy * dy;
    };
    Rect.prototype.toString = function () {
        return "[" + this.xMin + ", " + this.xMax + "] x [" + this.yMin + ", " + this.yMax + "]";
    };
    return Rect;
}());
exports.default = Rect;
