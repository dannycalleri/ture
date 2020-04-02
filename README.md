# Ture

Ture is a collection of algorithms and data structures written in TypeScript for fun and profit.

**WTF does Ture mean?** Essentially, it's a famous **sicilian** personal name, but it's contained in the word strucTUREs and remembers Alan Turing as well, so why not.

Beware that some algorithms and data structure aren't really optimized for production use, so please take this into account before depending on this package. At the moment I'm using it on personal small projects, especially small video game demos.

For instance the KdTree (a 2d tree implementation actually) and its operation are ready for production use and guaranteed to run on logarithmic time in the typical case, while some other algorithms on graphs are in the works and may need some testing.

## Features

* KdTree (2d tree implementation) with logarithmic running time (typical case)
* KdTree with `range` and `nearest` operations
* Test cases and examples (found in the `/examples` folder) to get started


## Install

Simply `npm install ture --save`.

Then use it like in the following example:

```typescript
import {
  KdTree
} from "ture";

// contains

const tree: KdTree = new KdTree();
tree.insert(new Point2D(0.7, 0.2));
tree.insert(new Point2D(0.5, 0.4));
tree.insert(new Point2D(0.2, 0.3));
tree.insert(new Point2D(0.4, 0.7));
tree.insert(new Point2D(0.9, 0.6));

tree.contains(new Point2D(0.4, 0.7)); // true
tree.contains(new Point2D(0.3, 0.7)); // false

// range

const tree: KdTree = new KdTree();
tree.insert(new Point2D(0.1, 0.4));
tree.insert(new Point2D(0.6, 0.5));
const points = tree.range(new Rect(0.4, 0.3, 0.8, 0.6));
console.log(points.length); // 1
console.log(points[0]); // (0.6, 0.5)

// nearest

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
console.log(nearestPoint); // (0.975528, 0.345492)
```

or

```typescript
import {
  Graph,
} from "ture";
const graph: Graph = createGraph([
  '1337',
  '1338',
  '1339',
]);
graph.addEdge('1337', '1338');
```

## Credits

Some of the data structures are ported from Java from the wonderful book "Algorithms, 4th Edition by Robert Sedgewick and Kevin Wayne".


## License

This project is licensed under the terms of the MIT license.
