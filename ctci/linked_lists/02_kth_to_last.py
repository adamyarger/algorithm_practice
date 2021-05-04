# Return Kth to Last: Implement an algorithm to find the kth to last element of a singly linked list.

from linked_list import LinkedList, LinkedListNode


# first thought is to ache last k items in an array or dict
# next thought is to cache 1 item, set it to none at the start, then after k iterations set it to that node
# then each iteration after its just the next node
def kth_to_last(ll, k):
    i = 0
    kth_node = cur = ll.head
    while cur:
        if i+1 > k:
            kth_node = kth_node.next
            # print(kth_node)
        cur = cur.next
        i = i+1
    return kth_node


ll = LinkedList([1, 2, 3, 4, 5])
# should return 2nd to last item = 4
print('answer ', kth_to_last(ll, 2).value)
