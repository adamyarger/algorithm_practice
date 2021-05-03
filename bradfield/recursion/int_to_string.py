
CHAR_FOR_INT = '0123456789abcdef'

# failed


def to_string(number, base):
    if number < base:
        return CHAR_FOR_INT[number]
    return to_string(number//base, base) + CHAR_FOR_INT[n % base]


to_string(1453, 16)
