// const weightedDirectedGraph = {
//   start: {b: 2},
//   a: { finish: 1 },
//   b: { a: 3, finish: 5 }
// };

// const weightedDirectedGraph = {
//   start: { a: 5, b: 2},
//   a: { finish: 1 },
//   b: { a: 3, finish: 5 }
// };

const weightedDirectedGraph = {
  start: { a: 5, b: 2},
  b: { a: 8, d: 7 },
  a: { d: 2, c: 4 },
  c: { d: 6, finish: 3 },
  d: { finish: 1 }
};


const generateParentNodes = (graph, start, end) => {
  // generate parents
  let parents = {};

  for (let i of Object.keys(graph)) {
    parents[i] = null;
  }

  for (let i of Object.keys(graph[start])) {
    parents[i] = start;
  }

  delete parents.start;
  parents[end] = null;

  return parents;
}

const generateCosts = (graph, start, end) => {

  // update the costs of the immediate neighbours and update end
  // node's cost as infinity as we don't yet know the distance from
  // start to end node.

  let costs = {}
  
  Object.keys(graph).forEach(key => costs = {...costs, [key]: Infinity});
  costs = { ...costs, ...graph[start], finish: Infinity };
  delete costs.start;

  return costs;
}

const findShortestPath = (graph, start, end) => {
  // cost of current node to all of its neighbors
  // parent of current node neighbours
  // current node
  let currentNode;
  let currentNodeCost;
  let neighbors;
  //array to keep track of visited node
  let visitedNodes = [];

  const findLowestCostNode = (costs) => {
    let leastCost = -1;
    let lowestCostNode = null;

    Object.keys(costs).forEach(key => {
      let cost = costs[key];

      console.log('condition ', visitedNodes.includes(key), cost < leastCost, leastCost === -1);

      if (!visitedNodes.includes(key)) {
        if (cost < leastCost || leastCost === -1) {
          leastCost = cost;
          lowestCostNode = key;
        }
      }
    });
    return lowestCostNode;
  };

  let costs = generateCosts(graph, start, end);
  let parents = generateParentNodes(graph, start, end);
 

  currentNode = findLowestCostNode(costs);

  while(currentNode !== null && currentNode !== end) {
    currentNodeCost = costs[currentNode];
    neighbors = graph[currentNode];
    
    for (let i of Object.keys(neighbors)) {
      let newCost = currentNodeCost + neighbors[i];
      
      if (costs[i] > newCost) {
        costs[i] = newCost;
        parents[i] = currentNode;
      }
      visitedNodes.push(currentNode);
    }
    currentNode = findLowestCostNode(costs);
  }

  const result = [];
 
  function findPath(endNode) {

    if (result.includes(start)) return;

    let currentParent = parents[endNode];

    if (endNode && !result.includes(endNode)) result.unshift(endNode);

    if (currentParent && !result.includes(currentParent)) result.unshift(currentParent);

    findPath(parents[currentParent])
  }

  findPath(end);  
  // final output
  return result;
};

const shortestPath = findShortestPath(weightedDirectedGraph, 'start', 'finish');

console.log(shortestPath);
