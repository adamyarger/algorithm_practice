'''
Binary Heaps are used for priority queues, whic come in handy when you
put more value on certain items in queue than others.
Binary Heaps use  O(log n) time compared to O(n log n) time with a sort function and an array

* parent must be smaller
* use a 0 as the first item in the array to make multipliction easier
'''


class BinaryHeap(object):
    def __init__(self):
        self.items = [0]

    def __len__(self):
        return len(self.items) - 1

    def __str__(self):
        return ', '.join(map(str, self.items))

    '''
    * push item to the end of the array, this gaurentees a balanced tree
    * if item is less than its parent swap with the parent (perculate_up)
    '''

    def insert(self, k):
        self.items.append(k)
        self.percolate_up()

    # If the newly added item is less than its parent, then we can swap the item with its parent.
    def percolate_up(self):
        i = len(self)
        # index 0 cant be the parent since its just a filler item, so if we hit it its done thats the base case
        while i // 2 > 0:
            if self.items[i] < self.items[i//2]:
                self.items[i], self.items[i//2] = \
                    self.items[i//2], self.items[i]
            # set i to the parent index
            i = i // 2

    '''
    * remove the min item in the heap (items[1])
    * replace items[1] with the last item in the array (items[-1])
    * percolate top item down until its smaller than both children
    '''

    def delete_min(self):
        response = self.items[1]
        self.items[1] = self.items[len(self)]
        self.items.pop()
        self.percolate_down(1)
        return response

    def percolate_down(self, i):
        # went wrong with the while loop (review)
        # i*2 represents the left child, so if no left child exists then no right child exists and were done
        while i * 2 <= len(self):
            min_i = self.min_child(i)
            if self.items[min_i] < self.items[i]:
                self.items[min_i], self.items[i] = \
                    self.items[i], self.items[min_i]
            i = min_i

    # we only care about the min child, so just return that
    def min_child(self, i):
        left = i * 2
        right = left + 1
        return left if left < right else right


if __name__ == '__main__':
    bh = BinaryHeap()
    bh.insert(5)
    bh.insert(14)
    bh.insert(11)
    bh.insert(18)
    bh.insert(9)
    print(bh)
    print(bh.delete_min())
    print(bh.delete_min())
    print(bh)
