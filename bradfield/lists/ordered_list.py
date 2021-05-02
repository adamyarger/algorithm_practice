from unordered_list import Node, UnorderedList


class OrderedList(UnorderedList):
    def search(self, item):
        cur = self.head

        while cur:
            if cur.value == item:
                return True
            if cur.value > item:
                return False
            cur = cur.next
        return False

    def add(self, item):
        cur = self.head
        prev = None

        while cur is not None:
            if cur.value > item:
                break
            prev, cur = cur, cur.next

        temp = Node(item)
        if prev is None:
            temp.next, self.head = self.head, temp
        else:
            temp.next, prev.next = cur, temp
