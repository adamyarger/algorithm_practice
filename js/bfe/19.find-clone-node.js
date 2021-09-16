
/**
 * @param {HTMLElement} rootA
 * @param {HTMLElement} rootB - rootA and rootB are clone of each other
 * @param {HTMLElement} nodeA
 * 
 * target is part of a
 * so we need to find the target in A then return corrispnding B
 * that means we traverse both
 */
const dfs = (rootA, rootB, target) => {
  if (rootA === target) {
    console.log('found', target, rootB)
    return rootB
  }

  for (let i = 0; i < rootA.children.length; i++) {
    const clone = findCorrespondingNode(rootA.children[i], rootB.children[i], target)
    if (clone) {
      return clone
    }
  }
}


// iterative
const bfs = (rootA, rootB, target) => {
  const q = [[rootA, rootB]]

  while (q.length) {
    const [a, b] = q.shift()
    if (a === target) return b

    for (let i = 0; i < a.children.length; i++) {
      q.push([a.children[i], b.children[i]])
    }
  }
}



const walk = (rootA, rootB, target) => {
  const walkerA = document.createTreeWalker(rootA, NodeFilter.SHOW_ELEMENT)
  const walkerB = document.createTreeWalker(rootB, NodeFilter.SHOW_ELEMENT)

  let cur = [walkerA.currentNode, walkerB.currentNode]

  while (cur[0] !== target) {
    cur = [walkerA.nextNode(), walkerB.nextNode()]
  }

  return cur[1]
}


// NodeIterator
// https://developer.mozilla.org/en-US/docs/Web/API/NodeFilter


// TreeWalker

(function () {
  const A = document.createElement('div')
  A.innerHTML = `
    <div>
      <div>
        <div>
          <div id="node1"></div>
        </div>
        
        <div></div>

        <div>
          <div>
            <p id="node2"></p>
          </div>
        </div>
      <div>
    <div>
  `

  const B = A.cloneNode(true)

  const node1 = A.querySelector('#node1')
  const node2 = A.querySelector('#node2')

  const node1Target = B.querySelector('#node1')
  const node2Target = B.querySelector('#node2')

  // console.log(A)

  // console.log(dfs(A, B, node1))

  // console.log(bfs(A, B, node1) === node1Target)

  console.log(walk(A, B, node1))
})()