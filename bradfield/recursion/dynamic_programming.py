
# top down approach, starting at high number then working our way down the the base case of 0
def fib(n):
    # f(n) = f(n-1)+ f(n-2)
    if n <= 1:
        return n
    # our goal is to replace each fucntion call ith an integer
    return fib(n-1) + fib(n-2)


# print(fib(5))


# if we wanted constant space, we could replace the 2 spots in the list each time
def linear_fib(n):
    a = 0
    b = 1
    for _ in range(n):
        a, b = b, a + b
    return a


print(linear_fib(6))
