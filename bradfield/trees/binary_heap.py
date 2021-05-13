'''
Binary Heaps are used for priority queues, which come in handy when you
put more value on certain items in queue than others.
Binary Heaps use  O(log n) time compared to O(n log n) time with a sort function and an array

* parent must be smaller
* use a 0 as the first item in the array to make multipliction easier
'''


class BinaryHeap(object):
    def __init__(self):
        # start with the first index of the array filled, this makes the index math easier
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
        '''
        - append value
        - percolate up until parent is less than value
        '''
        self.items.append(k)
        self.percolate_up()

    # If the newly added item is less than its parent, then we can swap the item with its parent.
    def percolate_up(self):
        i = len(self)
        while i//2 > 0:
            if self.items[i] < self.items[i//2]:
                self.items[i], self.items[i//2] = \
                    self.items[i//2], self.items[i]
            i = i//2

    '''
    * remove the min item in the heap (items[1])
    * replace items[1] with the last item in the array (items[-1])
    * percolate top item down until its smaller than both children
    '''

    def delete_min(self):
        '''
        take the first item (its the min), then take the last item in the items array and put it in the
        front of the items array then bubble it down until both children are smaller than it
        - switch with the smallest child
        '''
        value = self.items[1]
        self.items[1] = self.items[len(self)]
        self.items.pop()
        self.percolate_down(1)
        return value

    def percolate_down(self, i):
        # keep looping as long as a child exists, that means as long as the left exists since it exists before the right does
        # the right side check happens in min_child
        while i*2 <= len(self):
            min_i = self.min_child(i)
            if self.items[i] > self.items[min_i]:
                self.items[i], self.items[min_i] = \
                    self.items[min_i], self.items[i]
            i = min_i

    # we only care about the min child, so just return that
    def min_child(self, i):
        '''
        compare and return which chil is the smallest
        '''
        left = i*2
        right = left+1
        if right > len(self):
            return left
        return left if self.items[left] < self.items[right] else right

    def build_heap(self, alist):
        # the key here is that were starting at the half way index
        # time complexity is O(n) compared to O(n log n) if we did it one at a time
        i = len(alist) // 2
        self.items = [0] + alist
        while i > 0:
            self.percolate_down(i)
            i = i - 1


if __name__ == '__main__':
    bh = BinaryHeap()
    bh.insert(14)
    bh.insert(5)
    bh.insert(11)
    bh.insert(18)
    bh.insert(1)
    # print(len(bh))
    print(bh)
    print(bh.delete_min())
    print(bh.delete_min())
    print(bh)
