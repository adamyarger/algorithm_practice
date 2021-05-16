'''
- pick a partition element (can just be the first item in the array)
- from the left choose a i index to the right choose a j index
- keep moving i forward as long as its value is smaller than the partition element
- keep moving j back as long as its larger than the partittion element
- once they both hit a breaking rule, swap them
- stop once the i and j elements have crossed
- swap j with the partition element, now everything to the left of j is less and everythting to the right is larger

- we keep repeating this until the array has been broken down to a single element, once that happens we know that the left is smaller and right is bigger
'''

from random import shuffle


def sort(arr):
    # shuffle(arr)
    hi = len(arr) - 1
    _sort(arr, 0, hi)


def _sort(arr, lo, hi):
    # WHY??? it means the array size is 0
    if hi <= lo:
        return
    # preorder traversal
    split = partition(arr, lo, hi)
    # we dont count the partition element that was returned, so we move the indexs to ignore it
    _sort(arr, lo, split-1)
    _sort(arr, split+1, hi)


def partition(arr, lo, hi):
    pivot = arr[lo]
    left = lo + 1
    right = hi
    while True:
        while left <= right and arr[left] <= pivot:
            left += 1

        while right >= left and arr[right] >= pivot:
            right -= 1

        # base case happens when the left index passes over the right
        if left >= right:
            break
        # else we need to swap left and right values and continue traversing
        arr[left], arr[right] = arr[right], arr[left]
    # swap the patition with the right value, reutnr the right index
    arr[right], arr[lo] = arr[lo], arr[right]
    return right


data = [2, 3, 1, 8, 3, 5, 2, 6]
sort(data)
print(data)
