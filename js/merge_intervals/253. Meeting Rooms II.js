/**
 *
 * Given an array of meeting time intervals consisting of start and end times[[s1,e1],[s2,e2],...](si< ei), find the minimum number of conference rooms required.

Example 1:

Input: [[0, 30],[5, 10],[15, 20]]
Output: 2
Example 2:

Input: [[7,10],[2,4]]

Output:1
Thoughts:

Sort the interval by the start time
Using the priority queue to use the end time as the order to sort the used classroom
pop the earliest ending meeting room, check if the time ends earlier than the start time of current class being scheduled, if earlier, merge the interval by setting the poped intervals'end time as the current intervals' scheduled end time, push the current interval into pq as making a new room.
return the size of the pq as the result
 */