'''
- create an auxilary array and copy over the values
- split the array up into 2 partitions
- use a pointer on each partition, compare which partition has the smaller item then add it to the aux array
- its the pointers that get broken down in half till it only 1 item left

SMALLEST FIRST
'''


def _merge(arr, lo, mid, hi, aux):
    size = hi - lo
    left = lo
    right = mid
    for k in range(size):
        if left == mid:  # if we hit to end of the left side
            aux[k] = arr[right]
            right += 1
        elif right == hi:  # we hit the end of the right parittion, grab the left side value and incrment
            aux[k] = arr[left]
            left += 1
        elif arr[right] < arr[left]:
            aux[k] = arr[right]
            right += 1
        else:
            aux[k] = arr[left]
            left += 1
    # what does this do?
    # copy over the aux array
    arr[lo:hi] = aux[0:size]


def _sort(arr, lo, hi, aux):
    size = hi - lo
    # base case
    if size <= 1:
        return
    # we need to partition the array into 2... keep doing this till we hit 1 element
    mid = (lo + hi) // 2
    # break down each paritition until it hits the base case
    _sort(arr, lo, mid, aux)
    _sort(arr, mid, hi, aux)
    _merge(arr, lo, mid, hi, aux)


def sort(arr):
    size = len(arr)
    aux = [None] * size
    _sort(arr, 0, size, aux)


if __name__ == '__main__':
    arr = [1, 5, 7, 6, 3, 2, 8]
    sort(arr)
    print(arr)
