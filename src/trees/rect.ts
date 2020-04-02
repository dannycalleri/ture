import {Point2D} from "./point2d";

class Rect {
  private _xMin: number;
  private _yMin: number;
  private _xMax: number;
  private _yMax: number;

  public constructor (xMin: number, yMin: number, xMax: number, yMax: number) {
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

  public get xMin(): number { return this._xMin };
  public get yMin(): number { return this._yMin };
  public get xMax(): number { return this._xMax };
  public get yMax(): number { return this._yMax };

  public width(): number {
    return this.xMax - this.xMin;
  }

  public height(): number {
    return this.yMax - this.yMin;
  }

  public intersects(that: Rect): boolean {
    return this.xMax >= that.xMin && this.yMax >= that.yMin &&
      that.xMax >= this.xMin && that.yMax >= this.yMin;
  }

  public contains(p: Point2D): boolean {
    return (p.x >= this.xMin) && (p.x <= this.xMax) &&
      (p.y >= this.yMin) && (p.y <= this.yMax);
  }

  public distanceTo(p: Point2D): number {
    return Math.sqrt(this.distanceSquaredTo(p));
  }

  public distanceSquaredTo(p: Point2D): number {
    let dx = 0.0;
    let dy = 0.0;
    if      (p.x < this.xMin) dx = p.x - this.xMin;
    else if (p.x > this.xMax) dx = p.x - this.xMax;
    if      (p.y < this.yMin) dy = p.y - this.yMin;
    else if (p.y > this.yMax) dy = p.y - this.yMax;
    return dx*dx + dy*dy;
  }

  public toString(): string {
    return "[" + this.xMin + ", " + this.xMax + "] x [" + this.yMin + ", " + this.yMax + "]";
  }
}

export default Rect;
