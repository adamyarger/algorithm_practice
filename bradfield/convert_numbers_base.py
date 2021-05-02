
# convert a decimal number to binary

def convert_to_binary(number):
    stack = []
    cur = number
    while cur:
        stack.append(cur % 2)
        cur = cur // 2

    out = b''
    while len(stack):
        out = out + str(stack.pop())
    return out


print(convert_to_binary(233))


DIGITS = '0123456789abcdef'


def convert_to_base(number, base):
    stack = []
    cur = number
    while cur:
        stack.append(DIGITS[cur % base])
        cur = cur // base

    out = ''
    while len(stack):
        out = out + str(stack.pop())
    return out


print(convert_to_base(233, 16))
print(convert_to_base(25, 2))
print(convert_to_base(25, 16))
