"use strict";
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
var point2d_1 = require("./point2d");
var rect_1 = require("./rect");
var math_1 = require("../math");
var KdTreePoint = /** @class */ (function () {
    function KdTreePoint(x, y) {
        this.x = x;
        this.y = y;
    }
    return KdTreePoint;
}());
exports.KdTreePoint = KdTreePoint;
var KdTreeLine = /** @class */ (function () {
    function KdTreeLine(xFrom, yFrom, xTo, yTo, vertical) {
        this.xFrom = xFrom;
        this.yFrom = yFrom;
        this.xTo = xTo;
        this.yTo = yTo;
        this.vertical = vertical;
    }
    return KdTreeLine;
}());
exports.KdTreeLine = KdTreeLine;
var Node = /** @class */ (function () {
    function Node(key, value, rect) {
        this.key = key;
        this.value = value;
        this.rect = rect;
    }
    return Node;
}());
var KdTree = /** @class */ (function () {
    function KdTree() {
        this._size = 0;
    }
    Object.defineProperty(KdTree.prototype, "size", {
        get: function () { return this._size; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(KdTree.prototype, "isEmpty", {
        get: function () {
            return this.size == 0;
        },
        enumerable: true,
        configurable: true
    });
    KdTree.prototype.insert = function (key) {
        // the point is already in the tree
        if (this.get(key) !== null) {
            return;
        }
        this.root = this.doInsert(this.root, null, 0, 0, 1, 1, 0, key);
    };
    KdTree.prototype.doInsert = function (node, parent, minX, minY, maxX, maxY, level, value) {
        if (node == null) {
            this._size++;
            var vertical_1 = (level % 2 == 0);
            var keyToUse_1 = vertical_1 ? value.x : value.y;
            var rect = new rect_1.default(minX, minY, maxX, maxY);
            return new Node(keyToUse_1, value, rect);
        }
        var vertical = (level % 2 == 0);
        var keyToUse = vertical ? value.x : value.y;
        var cmp = math_1.compareDouble(keyToUse, node.key);
        if (cmp < 0) {
            var updatedMaxX = maxX;
            var updatedMaxY = maxY;
            if (vertical) {
                updatedMaxX = node.value.x;
            }
            else {
                updatedMaxY = node.value.y;
            }
            // update maxX or maxY
            node.leftBelow = this.doInsert(node.leftBelow, node, minX, minY, updatedMaxX, updatedMaxY, level + 1, value);
        }
        else {
            var updatedMinX = minX;
            var updatedMinY = minY;
            if (vertical) {
                updatedMinX = node.value.x;
            }
            else {
                updatedMinY = node.value.y;
            }
            // update minX or minY
            node.rightAbove = this.doInsert(node.rightAbove, node, updatedMinX, updatedMinY, maxX, maxY, level + 1, value);
        }
        return node;
    };
    KdTree.prototype.get = function (key) {
        var node = this.root;
        var level = 0;
        while (node != null) {
            if (node.value.equals(key)) {
                return node.value;
            }
            var keyToCompare = (level % 2 == 0) ? key.x : key.y;
            var cmp = math_1.compareDouble(keyToCompare, node.key);
            if (cmp < 0) {
                node = node.leftBelow;
            }
            else {
                node = node.rightAbove;
            }
            level++;
        }
        return null;
    };
    KdTree.prototype.contains = function (p) {
        return this.get(p) != null;
    };
    KdTree.prototype.range = function (rect) {
        var list = [];
        return this.doRange(this.root, rect, list);
    };
    KdTree.prototype.doRange = function (node, rect, list) {
        if (node == null) {
            return list;
        }
        if (!node.rect.intersects(rect)) {
            return list;
        }
        if (rect.contains(node.value)) {
            list.push(node.value);
        }
        this.doRange(node.leftBelow, rect, list);
        this.doRange(node.rightAbove, rect, list);
        return list;
    };
    KdTree.prototype.nearest = function (p) {
        if (this.isEmpty) {
            return null;
        }
        return this.doNearest(this.root, new point2d_1.Point2D(Number.MAX_VALUE, Number.MAX_VALUE), 0, p);
    };
    KdTree.prototype.doNearest = function (node, nearest, level, p) {
        if (node == null) {
            return nearest;
        }
        var distanceToNearestDiscovered = nearest.distanceSquaredTo(p);
        var distanceToCurrentNodeRectangle = node.rect.distanceSquaredTo(p);
        if (distanceToNearestDiscovered > distanceToCurrentNodeRectangle) {
            var pointToCheck = new point2d_1.Point2D(node.value.x, node.value.y);
            if (distanceToNearestDiscovered > pointToCheck.distanceSquaredTo(p)) {
                nearest = pointToCheck;
            }
            var vertical = (level % 2 == 0);
            if (vertical) {
                if ((p.x - node.value.x) < 0) {
                    nearest = this.doNearest(node.leftBelow, nearest, level + 1, p);
                    nearest = this.doNearest(node.rightAbove, nearest, level + 1, p);
                }
                else {
                    nearest = this.doNearest(node.rightAbove, nearest, level + 1, p);
                    nearest = this.doNearest(node.leftBelow, nearest, level + 1, p);
                }
            }
            else {
                if ((p.y - node.value.y) < 0) {
                    nearest = this.doNearest(node.leftBelow, nearest, level + 1, p);
                    nearest = this.doNearest(node.rightAbove, nearest, level + 1, p);
                }
                else {
                    nearest = this.doNearest(node.rightAbove, nearest, level + 1, p);
                    nearest = this.doNearest(node.leftBelow, nearest, level + 1, p);
                }
            }
        }
        return nearest;
    };
    KdTree.prototype.draw = function () {
        return this.doDraw(this.root, null, true);
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    KdTree.prototype.doDraw = function (node, parent, vertical) {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (node == null) {
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, new KdTreePoint(node.value.x, node.value.y)];
                case 1:
                    _a.sent();
                    if (!vertical) return [3 /*break*/, 9];
                    if (!(parent != null)) return [3 /*break*/, 6];
                    if (!(node.value.y < parent.value.y)) return [3 /*break*/, 3];
                    return [4 /*yield*/, new KdTreeLine(node.value.x, parent.value.y, node.value.x, parent.rect.yMin, true)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 3: return [4 /*yield*/, new KdTreeLine(node.value.x, parent.value.y, node.value.x, parent.rect.yMax, true)];
                case 4:
                    _a.sent();
                    _a.label = 5;
                case 5: return [3 /*break*/, 8];
                case 6: return [4 /*yield*/, new KdTreeLine(node.value.x, 0, node.value.x, 1, true)];
                case 7:
                    _a.sent();
                    _a.label = 8;
                case 8: return [3 /*break*/, 16];
                case 9:
                    if (!(parent != null)) return [3 /*break*/, 14];
                    if (!(node.value.x < parent.value.x)) return [3 /*break*/, 11];
                    return [4 /*yield*/, new KdTreeLine(parent.value.x, node.value.y, parent.rect.xMin, node.value.y, false)];
                case 10:
                    _a.sent();
                    return [3 /*break*/, 13];
                case 11: return [4 /*yield*/, new KdTreeLine(parent.value.x, node.value.y, parent.rect.xMax, node.value.y, false)];
                case 12:
                    _a.sent();
                    _a.label = 13;
                case 13: return [3 /*break*/, 16];
                case 14: return [4 /*yield*/, new KdTreeLine(0, node.value.y, 1, node.value.y, false)];
                case 15:
                    _a.sent();
                    _a.label = 16;
                case 16: return [5 /*yield**/, __values(this.doDraw(node.leftBelow, node, !vertical))];
                case 17:
                    _a.sent();
                    return [5 /*yield**/, __values(this.doDraw(node.rightAbove, node, !vertical))];
                case 18:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    };
    return KdTree;
}());
exports.KdTree = KdTree;
;
