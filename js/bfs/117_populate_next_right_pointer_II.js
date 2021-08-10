/**
 *
 * Given a binary tree

struct Node {
  int val;
  Node *left;
  Node *right;
  Node *next;
}
Populate each next pointer to point to its next right node. If there is no next right node, the next pointer should be set to NULL.

Initially, all next pointers are set to NULL.



Follow up:

You may only use constant extra space.
Recursive approach is fine, you may assume implicit stack space does not count as extra space for this problem.


Example 1:



Input: root = [1,2,3,4,5,null,7]
Output: [1,#,2,3,#,4,5,7,#]
Explanation: Given the above binary tree (Figure A), your function should populate each next pointer to point to its next right node, just like in Figure B.
 The serialized output is in level order as connected by the next pointers, with '#' signifying the end of each level.
 */

/**
* // Definition for a Node.
* function Node(val, left, right, next) {
*    this.val = val === undefined ? null : val;
*    this.left = left === undefined ? null : left;
*    this.right = right === undefined ? null : right;
*    this.next = next === undefined ? null : next;
* };
*/

/**
 * @param {Node} root
 * @return {Node}
 * 
 * 
 * this is similar to print levels
 * were going to use breadth first search
 * 
 * do a while loop
 * then inside create a queue (bfs is always a queue)
 * add to the queue by gabbing the next 2 left and right pointers and adding
 */
var connect = function (root) {
  const queue = [root, null]

  while (queue.length) {
    const cur = queue.shift()

    if (cur !== null) {
      if (cur.left) queue.push(cur.left)
      if (cur.right) queue.push(cur.right)

      // set the pointer
      let peek = queue[0]
      cur.next = peek

      //  weve gone through all of them, only the buffer null is left
      // need to add null back in since we popped the last one off
      if (peek === null) {
        queue.push(null)
      }
    }
  }
  return root
};


var connect = function (root) {
  if (!root) return root
  const q = [root]
  while (q.length) {
    let last = null
    q.slice().forEach((item, index) => {
      const node = q.shift()
      if (last) last.next = node
      if (node.left) q.push(node.left)
      if (node.right) q.push(node.right)
      last = node
    })
  }
  return root
};