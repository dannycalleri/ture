export declare class Point2D {
    private _x;
    private _y;
    constructor(x: number, y: number);
    readonly x: number;
    readonly y: number;
    distanceTo(that: Point2D): number;
    distanceSquaredTo(that: Point2D): number;
    equals(other: Point2D): boolean;
}
