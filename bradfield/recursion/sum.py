
def sum_of(numbers):
    if len(numbers) == 0:
        return 0
    # we cut off the first item on each function call,
    # this makes the array smaller each time as we work towards our base case
    # behind the scenes theres a call stack, each iteration another frame is pushed onto the stack
    # when the base case is reached the stack frames start popping off until theres nothing left related to that function
    print(numbers)
    return numbers[0] + sum_of(numbers[1:])


print(sum_of([1, 2, 3, 5, 7]))
