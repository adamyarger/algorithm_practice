
# 1.) fully parenthesize the expression
# 2.) if postfix replace brackets on right
# 3.) if prefix replace brackets on left

PRECEDENCE = {
    '*': 3,
    '/': 3,
    '+': 2,
    '-': 2,
    '(': 1
}

CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
DIGITS = '0123456789'
LEFT_PAREN = '('
RIGHT_PAREN = ')'


def infix_to_postfix(infix_expression):
    stack = []
    out = []
    infix_list = infix_expression.split()

    for char in infix_list:
        if char in CHARACTERS or char in DIGITS:
            out.append(char)
        elif char == LEFT_PAREN:
            stack.append(char)
        elif char == RIGHT_PAREN:
            while True:
                item = stack.pop()
                if item == LEFT_PAREN:
                    break
                else:
                    out.append(item)
        else:
            while len(stack) and PRECEDENCE[stack[-1]] >= PRECEDENCE[char]:
                out.append(stack.pop())
            stack.append(char)
    while len(stack):
        out.append(stack.pop())
    return ' '.join(out)


print(infix_to_postfix('A * B + C * D'))  # => A B * C D * +
