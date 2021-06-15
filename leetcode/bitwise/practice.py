

def event_or_odd(num: int) -> str:
    # if the least significant bit is 0 its even otherwise its odd
    if (num & 1) == 0:
        return f'{num} is EVEN'
    else:
        return f'{num} is ODD'


# print(event_or_odd(5))


def check_nth_bit(num: int, n: int) -> str:
    if num & (1 << n):
        return f"{num} = {bin(num)} (binary) and {n}th bit is set"
    else:
        return f"{num} = {bin(num)} (binary) and {n}th bit is NOT set"


print(check_nth_bit(4, 2))
