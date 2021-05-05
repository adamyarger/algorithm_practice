
class Node(object):
    def __init__(self, val):
        self.val = val
        self.left = None
        self.right = None

    def insert_left(self, child):
        if not self.left:
            self.left = child
        else:
            child.left = self.left
            self.left = child

    def insert_right(self, child):
        if not self.right:
            self.right = child
        else:
            child.right = self.right
            self.right = child
