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
        pass

    def addNum(self, num: int) -> None:
        pass

    def findMedian(self) -> float:
        pass
