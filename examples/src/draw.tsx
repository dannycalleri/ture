import { KdTree, KdTreeLine, KdTreePoint } from 'ture';
export function draw(canvas: any, tree: KdTree, width: number, height: number) {
  const context = canvas.getContext('2d')!;
  const iterator = tree.draw();
  let current = iterator.next();
  while (!current.done) {
    if (current.value instanceof KdTreeLine) {
      const line: KdTreeLine = current.value;
      context.beginPath();
      context.moveTo(line.xFrom * width, line.yFrom * height);
      if (line.vertical) {
        context.strokeStyle = `#ff0000`;
      }
      else {
        context.strokeStyle = `#0000ff`;
      }
      context.lineTo(line.xTo * width, line.yTo * height);
      context.stroke();
    }
    else if (current.value instanceof KdTreePoint) {
      const point: KdTreePoint = current.value;
      context.beginPath();
      context.fillStyle = `#000000`;
      context.strokeStyle = `#000000`;
      context.arc(point.x * width, point.y * height, 2, 0, 2 * Math.PI);
      context.fill();
      context.stroke();
    }
    current = iterator.next();
  }
}
