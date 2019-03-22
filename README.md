# Ture

Ture is a collection of algorithms and data structures written in TypeScript for fun and profit.

**WTF does Ture mean?** Essentially, it's a famous **sicilian** personal name, but it's contained in the word strucTUREs and remembers Alan Turing as well, so why not.

Beware that some algorithms and data structure aren't really optimized for production use, so please take this into account before depending on this package. At the moment I'm using it on personal small projects, especially small video game demos.

## Install

Simply `npm install ture --save`.

Then use it like in the following example:

```
import {
  Graph, 
  createGraph
} from "ture";

const graph: Graph = createGraph([
  '1337',
  '1338',
  '1339',
]);
graph.addEdge('1337', '1338');
```

## Data Structures

Some of the data structures are ported from Java from the wonderful book "Algorithms, 4th Edition by Robert Sedgewick and Kevin Wayne".
