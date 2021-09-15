

function Node(val, neighbors) {
  this.val = val === undefined ? 0 : val;
  this.neighbors = neighbors === undefined ? [] : neighbors;
};

// bfs
var cloneGraph = function (node) {
  if (!node) return null;
  // map acts as visited list
  const map = new Map([[node, new Node(node.val)]]);
  const q = new Queue([node])

  while (q.size()) {
    const cur = q.dequeue();

    for (const neighbor of cur.neighbors) {
      if (!map.has(neighbor)) {
        map.set(neighbor, new Node(neighbor.val))
        q.enqueue(neighbor);
      }
      // event if weve seen the node before we still need to add it as a neighbor
      map.get(cur).neighbors.push(map.get(neighbor));
    }
  }

  return map.get(node);
};


// dfs
var cloneGraph = function (node) {
  if (!node) return null
  const copy = new Node(node.val)
  const map = new Map([[node, copy]])
  dfs(node, map)
  return copy
}

function dfs(node, map) {
  node.neighbors.forEach(neighbor => {
    if (!map.has(neighbor)) {
      copy = new Node(neighbor.val)
      map.set(neighbor, copy)
      dfs(neighbor, map)
    }
    map.get(node).neighbors.push(map.get(neighbor))
  })
}