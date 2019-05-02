const expect = require('chai').expect;

class IndirectGraph {
  constructor() {
    this.vertexes = {};
    this.edges = {};
  }

  addVertex(label, data) {
    this.vertexes[label] = data;
    this.edges[label] = {};
  }

  addEdge(source, destination, data) {
    this.edges[source][destination] = data;
    this.edges[destination][source] = data;
  }

  connected(label) {
    return Object.keys(this.edges[label]);
  }
}

class DirectGraph {
  constructor() {
    this.vertexes = {};
    this.in = {};
    this.out = {};
  }

  addVertex(label, data) {
    this.vertexes[label] = data;
    this.in[label] = {};
    this.out[label] = {};
  }

  addEdge(source, destination, data) {
    this.in[destination][source] = data;
    this.out[source][destination] = data;
  }

  vertexLabels() {
    return Object.keys(this.vertexes);
  }

  outVertexLabels(vertexLabel) {
    return Object.keys(this.out[vertexLabel]);
  }

  inDegree() {
    return this.vertexLabels().reduce((result, vertexLabel) => {
      result[vertexLabel] = Object.keys(this.in[vertexLabel]).length;
      return result;
    }, {});
  }
}

const deepFirstSearch = (graph, initialLabel, fn) => {
  let stack = [initialLabel];
  const visited = {};
  let currentNode;

  while (stack.length) {
    currentNode = stack.pop();

    if (!visited[currentNode]) {
      fn(currentNode);
      visited[currentNode] = true;
    }

    stack = stack.concat(graph.connected(currentNode)
      .filter((currentNode) => !visited[currentNode]));
  }
};

const breadthFirstSearch = (graph, initialLabel, fn) => {
  let queue = [initialLabel];
  const visited = [];
  let currentNode;

  while (queue.length) {
    currentNode = queue.shift();

    if (!visited[currentNode]) {
      fn(currentNode);
      visited[currentNode] = true;
    }

    if (!visited[currentNode]) {
      fn(currentNode);
      visited[currentNode] = true;
    }

    queue = queue.concat(graph.connected(currentNode)
      .filter((currentNode) => !visited[currentNode]));
  }
};

const topologicalSort = (graph) => {
  const result = [];
  const inDegree = graph.inDegree();
  const inEdgesCount = Object.values(inDegree).reduce((prev, next) => {
    return prev + next;
  });

  let inEdgesProcessedCount = 0;
  let currentVertexLabel;
  const zeroDegreeVertexLabels = Object.keys(inDegree).filter((vertexLabel) => inDegree[vertexLabel] === 0);

  // all vertex with IN edges
  if (graph.vertexLabels().length && zeroDegreeVertexLabels.length === 0) {
    return null;
  }

  while (zeroDegreeVertexLabels.length) {
    currentVertexLabel = zeroDegreeVertexLabels.shift();

    result.push(currentVertexLabel);

    graph.outVertexLabels(currentVertexLabel).forEach((outVertexLabel) => {
      inDegree[outVertexLabel]--;
      inEdgesProcessedCount++;

      if (inDegree[outVertexLabel] === 0) {
        zeroDegreeVertexLabels.push(outVertexLabel);
      }
    });
  }

  if (inEdgesProcessedCount !== inEdgesCount) {
    return null;
  }

  return result;
};

describe('Simple Graph', () => {
  it('deepFirstSearch', () => {
    const indirectGraph = createBaseIndirectGraph();
    const labels = [];
    deepFirstSearch(indirectGraph, 'a', (label) => {
      labels.push(label);
    });

    expect(labels).to.eql(['a', 'e', 'f', 'g', 'b', 'c', 'd', 'h']);
  });

  it('breadthFirstSearch', () => {
    const indirectGraph = createBaseIndirectGraph();
    const labels = [];
    breadthFirstSearch(indirectGraph, 'a', (label) => {
      labels.push(label);
    });

    expect(labels).to.eql(['a', 'b', 'c', 'd', 'e', 'g', 'h', 'f']);
  });

  it('topologicalSort', () => {
    let directGraph = new DirectGraph();
    directGraph.addVertex('a');
    directGraph.addVertex('b');
    directGraph.addVertex('c');
    directGraph.addEdge('a', 'c');
    directGraph.addEdge('b', 'a');
    directGraph.addEdge('b', 'c');
    expect(topologicalSort(directGraph)).to.eql(['b', 'a', 'c']);

    directGraph = new DirectGraph();
    directGraph.addVertex('a');
    directGraph.addVertex('b');
    directGraph.addVertex('c');
    directGraph.addEdge('a', 'b');
    directGraph.addEdge('b', 'c');
    directGraph.addEdge('c', 'b');
    expect(topologicalSort(directGraph)).to.equal(null);

    directGraph = new DirectGraph();
    directGraph.addVertex('a');
    directGraph.addVertex('b');
    directGraph.addEdge('a', 'b');
    directGraph.addEdge('b', 'a');
    expect(topologicalSort(directGraph)).to.equal(null);
  });
});

const createBaseIndirectGraph = () => {
  const graph = new IndirectGraph();
  graph.addVertex('a');
  graph.addVertex('b');
  graph.addVertex('c');
  graph.addVertex('d');
  graph.addVertex('e');
  graph.addVertex('f');
  graph.addVertex('g');
  graph.addVertex('h');

  graph.addEdge('a', 'b');
  graph.addEdge('a', 'c');
  graph.addEdge('a', 'd');
  graph.addEdge('a', 'e');
  graph.addEdge('b', 'c');
  graph.addEdge('b', 'g');
  graph.addEdge('c', 'd');
  graph.addEdge('d', 'h');
  graph.addEdge('d', 'e');
  graph.addEdge('e', 'f');
  graph.addEdge('f', 'h');
  graph.addEdge('f', 'g');

  return graph;
};
