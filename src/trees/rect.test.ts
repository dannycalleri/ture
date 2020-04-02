import Rect from './rect';
import {Point2D} from './point2d';

test('Rect must fail if xMin > xMax', () => {
  expect(() => {
    new Rect(1, 0, 0, 1);
  }).toThrow();
});

test('Rect must fail if yMin > yMax', () => {
  expect(() => {
    new Rect(0, 1, 1, 0);
  }).toThrow();
});

test('Rect must fail if both xMin > xMax && yMin > yMax', () => {
  expect(() => {
    new Rect(1, 1, 0, 0);
  }).toThrow();
});

test('Rect must fail if any of the input is not a number', () => {
  expect(() => {
    new Rect(NaN, 0, 1, 1);
  }).toThrow();
});

test('Rect width must be correct', () => {
  const rect = new Rect(0, 0, 3, 2);
  expect(rect.width()).toBe(3);
});

test('Rect height must be correct', () => {
  const rect = new Rect(0, 0, 3, 2);
  expect(rect.height()).toBe(2);
});

test('2 overlapping Rect must intersect', () => {
  const rect1 = new Rect(0, 0, 3, 2);
  const rect2 = new Rect(1, 1, 3, 2);
  expect(rect1.intersects(rect2)).toBeTruthy();
});

test('2 NOT overlapping Rect must NOT intersect', () => {
  const rect1 = new Rect(0, 0, 3, 2);
  const rect2 = new Rect(5, 5, 10, 10);
  expect(rect1.intersects(rect2)).toBeFalsy();
});

test('Rect must contain point in its center', () => {
  const rect = new Rect(0, 0, 3, 2);
  const point = new Point2D(1, 1);
  expect(rect.contains(point)).toBeTruthy();
});

test('Rect must NOT contain point far away', () => {
  const rect = new Rect(0, 0, 3, 2);
  const point = new Point2D(10, 10);
  expect(rect.contains(point)).toBeFalsy();
});
