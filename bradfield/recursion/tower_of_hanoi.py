# 1.) Move a tower of height-1 to an intermediate pole, using the final pole.
# 2.) Move the remaining disk to the final pole.
# 3.) Move the tower of height-1 from the intermediate pole to the final pole using the original pole.

# We dont need to use a data structure to keep track of the discs, why???
# The call stack, key word STACK, acts as a data structure for use while using recursion.
def move_tower(height, from_pole, to_pole, mid_pole):
    # base case
    if height >= 1:
        move_tower(height-1, from_pole, mid_pole, to_pole)
        move_disk(from_pole, to_pole)
        move_tower(height-1, mid_pole, to_pole, from_pole)


def move_disk(from_pole, to_pole):
    print('moving disk from {} to {}'.format(from_pole, to_pole))


move_tower(3, 'A', 'B', 'C')
