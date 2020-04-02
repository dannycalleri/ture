import { numberEquals } from "../math";

export class Point2D {
  private _x: number;
  private _y: number;

  public constructor(x: number, y: number) {
    this._x = x;
    this._y = y;
  }

  public get x(): number { return this._x; }
  public get y(): number { return this._y; }

  public distanceTo(that: Point2D): number {
    const dx: number = this.x - that.x;
    const dy: number = this.y - that.y;
    return Math.sqrt(dx*dx + dy*dy);
  }

  public distanceSquaredTo(that: Point2D): number {
    const dx: number = this.x - that.x;
    const dy: number = this.y - that.y;
    return dx*dx + dy*dy;
  }

  public equals(other: Point2D): boolean {
    if (other == this) return true;
    if (other == null) return false;
    const that: Point2D = other;
    return numberEquals(this.x, that.x) && numberEquals(this.y, that.y);
  }
}
