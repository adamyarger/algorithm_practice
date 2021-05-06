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


if __name__ == '__main__':
    bh = BinaryHeap()
    bh.insert(5)
    bh.insert(14)
    bh.insert(11)
    bh.insert(18)
    bh.insert(9)
    print(bh)
