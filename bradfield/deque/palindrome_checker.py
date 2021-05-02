from collections import deque


def is_palindrome(chars):
    queue = deque(chars)

    while len(queue) > 1:
        left = queue.popleft()
        right = queue.pop()
        if left != right:
            return False
    return True


print(is_palindrome('adda'))
print(is_palindrome('addas'))
print(is_palindrome('reeer'))
