/**
 * 
 * Given a characters array tasks, representing the tasks a CPU needs to do, where each letter represents a different task. Tasks could be done in any order. Each task is done in one unit of time. For each unit of time, the CPU could complete either one task or just be idle.

However, there is a non-negative integer n that represents the cooldown period between two same tasks (the same letter in the array), that is that there must be at least n units of time between any two same tasks.

Return the least number of units of times that the CPU will take to finish all the given tasks.



Example 1:

Input: tasks = ["A","A","A","B","B","B"], n = 2
Output: 8
Explanation:
A -> B -> idle -> A -> B -> idle -> A -> B
There is at least 2 units of time between any two same tasks.
Example 2:

Input: tasks = ["A","A","A","B","B","B"], n = 0
Output: 6
Explanation: On this case any permutation of size 6 would work since n = 0.
["A","A","A","B","B","B"]
["A","B","A","B","A","B"]
["B","B","B","A","A","A"]
...
And so on.
Example 3:

Input: tasks = ["A","A","A","A","A","A","B","C","D","E","F","G"], n = 2
Output: 16
Explanation:
One possible solution is
A -> B -> C -> A -> D -> E -> A -> F -> G -> A -> idle -> idle -> A -> idle -> idle -> A
 */

const { count } = require("console");

/**
 * @param {character[]} tasks
 * @param {number} n
 * @return {number}
 * 
 * array of tasks
 * any order does that mean not dependent?
 * 
 * n is cooldown for 2 SAME TASKS (same letter)
 * - at least n units between 2 same tasks
 * 
 * whats a unit of time?
 * 
 * return min units of times that cpu will take to finish
 * 
 * we can reorder tasks to make them faster its fastest when there not next to eachother
 * 
 * this is about permutations if we use brute force
 * add the heiristic of picking the next to be different
 * 
 * other idea: create a dict with counts of each type
 * 
 * CLARIFY the time between 2 same tasks should be ATLEAST n amount as in we need to wait at least 2 until the next a
 * UNIT of time === array item
 * 
 * do both ways, with heap and greedy
 * https://leetcode.com/problems/task-scheduler/discuss/401103/simple-Javascript-idle-slots-1-pass-with-detailed-description
 */
var leastInterval = function (tasks, n) {
  const map = new Map()

  // max ocurrances
  let maxVal = 0

  // how many different chars are tied for max
  let maxValCount = 0

  for (char of tasks) {
    // add 1 or start with 1
    let cur = map.has(char) ? map.get(char) + 1 : 1
    map.set(char, cur)

    if (cur > maxVal) {
      maxVal = cur
      maxValCount = 1
    } else if (cur === maxVal) {
      // deal with duplicate max values
      maxValCount += 1
    }
  }

  // can never be smaller than tasks.length
  return Math.max(tasks.length, (maxVal - 1) * (n + 1) + maxValCount)
};

console.log(leastInterval(["A", "A", "A", "B", "B", "B"], 2))

// result = (maxoccurances - 1) * n+1 + numMAxTasks