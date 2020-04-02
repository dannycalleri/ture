import { Point2D } from "./point2d";
import Rect from "./rect";
export declare class KdTreePoint {
    x: number;
    y: number;
    constructor(x: number, y: number);
}
export declare class KdTreeLine {
    xFrom: number;
    yFrom: number;
    xTo: number;
    yTo: number;
    vertical: boolean;
    constructor(xFrom: number, yFrom: number, xTo: number, yTo: number, vertical: boolean);
}
export declare type PointLine = KdTreePoint | KdTreeLine;
export interface NodeInterface {
    key: number;
    value: Point2D;
    leftBelow: Node;
    rightAbove: Node;
    rect: Rect;
}
declare class Node implements NodeInterface {
    key: number;
    value: Point2D;
    leftBelow: Node;
    rightAbove: Node;
    rect: Rect;
    constructor(key: number, value: Point2D, rect: Rect);
}
export declare class KdTree {
    private root;
    private _size;
    readonly size: number;
    readonly isEmpty: boolean;
    insert(key: Point2D): void;
    private doInsert;
    get(key: Point2D): Point2D;
    contains(p: Point2D): boolean;
    range(rect: Rect): Point2D[];
    private doRange;
    nearest(p: Point2D): Point2D;
    private doNearest;
    draw(): Iterator<PointLine>;
    private doDraw;
}
export {};
