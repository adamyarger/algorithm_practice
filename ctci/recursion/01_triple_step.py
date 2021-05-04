# Triple Step: A child is running up a staircase with n steps and can hop either 1 step, 2 steps, or 3 steps at a time.
# Implement a method to count how many possible ways the child can run up the stairs.

# Whats the brute force way?
# n steps
# step increments 1, 2, 3

# what is the very last hop the child made?

# can we calculate the next step from the previous steps, if so this is like fibonacci
# the number of variation from

# base case if we hit 0 there only one way and thats to do nothing

# think of the simple cases that you know first, these are most likely base cases
def slow_triple_step(steps):
    if steps == 0 or steps == 1:
        return 1
    if steps == 2:
        return 2
    return slow_triple_step(steps-3) + slow_triple_step(steps-2) + slow_triple_step(steps-1)


def triple_step(steps):
    return _triple_step(steps, [-1]*(steps+1))


def _triple_step(x, memo):
    if x < 0:
        return 0
    # we know for sure if the amount of steps is 0 then there is only one way, so we set that here
    memo[0] = 1
    # we need to fill in the first 3 items in the memo array since they represent the 3 first step ways
    # we then use those ways to calculate the next step, this is the same as fibonacci but with 3 items bing added together
    if x >= 1:
        memo[1] = 1
    if x >= 2:
        memo[2] = memo[1] + memo[0]
    if x > 2:
        # 3 is for the variation of steps
        for i in range(3, x + 1):
            memo[i] = memo[i-1] + memo[i-2] + memo[i-3]
    return memo[x]


print(triple_step(50))
