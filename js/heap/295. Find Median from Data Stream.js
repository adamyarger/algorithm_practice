import MinHeap from '../utils/MinHeap.js'

/**
 * initialize your data structure here.
 * 
 * 2 heaps
 * left is min (have to go negative) since we want biggest of min 
 *  right is max
 * default left have more chars
 * add to left if smaller than top left
 * 
 * after each add check if we need to rebalance
 * take from one add to the other, left should only be bigger by 1 item
 */
var MedianFinder = function () {
  this.left = new MinHeap()
  this.right = new MinHeap()
};

/** 
 * @param {number} num
 * @return {void}
 */
MedianFinder.prototype.addNum = function (num) {
  if (!this.left.size || num <= -this.left.peek()) {
    this.left.push(-num)
  } else {
    this.right.push(num)
  }

  // echkeck for rebalance
  if (this.left.size > this.right.size + 1) {
    this.right.push(-this.left.pop())
  } else if (this.right.size > this.left.size) {
    this.left.push(-this.right.pop())
  }
};

/**
 * @return {number}
 * 
 * either grab the top element from the left heap if odd
 * or grab top 2 items and return mean
 */
MedianFinder.prototype.findMedian = function () {
  const count = this.left.size + this.right.size

  if (count % 2 === 0) {
    return (-this.left.peek() + this.right.peek()) / 2
  }

  return -this.left.peek()
};

/**
 * Your MedianFinder object will be instantiated and called as such:
 * var obj = new MedianFinder()
 * obj.addNum(num)
 * var param_2 = obj.findMedian()
 */


var obj = new MedianFinder()
obj.addNum(1)
obj.addNum(2)
console.log(obj.findMedian())
obj.addNum(3)
console.log(obj.findMedian())
