export interface Graph {
  vertices: number;
  edges: number;
  addEdge(v: string, w: string): void;
  adj(v: string): string[];
  degree(v: string): number;
}

class GraphImpl implements Graph {
  private _vertices: number;
  private _edges: number;
  private _adj: Map<string, string[]>;

  public constructor(vertices: string[]) {
    this._vertices = vertices.length;
    this._edges = 0;
    this._adj = vertices.reduce((acc: Map<string, string[]>, vertex: string) => (
      acc.set(vertex, [])
    ), new Map<string, string[]>());
  }

  public get vertices(): number { return this._vertices; }
  public get edges(): number { return this._edges; }

  private validateVertex(vertex: string): void {
    if(!this._adj.get(vertex)) {
      throw new Error(`vertex ${vertex} doesn't exist`);
    }
  }

  public addEdge(v: string, w: string): void {
    this.validateVertex(v);
    this.validateVertex(w);
    this._edges++;
    const vAdjList: string[] = this._adj.get(v);
    vAdjList.unshift(w);

    const wAdjList: string[] = this._adj.get(w);
    wAdjList.unshift(v);
  }

  public adj(vertex: string): string[] {
    this.validateVertex(vertex);
    return this._adj.get(vertex);
  }

  public degree(vertex: string): number {
    this.validateVertex(vertex);
    return this._adj.get(vertex).length;
  }
}

function createGraph(vertices: string[]): Graph {
  return new GraphImpl(vertices);
}

export {
  createGraph,
};
