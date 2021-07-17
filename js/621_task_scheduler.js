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
 * - create hap in JS, need to nail this since there are no heaps in JS
 */
var leastInterval = function (tasks, n) {
  // why use Map? because it keeps order and we can loop it
  const charMap = new Map()
  let maxCharCount = 0
  let maxChar = tasks[0]

  // loop through tasks
  for (let char of tasks) {
    // increment char count by 1
    charMap.set(char, (charMap.get(char) || 0) + 1)
    // in order to be greedy we need to know the most frequently used char
    // count and find the most used char
    if (charMap.get(char) > maxCharCount) {
      maxCharCount = charMap.get(char)
      maxChar = char
    }
  }

  // why??? 
  // we need to know how many intervals go between the most frquent char
  // we do this by subtracking 1 from max since we only need between a__b__a vs a__b__a__
  // then multiply by n for interval size

  // this is the max amount of intervals for the largest char
  let idleCount = (maxCharCount - 1) * n

  // how many idles can we delete?
  charMap.forEach((count, char) => {
    // return is like continue in forEach
    // why? skip, this doesnt subtract from the idels
    if (char === maxChar) return

    // we have a char with the same size as max count
    if (count === maxCharCount) {
      // count the middle intervals and subtract count since they will be replacing 1 idle for each char
      idleCount -= count - 1
    } else {
      // mans we found another char that can go in between
      idleCount -= count
    }
  })

  if (idleCount <= 0) return tasks.length

  return tasks.length + idleCount
};

console.log(leastInterval(["A", "A", "A", "B", "B", "B"], 2))