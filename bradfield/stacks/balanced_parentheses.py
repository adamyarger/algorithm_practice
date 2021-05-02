
# * if opening push
# * if closing pop
# * if no opening in stack to match its unbalanced
# * stack should be empty to pass

# we push an open bracket into the stack keeping track of it for when we find its evil twin the closing bracket

OPENING = '('


def is_balanced(parentheses):
    stack = []
    for char in parentheses:
        if char == OPENING:
            stack.append(char)
        else:
            if len(stack) == 0:
                return False
            stack.pop()

    return len(stack) == 0


# print(is_balanced('((()))'))  # => True
# print(is_balanced('(()'))  # => False
# print(is_balanced('())'))  # => False

PAIRINGS = {
    '(': ')',
    '{': '}',
    '[': ']'
}


def gis_balanced(parentheses):
    stack = []
    for char in parentheses:
        if char in PAIRINGS.keys():
            stack.append(char)
        else:
            if len(stack) == 0:
                return False
            item = stack.pop()
            if char != PAIRINGS[item]:
                return False
    return len(stack) == 0


print(gis_balanced('[()]'))
print(gis_balanced('[(){}]'))
print(gis_balanced('[()]}'))
