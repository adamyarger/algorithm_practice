'''
LeetCode 295 - Find Median from Data Stream [hard]

Median is the middle value in an ordered integer list. If the size of the list is even,
there is no middle value. So the median is the mean of the two middle value.

For example:

[2, 3, 4], the median is 3

[2, 3], the median is (2 + 3) / 2 = 2.5

Design a data structure that supports the following two operations:

void addNum(int num) - Add a integer number from the data stream to the data structure.
double findMedian() - Return the median of all elements so far.
Example:

addNum(1)
addNum(2)
findMedian() -> 1.5
addNum(3)
findMedian() -> 2

BRute Force: keep a sorted list, but inserting a new item would take O(n) time
'''
from heapq import *


class MedianFinder:
    '''
    Abstract
    - we can store the smaller part of the list in a max_heap, we do this since we only care about the middle elements, so the largest in the small hap will be the overall middle
    - we store the larger part in a min heap
    - Inserting a number will take O(log N)... better than O(N) inserting into asorted list
    - If its an odd number, prefer the max heap having more
    ----
    Steps
    -
    '''

    def __init__(self):
        # left is the max_heap
        self.left = []
        # right is the min heap
        self.right = []

    def addNum(self, num: int) -> None:
        # why use the negative? if we prefix a minus then it turns into a max heap
        # that also means we needs to compare the other heap with a minus in front of it

        # we want more in the left, so if its empty add to it
        # its a double negative since the left is all negative
        if not self.left or -self.left[0] >= num:
            heappush(self.left, -num)
        else:
            heappush(self.right, num)

        # This is only triggered if a rebalancing is needed
        # why +1???
        # either the heaps are equal or left is larger by one
        if len(self.left) > len(self.right) + 1:
            heappush(self.right, -heappop(self.left))
        elif len(self.left) < len(self.right):
            heappush(self.left, -heappop(self.right))

    def findMedian(self) -> float:
        # we have an even number, pop from both add then divide by 2
        if len(self.left) == len(self.right):
            # dont pop, just peek
            return (-self.left[0] + self.right[0]) / 2.0
        return -self.left[0]


finder = MedianFinder()
finder.addNum(1)
finder.addNum(2)
print(finder.findMedian())  # -> 1.5
finder.addNum(3)
print(finder.findMedian())  # -> 2
