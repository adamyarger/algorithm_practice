


/**
 * https://emre.me/algorithms/tarjans-algorithm/
 *
 * 1.) start at any node do a dfs label nodes with an increasing id as you go
 * 2.) track id of each node and the smallest low link value (whats low link)
 * low link = smallest id reachable from that node including self
 * something lower need to point to them to be new low link else its just self
 *
 * 3.) one all are labeled we have sub groups with matching low links
 *
 * 4.) find the bridges. bridges are found by  id of node your coming
 * from is less than the low link value of the node your going to.
 * 
 * if from node < to node its a bridge
 */


var criticalConnections = function (n, connections) {
  const list = createList(connections)

  const criticalEdges = []
  // track the min connected component for each node
  const times = {}
  let time = 0

  console.log(list)

  function dfs(vertex, parent) {
    // add to times map if it doesnt exist
    // base case
    if (times[vertex] !== undefined) return times[vertex]

    // increate the time for each node
    const val = times[vertex] = time++

    // loop through list
    for (let to of list[vertex]) {
      // ???
      if (to === parent) continue

      const next = dfs(to, vertex)

      if (val < next) criticalEdges.push([vertex, to])

      times[vertex] = Math.min(next, times[vertex])
    }

    console.log(times)

    return times[vertex]
  }

  dfs(0, null)
  return criticalEdges
}

function createList(connections) {
  const list = {}

  for (const [x, y] of connections) {
    // add to adjacency list
    if (list[x]) {
      list[x].push(y)
    } else {
      list[x] = [y]
    }

    if (list[y]) {
      list[y].push(x)
    } else {
      list[y] = [x]
    }
  }

  return list
}

console.log(criticalConnections(4, [[0, 1], [1, 2], [2, 0], [1, 3]]))