import React, { useEffect, useRef, useState } from 'react';
import {
  KdTree,
  Point2D,
} from 'ture';
import { draw } from '../draw';
import { Box } from './Box';

function getMousePos(canvas: any, evt: any) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}

function clear(canvas: any, width: number, height: number) {
  const context = canvas.getContext('2d')!;
  context.beginPath();
  context.rect(0, 0, width, height);
  context.fillStyle = "#fff";
  context.fill();
}

function setup(canvas: any, width: number, height: number) {
  const context = canvas.getContext('2d')!;
  const dpr = window.devicePixelRatio;
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  context.scale(dpr, dpr);

  context.beginPath();
  context.rect(0, 0, width, height);
  context.fillStyle = "#fff";
  context.fill();
}

function Interactive() {
  const canvasEl = useRef(null);
  const [
    message,
    setMessage,
  ] = useState('');

  const width = 400;
  const height = 400;

  function onMouseClick(tree: KdTree, canvas: any, evt: any) {
    const mousePos = getMousePos(canvas, evt);
    const normalizedPos = {
      x: mousePos.x / width,
      y: mousePos.y / height,
    };
    tree.insert(new Point2D(normalizedPos.x, normalizedPos.y));
    clear(canvas, width, height);
    draw(canvas, tree, width, height);
  }

  function onMouseMove(canvas: any, evt: any) {
    const mousePos = getMousePos(canvas, evt);
    const message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
    setMessage(message);
  }

  useEffect(() => {
    const canvas: any = canvasEl.current;
    const tree: KdTree = new KdTree();
    canvas.addEventListener('mousemove', onMouseMove.bind(null, canvas), false);
    canvas.addEventListener('click', onMouseClick.bind(null, tree, canvas), false);
    setup(canvas, width, height);
  }, []);

  return (
    <div>
      <h2>Interactive</h2>
      <small>Click to add point</small>
      <Box>
        <canvas ref={canvasEl}></canvas>
      </Box>
      <div>{message}</div>
    </div>
  );
}

export default Interactive;
