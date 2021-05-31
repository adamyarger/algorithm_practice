'''
LeetCode 56 - Merge Intervals [medium]

Given a collection of intervals, merge all overlapping intervals.

Example 1:

Input: [[1, 3], [2, 6], [8, 10], [15, 18]]
Output: [[1, 6], [8, 10], [15, 18]]
Explanation: Since intervals [1, 3] and [2, 6] overlaps, merge them into [1, 6].
Example 2:

Input: [[1, 4], [4, 5]]
Output: [[1, 5]]
Explanation: Intervals [1, 4] and [4, 5] are considered overlapping.

Time Complexity: O(N * log N), where N is the total number of intervals
log N for sorting
N for for loop
'''


class Solution:
    def merge(self, intervals):
        if len(intervals) < 2:
            return intervals

        intervals.sort(key=lambda x: x[0])
        start = intervals[0][0]
        end = intervals[0][1]
        merged = []
        for index in range(1, len(intervals)):
            interval = intervals[index]
            # got this part worng, need to compare the start to see if theres an overlap
            if interval[0] <= end:
                end = max(end, interval[1])
            else:
                # else the interval should stay the same, no new overlap
                merged.append([start, end])
                start = interval[0]
                end = interval[1]
        # need to add the last one, the loop will have only expanded the interval and not appended it
        merged.append([start, end])
        return merged
