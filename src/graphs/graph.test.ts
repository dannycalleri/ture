import {
  Graph, 
  createGraph
} from "./graph";

test('Graph initialized with 3 vertices should return 3 as vertices count', () => {
  const graph: Graph = createGraph([
    '1337',
    '1338',
    '1339',
  ]);
  expect(graph.vertices).toBe(3);
});

test('Graph just initialized should have 0 edges', () => {
  const graph: Graph = createGraph([
    '1337',
    '1338',
    '1339',
  ]);
  expect(graph.edges).toBe(0);
});

test('Adding edges between non-existent vertices should throw an error', () => {
  const graph: Graph = createGraph([
    '1337',
    '1338',
    '1339',
  ]);
  expect(() => {
    graph.addEdge('123', '456')
  }).toThrowError(/doesn't exist/);
});

test('Adding edges between vertices should augment edges count', () => {
  const graph: Graph = createGraph([
    '1337',
    '1338',
    '1339',
  ]);
  graph.addEdge('1337', '1338');
  expect(graph.edges).toBe(1);
});

test('Adding edges between vertices should add the vertices to the respective adjacency lists', () => {
  const graph: Graph = createGraph([
    '1337',
    '1338',
    '1339',
  ]);

  let adjacentVertices = graph.adj('1337');
  expect(adjacentVertices.length).toBe(0);

  graph.addEdge('1337', '1338');
  adjacentVertices = graph.adj('1337');
  expect(adjacentVertices.length).toBe(1);
  expect(adjacentVertices).toContain('1338');

  adjacentVertices = graph.adj('1338');
  expect(adjacentVertices.length).toBe(1);
  expect(adjacentVertices).toContain('1337');
});

test('Adding edges between vertices should add augment the degree of both vertices', () => {
  const graph: Graph = createGraph([
    '1337',
    '1338',
    '1339',
  ]);

  graph.addEdge('1337', '1338');
  expect(graph.degree('1337')).toBe(1);
});
