class Node:
    def __init__(self, key):
        self.key = key
        self.left = None
        self.right = None
        self.parent = None


class BinarySearchTree:
    def __init__(self):
        self.root = None

    def insert(self, key):
        # - bubble down until next pointer is None
        node = Node(key)
        # if root hasnt been set then set root
        if self.root is None:
            self.root = node
            return

        cur = self.root
        while cur:
            if key < cur.key:
                if cur.left:
                    cur = cur.left
                else:
                    self.parent = cur
                    cur.left = node
            else:
                if cur.right:
                    cur = cur.right
                else:
                    self.parent = cur
                    cur.right = node

    def get_node(self, key):
        pass


if __name__ == "__main__":
    bst = BinarySearchTree()
    bst.insert(20)
    bst.insert(9)
    bst.insert(25)
    bst.insert(5)
    bst.insert(12)
    bst.insert(11)
    bst.insert(14)
