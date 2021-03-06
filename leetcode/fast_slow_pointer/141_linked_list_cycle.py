'''
LeetCode 141 - Linked List Cycle [easy]

Given a linked list, determine if it has a cycle in it.

To represent a cycle in the given linked list, we use an integer pos which represents the position (0-indexed) in the linked list where tail connects to. If pos is -1, then there is no cycle in the linked list.

Example 1:

Input: head = [3, 2, 0, -4], pos = 1
Output: true
Explanation: There is a cycle in the linked list, where tail connects to
the second node.
Circular Linked List - Test 1

Example 2:

Input: head = [1, 2], pos = 0
Output: true
Explanation: There is a cycle in the linked list, where tail connects to
the first node.
Circular Linked List - Test 2

Example 3:

Input: head = [1], pos = -1
Output: false
Explanation: There is no cycle in the linked list.
Circular Linked List - Test 3

Follow up:

Can you solve it using O(1) (i.e. constant) memory?
'''


class ListNode:
    def __init__(self, val):
        self.val = val
        self.next = None


class Solution:
    def hasCycle(self, head: ListNode) -> bool:
        slow, fast = head, head
        while fast is not None and fast.next is not None:
            slow = slow.next
            fast = fast.next.next
            if fast == slow:
                return True
        return False


_list = ListNode(1)
_list.next = ListNode(2)
_list.next.next = ListNode(1)
_list.next.next.next = _list.next

sol = Solution()
print(sol.hasCycle(_list))
