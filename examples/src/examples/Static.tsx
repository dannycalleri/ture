import React, { useEffect, useRef } from 'react';
import {
  KdTree,
  Point2D,
} from 'ture';
import { draw } from '../draw';
import { Box } from './Box';

function setup(canvas: any) {
  const context = canvas.getContext('2d')!;
  const width = 400;
  const height = 400;
  const dpr = window.devicePixelRatio;
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  context.scale(dpr, dpr);

  context.beginPath();
  context.rect(0, 0, width, height);
  context.fillStyle = "#fff";
  context.fill();
}

function Static() {
  const canvasEl = useRef(null);

  const width = 400;
  const height = 400;

  useEffect(() => {
    const tree: KdTree = new KdTree();
    tree.insert(new Point2D(0.206107, 0.904508)); // A
    tree.insert(new Point2D(0.975528, 0.345492)); // B
    tree.insert(new Point2D(0.024472, 0.654508)); // C
    tree.insert(new Point2D(0.793893, 0.904508)); // D
    tree.insert(new Point2D(0.793893, 0.095492)); // E
    tree.insert(new Point2D(0.975528, 0.654508)); // F
    tree.insert(new Point2D(0.206107, 0.095492)); // G
    tree.insert(new Point2D(0.500000, 1.0));      // H
    tree.insert(new Point2D(0.024472, 0.345492)); // I
    tree.insert(new Point2D(0.500000, 0));        // L

    setup(canvasEl.current);
    draw(canvasEl.current, tree, width, height);
  }, []);

  return (
    <div>
      <h2>Static</h2>
      <Box>
        <canvas ref={canvasEl}></canvas>
      </Box>
    </div>
  );
}

export default Static;
