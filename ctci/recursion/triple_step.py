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

def triple_step(steps):
    # why 0?
    if steps == 0 or steps == 1:
        return 1
    if steps == 2:
        return 2
    return triple_step(steps-3) + triple_step(steps-2) + triple_step(steps-1)


print(triple_step(4))
