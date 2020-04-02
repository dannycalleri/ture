import {Point2D} from "./point2d";
import Rect from "./rect";
import { compareDouble } from "../math";

export class KdTreePoint {
  public x: number;
  public y: number;

  public constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

export class KdTreeLine {
  public xFrom: number;
  public yFrom: number;
  public xTo: number;
  public yTo: number;
  public vertical: boolean;

  public constructor(xFrom: number, yFrom: number, xTo: number, yTo: number, vertical: boolean) {
    this.xFrom = xFrom;
    this.yFrom = yFrom;
    this.xTo = xTo;
    this.yTo = yTo;
    this.vertical = vertical;
  }
}

export type PointLine = KdTreePoint | KdTreeLine;

export interface NodeInterface {
  key: number;
  value: Point2D;
  leftBelow: Node;
  rightAbove: Node;
  rect: Rect;
}

class Node implements NodeInterface {
  public key: number;
  public value: Point2D;
  public leftBelow: Node;
  public rightAbove: Node;
  public rect: Rect;

  public constructor(key: number, value: Point2D, rect: Rect) {
    this.key = key;
    this.value = value;
    this.rect = rect;
  }
}

export class KdTree {
  private root: Node;
  private _size: number = 0;

  public get size(): number { return this._size };
  public get isEmpty(): boolean {
    return this.size == 0;
  }

  public insert(key: Point2D): void {
    // the point is already in the tree
    if (this.get(key) !== null) {
      return;
    }

    this.root = this.doInsert(this.root, null, 0, 0, 1, 1, 0, key);
  }

  private doInsert(node: Node, parent: Node, minX: number, minY: number, maxX: number, maxY: number, level: number, value: Point2D): Node {
    if (node == null) {
      this._size++;
      const vertical: boolean = (level % 2 == 0);
      const keyToUse: number = vertical ? value.x : value.y;
      const rect: Rect = new Rect(minX, minY, maxX, maxY);
      return new Node(keyToUse, value, rect);
    }

    const vertical: boolean = (level % 2 == 0);
    const keyToUse: number = vertical ? value.x : value.y;
    const cmp: number = compareDouble(keyToUse, node.key);
    if (cmp < 0) {
      let updatedMaxX: number = maxX;
      let updatedMaxY: number = maxY;
      if (vertical) {
        updatedMaxX = node.value.x;
      }
      else {
        updatedMaxY = node.value.y;
      }

      // update maxX or maxY
      node.leftBelow = this.doInsert(
        node.leftBelow,
        node,
        minX,
        minY,
        updatedMaxX,
        updatedMaxY,
        level + 1,
        value
      );
    }
    else {
      let updatedMinX: number = minX;
      let updatedMinY: number = minY;
      if (vertical) {
        updatedMinX = node.value.x;
      }
      else {
        updatedMinY = node.value.y;
      }

      // update minX or minY
      node.rightAbove = this.doInsert(
        node.rightAbove,
        node,
        updatedMinX,
        updatedMinY,
        maxX,
        maxY,
        level + 1,
        value
      );
    }

    return node;
  }

  public get(key: Point2D): Point2D {
    let node: Node = this.root;
    let level = 0;
    while (node != null) {
      if (node.value.equals(key)) {
        return node.value;
      }

      const keyToCompare: number = (level % 2 == 0) ? key.x : key.y;
      const cmp: number = compareDouble(keyToCompare, node.key);
      if (cmp < 0) {
        node = node.leftBelow;
      }
      else {
        node = node.rightAbove;
      }

      level++;
    }

    return null;
  }

  public contains(p: Point2D): boolean {
    return this.get(p) != null;
  }

  public range(rect: Rect): Point2D[] {
    const list: Point2D[] = [];
    return this.doRange(this.root, rect, list);
  }

  private doRange(node: Node, rect: Rect, list: Point2D[]): Point2D[] {
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
  }

  public nearest(p: Point2D): Point2D {
    if (this.isEmpty) {
      return null;
    }

    return this.doNearest(this.root, new Point2D(Number.MAX_VALUE, Number.MAX_VALUE), 0, p);
  }

  private doNearest(node: Node, nearest: Point2D, level: number, p: Point2D ): Point2D {
    if (node == null) {
      return nearest;
    }

    const distanceToNearestDiscovered: number = nearest.distanceSquaredTo(p);
    const distanceToCurrentNodeRectangle: number = node.rect.distanceSquaredTo(p);

    if (distanceToNearestDiscovered > distanceToCurrentNodeRectangle) {
      const pointToCheck: Point2D = new Point2D(node.value.x, node.value.y);
      if (distanceToNearestDiscovered > pointToCheck.distanceSquaredTo(p)) {
        nearest = pointToCheck;
      }

      const vertical: boolean = (level % 2 == 0);
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
  }

  public draw(): Iterator<PointLine> {
    return this.doDraw(this.root, null, true);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private *doDraw(node: Node, parent: Node, vertical: boolean): any {
    if (node == null) {
      return;
    }

    yield new KdTreePoint(node.value.x, node.value.y);

    if (vertical) {
      if (parent != null) {
        if (node.value.y < parent.value.y) {
          yield new KdTreeLine(
            node.value.x,
            parent.value.y,
            node.value.x,
            parent.rect.yMin,
            true,
          );
        }
        else {
          yield new KdTreeLine(
            node.value.x,
            parent.value.y,
            node.value.x,
            parent.rect.yMax,
            true,
          );
        }
      }
      else {
        yield new KdTreeLine(
          node.value.x,
          0,
          node.value.x,
          1,
          true,
        );
      }
    }
    else {
      if (parent != null) {
        if (node.value.x < parent.value.x) {
          yield new KdTreeLine(
            parent.value.x,
            node.value.y,
            parent.rect.xMin,
            node.value.y,
            false,
          );
        }
        else {
          yield new KdTreeLine(
            parent.value.x,
            node.value.y,
            parent.rect.xMax,
            node.value.y,
            false,
          );
        }
      }
      else {
        yield new KdTreeLine(
          0,
          node.value.y,
          1,
          node.value.y,
          false,
        );
      }
    }

    yield *this.doDraw(node.leftBelow, node, !vertical);
    yield *this.doDraw(node.rightAbove, node, !vertical);
  }
};
