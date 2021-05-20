'''
IDEA:
- check the length of the array
- get the middle value, check if it larger than or smaller than its index
- if its larger repeat binary search left
- else go left
'''
NOT_FOUND = -1


def magic_index(array, min_index=0, max_index=None):
    # set the max index, were just starting
    if max_index is None:
        max_index = len(array) - 1

    # base case, weve passed the valid indexes
    if max_index < min_index:
        return NOT_FOUND

    # this part is like merge sort
    # we need to add the min and max idnex together before deviding otherwise the index will always be on the left side
    # this works because its making a similar assumption as merge sort, which is the sides are sorted
    # divide and conquer
    mid = (max_index + min_index) // 2
    if mid == array[mid]:
        return mid
    # if mid is bigger than its value the means everything to the right is bigger as well since its in sorted order
    if mid > array[mid]:
        # we skip the mid since weve already visited it
        # we return the recursive function since if we find a value we need to bubble it up
        # dos that man we should check for the function being larger than -1?
        return magic_index(array, mid+1, max_index)
    else:
        return magic_index(array, min_index, mid-1)


def magic_index_non_distinct(array, min_index=0, max_index=None):
    if max_index is None:
        max_index = len(array) - 1

    # the old base case wont work, becuase the next point on the right could be the same and be the match
    # could knowing where the repeating ends help?
    if min_index > max_index:
        return NOT_FOUND

    mid = (max_index + min_index) // 2
    if mid == array[mid]:
        return mid

    # taking the min here is a way of skipping duplicates, it moves us towards our base case
    # array[mid] skips right to where the magic number would be, other wise the number are chaning and we should check
    # the whole point is to get to were the numbers decrment
    left_index = min(mid - 1, array[mid])
    left = magic_index_non_distinct(array, min_index, left_index)
    if left >= 0:
        return left

    right_index = max(mid + 1, array[mid])
    return magic_index_non_distinct(array, right_index, max_index)


test_cases = [
    ([-14, -12, 0, 1, 2, 5, 9, 10, 23, 25], 5),
    ([-14, -12, 0, 1, 2, 7, 9, 10, 23, 25], NOT_FOUND),
    ([0, 1, 2, 3, 4], 2),
    ([], NOT_FOUND),
]

followup_test_cases = test_cases + [
    ([-10, -5, 2, 2, 2, 3, 4, 7, 9, 12, 13], 2),
]


def test_magic_index():
    for array, expected in test_cases:
        assert magic_index(array) == expected


def test_magic_index_non_distinct():
    for array, expected in followup_test_cases:
        assert magic_index_non_distinct(array) == expected


if __name__ == "__main__":
    test_magic_index()
    test_magic_index_non_distinct()
