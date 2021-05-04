# Remove Dups: Write code to remove duplicates from an unsorted li nked list. FOLLOW UP
# How would you solve this problem if a temporary buffer is not allowed?

from linked_list import LinkedList, LinkedListNode


def remove_duplicates(linked):
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


linked = LinkedList([3, 1, 3, 4, 3, 5, 3])
print(linked.values())
remove_duplicates(linked)
print(linked.values())
