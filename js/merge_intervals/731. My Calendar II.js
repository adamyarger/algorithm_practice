
var MyCalendarTwo = function () {
  this.intervals = []
  this.overlaps = []
};

/** 
 * @param {number} start 
 * @param {number} end
 * @return {boolean}
 
 tack overlaps
 track calendar
 overlaps track 2 then if you find another return
 
 go through calendar and check for 2 based overlap
 always push to calendar
 
 
 non empty intersection [start, end]
 */
MyCalendarTwo.prototype.book = function (start, end) {
  // check for overlaps
  for (const [s, e] of this.overlaps) {
    if (start < e && end > s) return false
  }

  for (const [s, e] of this.intervals) {
    // use max min
    if (start < e && end > s) {
      this.overlaps.push([Math.max(start, s), Math.min(end, e)])
    }
  }

  this.intervals.push([start, end])

  return true
};

/**
 * Your MyCalendarTwo object will be instantiated and called as such:
 * var obj = new MyCalendarTwo()
 * var param_1 = obj.book(start,end)
 */