
export default class MinHeap {
  constructor() {
    // this makes getting parent easier
    this.items = [0]
  }

  get size() {
    return this.items.length - 1
  }

  // read the min value
  peek() {
    return this.size ? this.items[1] : undefined
  }

  // push to the end of items
  // then trigger percolate on the item so it bubbles up till its parent is smaller than it
  push(val) {
    this.items.push(val)
    this._swim()
  }

  _swim() {
    let i = this.size

    while (Math.floor(i / 2) > 0) {
      const parent = Math.floor(i / 2)
      if (this.items[i] < this.items[parent]) {
        this._swap(i, parent)
      }
      i = parent
    }
  }

  _swap(index1, index2) {
    const temp = this.items[index1]
    this.items[index1] = this.items[index2]
    this.items[index2] = temp
  }

  // swap the first item with the last item
  // save first item to a variable
  // pop off the last item
  // sink the first item
  // by swapping we no longer trigger the array to resize all elements
  pop() {
    const val = this.items[1]
    //swap with the last item
    this.items[1] = this.items[this.size]
    // get rid of last item which was the min val
    this.items.pop()
    // sink the last item that got put at the top
    this._sink(1)
    // return the min val
    return val
  }

  _sink(i) {
    // swap with 

    while (i * 2 <= this.size) {
      // al that matters is the min item that will replace it
      const min_i = this.minChild(i)
      if (this.items[i] > this.items[min_i]) {
        this._swap(i, min_i)
      }
      i = min_i
    }
  }

  // find the min child of a parent
  minChild(i) {
    let left = i * 2
    let right = left + 1

    // no right exists
    if (right > this.size) {
      return left
    }
    return this.items[left] < this.items[right] ? left : right
  }

  // create a heap from an array
  heapify(arr) {
    let i = Math.floor(arr.length / 2)
    this.items = [0, ...arr]
    while (i > 0) {
      this._sink(i)
      i = i - 1
    }
  }
}

// const heap = new MinHeap()
// // heap.push(5)
// // heap.push(3)
// // heap.push(2)
// // heap.push(4)
// // heap.push(6)
// // heap.push(1)
// heap.heapify([5, 3, 2, 4, 6, 1])

// console.log(heap.items)
// console.log(heap.pop())
// console.log(heap.pop())
// console.log(heap.items)


export class HoMinHeap {
  constructor(compare = (lt, gt) => lt < gt) {
    // this makes getting parent easier
    this.items = [0]
    this.compare = compare
  }

  get size() {
    return this.items.length - 1
  }

  // read the min value
  peek() {
    return this.size ? this.items[1] : undefined
  }

  // push to the end of items
  // then trigger percolate on the item so it bubbles up till its parent is smaller than it
  push(val) {
    this.items.push(val)
    this._swim()
  }

  _swim() {
    let i = this.size

    while (Math.floor(i / 2) > 0) {
      const parent = Math.floor(i / 2)
      if (this.compare(this.items[i], this.items[parent])) {
        this._swap(i, parent)
      }
      i = parent
    }
  }

  _swap(index1, index2) {
    const temp = this.items[index1]
    this.items[index1] = this.items[index2]
    this.items[index2] = temp
  }

  // swap the first item with the last item
  // save first item to a variable
  // pop off the last item
  // sink the first item
  // by swapping we no longer trigger the array to resize all elements
  pop() {
    const val = this.items[1]
    //swap with the last item
    this.items[1] = this.items[this.size]
    // get rid of last item which was the min val
    this.items.pop()
    // sink the last item that got put at the top
    this._sink(1)
    // return the min val
    return val
  }

  _sink(i) {
    // swap with 

    while (i * 2 <= this.size) {
      // al that matters is the min item that will replace it
      const min_i = this.minChild(i)

      if (this.compare(this.items[min_i], this.items[i])) {
        this._swap(i, min_i)
      }
      i = min_i
    }
  }

  // find the min child of a parent
  minChild(i) {
    let left = i * 2
    let right = left + 1

    // no right exists
    if (right > this.size) {
      return left
    }

    return this.compare(this.items[left], this.items[right]) ? left : right
  }

  // create a heap from an array
  heapify(arr) {
    let i = Math.floor(arr.length / 2)
    this.items = [0, ...arr]
    while (i > 0) {
      this._sink(i)
      i = i - 1
    }
  }
}