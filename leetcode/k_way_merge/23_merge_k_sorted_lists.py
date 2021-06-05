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

Time Complexity: O(N log K) where N is the total number of elements in all the K input arrays.

Space Complexity: O(K)
'''
from typing import List
from heapq import *


class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next


class ListNodeExtension(ListNode):
    # we need this for the min heap to work
    def __lt__(self, other):
        return self.val < other.val


class Solution:
    def mergeKLists(self, lists: List[ListNode]) -> ListNode:
        '''
        - create amin heap
        - loop through the arrays of linked list and grab the root of eachand put them in the min heap
        - use a while loop to pop off roots, add them to a new linked list then add the roots next to the min heap
        '''
        ListNode.__lt__ = ListNodeExtension.__lt__
        min_heap = []

        for root in lists:
            if root is not None:
                heappush(min_heap, root)

        # head will still equal that first dummy node, that mean when we do next it points to the first node we inserted
        head = dummy = ListNode(0)
        while min_heap:
            dummy.next = heappop(min_heap)
            dummy = dummy.next

            if root.next is not None:
                heappush(min_heap, dummy.next)

        return head.next
