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
        # if theres not enough intervals we cant do anythign
        if len(intervals) < 2:
            return intervals

        # we need them to be inorder based on the start value
        # KEY question to ask in interview, are the intervals sorted?
        intervals.sort(key=lambda x: x[0])

        merged = []
        # start and end of the first interval, we wont include this in the loop but still need to compare it
        # first interval
        start = intervals[0][0]
        # second interval, were checking to see if it can be merged
        end = intervals[0][1]

        # where skipping the first interval in the loop since we need to compare the next one
        for i in range(1, len(intervals)):
            interval = intervals[i]
            # whats going on here?
            # if the start of the next interval is less than the end of the last one we have an overlap
            if interval[0] <= end:
                # create new end, this comsumes the other interval into a new one
                end = max(interval[1], end)
            else:
                # no overlap, we can add the previous interval
                merged.append([start, end])
                # the current interval becomes the prev we want to compare against
                start = interval[0]
                end = interval[1]
        merged.append([start, end])  # add the last interval
        return merged
