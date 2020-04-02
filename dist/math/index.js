"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function numberEquals(n1, n2) {
    var epsilon = 0.0000001;
    var difference = Math.abs(n1 - n2);
    return difference < epsilon;
}
exports.numberEquals = numberEquals;
;
function compareDouble(n1, n2) {
    if (numberEquals(n1, n2))
        return 0;
    else if (n1 > n2)
        return +1;
    return -1;
}
exports.compareDouble = compareDouble;
;
