import { Point2D } from "./point2d";
declare class Rect {
    private _xMin;
    private _yMin;
    private _xMax;
    private _yMax;
    constructor(xMin: number, yMin: number, xMax: number, yMax: number);
    readonly xMin: number;
    readonly yMin: number;
    readonly xMax: number;
    readonly yMax: number;
    width(): number;
    height(): number;
    intersects(that: Rect): boolean;
    contains(p: Point2D): boolean;
    distanceTo(p: Point2D): number;
    distanceSquaredTo(p: Point2D): number;
    toString(): string;
}
export default Rect;
