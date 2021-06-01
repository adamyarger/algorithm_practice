'''
Given the head of a singly linked list, reverse the list, and return the reversed list.

Example 1:

Input: head = [1,2,3,4,5]
Output: [5,4,3,2,1]
Example 2:

Input: head = [1,2]
Output: [2,1]
Example 3:

Input: head = []
Output: []

Constraints:

The number of nodes in the list is the range [0, 5000].
-5000 <= Node.val <= 5000


Follow up: A linked list can be reversed either iteratively or recursively. Could you implement both?
'''


class ListNode:
    def __init__(self, val):
        self.val = val
        self.next = None


class Solution:
    def reverseList(self, head: ListNode) -> ListNode:
        if head is None:
            return head

        prev = None
        current = head
        _next = None
        while current is not None:
            # store the current next, since it will
            # get erased when we reverse the current node
            _next = current.next
            # reverse the current node
            current.next = prev
            # update current, this is like any other linked list traversal
            current = _next
        # prev will be the last item we handled, which is the new head
        return prev