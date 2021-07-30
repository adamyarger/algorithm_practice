/**
 *
 * Given an array of meeting time intervals consisting of start and end times[[s1,e1],[s2,e2],...](si< ei), find the minimum number of conference rooms required.

Example 1:

Meetings: [[1,4], [2,5], [7,9]]
Output: 2
Explanation: Since [1,4] and [2,5] overlap, we need two rooms to hold these two meetings. [7,9] can
occur in any of the two rooms later.

Example 2:

Meetings: [[6,7], [2,4], [8,12]]
Output: 1
Explanation: None of the meetings overlap, therefore we only need one room to hold all meetings.

Example 3:

Meetings: [[1,4], [2,3], [3,6]]
Output:2
Explanation: Since [1,4] overlaps with the other two meetings [2,3] and [3,6], we need two rooms to
hold all the meetings.

Example 4:

Meetings: [[4,5], [2,3], [2,4], [3,5]]
Output: 2
Explanation: We will need one room for [2,3] and [3,5], and another room for [2,4] and [4,5].

Here is a visual representation of Example 4:
 */

// WHY does this not work???
// var minMeetingRooms = function (intervals) {
//   let max = 0
//   let cur = 0

//   intervals.sort((a, b) => a[0] = b[0])

//   let start = intervals[0][0]
//   let end = intervals[0][1]

//   // find max overlaps at once
//   for (let i = 1; i < intervals.length; i++) {
//     const interval = intervals[i]

//     if (interval[0] < end) {
//       // overlap add to cur count
//       cur += 1
//     } else {
//       cur = 0
//     }

//     start = interval[0]
//     end = interval[1]

//     max = Math.max(max, cur)
//   }

//   return max
// }

const swap = (arr, i, j) => {
  let tmp = arr[i];
  arr[i] = arr[j];
  arr[j] = tmp;
};

class MinHeap {
  constructor() {
    this.heap = [];
  }

  insert(value) {
    this.heap.push(value);
    this.siftUp(this.heap.length - 1);
  }

  siftUp(index) {
    let child = index;
    let parent = Math.floor((child - 1) / 2);

    while (parent >= 0 && this.heap[child] < this.heap[parent]) {
      swap(this.heap, child, parent);
      child = parent;
      parent = Math.floor((child - 1) / 2);
    }
  }

  peek() {
    return this.heap.length > 0 ? this.heap[0] : null;
  }

  pop() {
    if (this.heap.length === 0) return null;

    const min = this.heap[0];
    swap(this.heap, 0, this.heap.length - 1);
    this.heap.pop();
    this.siftDown(0);
    return min;
  }

  size() {
    return this.heap.length;
  }

  siftDown(index) {
    let parent = index;
    let left = parent * 2 + 1;
    let right = parent * 2 + 2;

    while (
      (left < this.heap.length && this.heap[left] < this.heap[parent]) ||
      (right < this.heap.length && this.heap[right] < this.heap[parent])
    ) {
      let smallest = left;
      if (right < this.heap.length && this.heap[right] < this.heap[left]) {
        smallest = right;
      }

      swap(this.heap, smallest, parent);
      parent = smallest;
      left = parent * 2 + 1;
      right = parent * 2 + 2;
    }
  }
}

var minMeetingRooms = function (intervals) {
  const size = intervals.length

  if (size <= 1) return size

  intervals.sort((a, b) => a[0] - b[0])

  const rooms = new MinHeap()

  for (let [start, end] of intervals) {
    if (rooms.size() > 0 && rooms.peek() <= start) {
      rooms.pop()
    }
    rooms.insert(end)
  }

  return rooms.size()
}


console.log(minMeetingRooms([[0, 30], [5, 10], [15, 20]])) // 2
console.log(minMeetingRooms([[0, 30], [5, 10], [15, 20], [10, 20], [20, 30]])) // 3
console.log(minMeetingRooms([[7, 10], [2, 4]])) // 1

console.log(minMeetingRooms([[1, 4], [2, 3], [3, 6]])) // 2

