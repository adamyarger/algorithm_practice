class Node(object):
    def __init__(self, value):
        self.value = value
        self.next = None


class UnorderedList(object):
    def __init__(self):
        self.head = None

    def add(self, value):
        node = Node(value)
        node.next = self.head
        self.head = node

    def is_empty(self):
        return self.head == None

    def size(self):
        if self.is_empty():
            return 0
        count = 0
        cur = self.head
        while cur:
            count = count + 1
            cur = cur.next
        return count

    def search(self, value):
        if self.is_empty():
            return False
        cur = self.head
        while cur:
            if cur.value == value:
                return True
            cur = cur.next
        return False

    def remove(self, value):
        if self.is_empty():
            return
        prev = None
        cur = self.head
        while cur:
            if cur.value == value:
                if prev is None:
                    self.head = cur.next
                else:
                    prev.next = cur.next
                return
            prev = cur
            cur = cur.next


ul = UnorderedList()
ul.add(12)
ul.add(13)
ul.add(14)
print(ul.size())
print(ul.search(15))
print(ul.remove(13))
print(ul.remove(12))
print(ul.size())
