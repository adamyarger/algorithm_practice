
# whats the sub problem?
def fibonacci(num):
    if num <= 1:
        return num
    return fib(num-1) + fib(num-2)


# print(fibonacci(5))


# we start with a top down fibonnaci method that recursivly goes down the tree
# we save the nth spot in an array and use that whenever it comes up again

def fib(num):
    return _fib(num, [0]*(num+1))


def _fib(num, mem):
    # first we need a base case
    if num <= 1:
        return num

    # if the memo spot hasnt been set yet then we need to call the function to do so
    if mem[num] == 0:
        mem[num] = _fib(num-1, mem) + _fib(num-2, mem)

    # if weve made it here, that means the spot has been calculated already, so use it
    return mem[num]


print(fib(6))
