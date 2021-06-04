'''
23. Merge k Sorted Lists

You are given an array of k linked-lists lists, each linked-list is sorted in ascending order.

Merge all the linked-lists into one sorted linked-list and return it.

Example 1:

Input: lists = [[1,4,5],[1,3,4],[2,6]]
Output: [1,1,2,3,4,4,5,6]
Explanation: The linked-lists are:
[
  1->4->5,
  1->3->4,
  2->6
]
merging them into one sorted list:
1->1->2->3->4->4->5->6
Example 2:

Input: lists = []
Output: []
Example 3:

Input: lists = [[]]
Output: []
'''
from typing import List
from heapq import *


class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next


# inherit List node and add a less than magic method
class ListNodeExtension(ListNode):
    def __lt__(self, other):
        return self.val < other.val


class Solution:
    def mergeKLists(self, lists: List[ListNode]) -> ListNode:
        '''
        - grab the first value from each list (which is also the min), push it into a min heap
        - pop off each item in the heap and add it to the new linked list
        '''
        ListNode.__lt__ = ListNodeExtension.__lt__
        min_heap = []
        # this will only loop the array, so it grabs the head from each array
        for root in lists:
            # make sure we havent gone through it all
            if root is not None:
                heappush(min_heap, root)

        # instantiate the new linked list that will be returned
        # why do we need both head and tail?
        head = dummy = ListNode(0)
        while min_heap:
            # dummy is a dummy node
            dummy.next = heappop(min_heap)
            dummy = dummy.next
            # we need to keep repeating until wevee gone through all the linked lists
            # so we push the next level into the heap
            if dummy.next:
                heappush(min_heap, dummy.next)

        return head.next
