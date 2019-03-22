export interface Graph {
    vertices: number;
    edges: number;
    addEdge(v: string, w: string): void;
    adj(v: string): string[];
    degree(v: string): number;
}
declare function createGraph(vertices: string[]): Graph;
export { createGraph, };
