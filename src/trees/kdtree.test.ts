import {KdTree, KdTreeLine, KdTreePoint } from './kdtree';
import {Point2D} from './point2d';
import Rect from './rect';

test('KdTree with one element', () => {
  const tree: KdTree = new KdTree();
  tree.insert(new Point2D(0.1, 0.2));
  expect(tree.size).toBe(1);
});

test('KdTree with three elements', () => {
  const tree: KdTree = new KdTree();
  tree.insert(new Point2D(0.7, 0.2));
  tree.insert(new Point2D(0.5, 0.4));
  tree.insert(new Point2D(0.2, 0.3));
  tree.insert(new Point2D(0.4, 0.7));
  tree.insert(new Point2D(0.9, 0.6));
  expect(tree.size).toBe(5);
});

test('KdTree contains() should return true for a point just inserted', () => {
  const tree: KdTree = new KdTree();
  tree.insert(new Point2D(0.7, 0.2));
  tree.insert(new Point2D(0.5, 0.4));
  tree.insert(new Point2D(0.2, 0.3));
  tree.insert(new Point2D(0.4, 0.7));
  tree.insert(new Point2D(0.9, 0.6));
  expect(tree.contains(new Point2D(0.4, 0.7))).toBeTruthy();
});

test('KdTree contains() should return false for a point that has NOT been inserted', () => {
  const tree: KdTree = new KdTree();
  tree.insert(new Point2D(0.7, 0.2));
  tree.insert(new Point2D(0.5, 0.4));
  tree.insert(new Point2D(0.2, 0.3));
  tree.insert(new Point2D(0.4, 0.7));
  tree.insert(new Point2D(0.9, 0.6));
  expect(tree.contains(new Point2D(0.3, 0.7))).toBeFalsy();
});

test('KdTree range() should return the points contained in the specified rectangle', () => {
  const tree: KdTree = new KdTree();
  tree.insert(new Point2D(0.1, 0.4));
  tree.insert(new Point2D(0.6, 0.5));
  const points = tree.range(new Rect(0.4, 0.3, 0.8, 0.6));
  expect(points.length).toBe(1);
  expect(points[0]).toEqual(new Point2D(0.6, 0.5));
});

test('KdTree range() should not return any point when the rectangle does not match', () => {
  const tree: KdTree = new KdTree();
  tree.insert(new Point2D(0.1, 0.4));
  tree.insert(new Point2D(0.6, 0.5));
  const points = tree.range(new Rect(0.7, 0.7, 1, 1));
  expect(points.length).toBe(0);
});

test('KdTree with nodes forming a circle should return the sixth point as nearest to (0.81, 0.30)', () => {
  const tree: KdTree = new KdTree();
  tree.insert(new Point2D(0.206107, 0.095492)); // A
  tree.insert(new Point2D(0.975528, 0.654508)); // B
  tree.insert(new Point2D(0.024472, 0.345492)); // C
  tree.insert(new Point2D(0.793893, 0.095492)); // D
  tree.insert(new Point2D(0.793893, 0.904508)); // E
  tree.insert(new Point2D(0.975528, 0.345492)); // F
  tree.insert(new Point2D(0.206107, 0.904508)); // G
  tree.insert(new Point2D(0.500000, 0.000000)); // H
  tree.insert(new Point2D(0.024472, 0.654508)); // I
  tree.insert(new Point2D(0.500000, 1.000000)); // L
  const nearestPoint = tree.nearest(new Point2D(0.81, 0.30));
  expect(nearestPoint).toEqual(new Point2D(0.975528, 0.345492));
});

test('Testing draw iterator', () => {
  const tree: KdTree = new KdTree();
  tree.insert(new Point2D(0.206107, 0.095492)); // A
  tree.insert(new Point2D(0.975528, 0.654508)); // B
  tree.insert(new Point2D(0.024472, 0.345492)); // C
  tree.insert(new Point2D(0.793893, 0.095492)); // D
  tree.insert(new Point2D(0.793893, 0.904508)); // E
  tree.insert(new Point2D(0.975528, 0.345492)); // F
  tree.insert(new Point2D(0.206107, 0.904508)); // G
  tree.insert(new Point2D(0.500000, 0.000000)); // H
  tree.insert(new Point2D(0.024472, 0.654508)); // I
  tree.insert(new Point2D(0.500000, 1.000000)); // L

  const lines: KdTreeLine[] = [];
  const points: KdTreePoint[] = [];

  const iterator = tree.draw();
  let current = iterator.next();
  while (!current.done) {
    if(current.value instanceof KdTreeLine) {
      lines.push(current.value);
    } else if(current.value instanceof KdTreePoint) {
      points.push(current.value);
    }

    current = iterator.next();
  }

  expect(points.length).toBe(10);
  expect(lines.length).toBeGreaterThan(1);
});