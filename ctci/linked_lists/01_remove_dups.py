# Remove Dups: Write code to remove duplicates from an unsorted li nked list. FOLLOW UP
# How would you solve this problem if a temporary buffer is not allowed?

from linked_list import LinkedList, LinkedListNode


def remove_duplicates_buffer(linked):
    buffer = {}
    prev = None
    cur = linked.head
    while cur:
        if cur.value in buffer:
            if not prev:
                linked.head = head.next
            else:
                prev.next = cur.next

        buffer[cur.value] = True
        prev = cur
        cur = cur.next


# not allowed a buffer
# - could sort the list in place then go through and compare neighbors
# - Without extra space, you'll need O(N^2) time. Try using two pointers, where the second
#   one searches ahead of the first one.
# O(n^2) time tells us it has a nested loop
def remove_duplicates(ll):
    runner = cur = ll.head
    while cur:
        runner = cur
        while runner.next:
            # runner and cur act as prev and next
            # there the same during the first iteration so we need to move forward one
            # both cases move us forward
            if runner.next.value == cur.value:
                runner.next = runner.next.next
            else:
                runner = runner.next
        cur = cur.next
    # tail is useful if we want to add a node to the end
    ll.tail = runner
    return ll


linked = LinkedList([3, 1, 3, 4, 3, 5, 3])
print(linked.values())
# remove_duplicates_buffer(linked)
remove_duplicates(linked)
print(linked.values())
