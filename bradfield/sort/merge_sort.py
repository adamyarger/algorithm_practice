'''
- create an auxilary array and copy over the values
- split the array up into 2 partitions
- use a pointer on each partition, compare which partition has the smaller item then add it to the aux array
- its the pointers that get broken down in half till it only 1 item left

SMALLEST FIRST
'''


def _merge(arr, lo, mid, hi, aux):
    '''
    loop through the
    '''
    size = hi - lo
    # now we need to add left and right pointers
    left = lo
    right = mid
    for k in range(size):
        if left == mid:
            aux[k] = arr[right]
            right += 1
        elif right == hi:
            aux[k] = arr[left]
            left += 1
        elif arr[left] < arr[right]:
            aux[k] = arr[left]
            left += 1
        else:
            aux[k] = arr[right]
            right += 1
    # lastly copy over the sorted aux porttion to the arr
    # WRONG!!!
    arr[lo:hi] = aux[0:size]


def _sort(arr, lo, hi, aux):
    # this works as a postorder traversal
    # break down the side until 1 then pop off the stack and merge
    size = hi - lo
    # WRONG!!!
    # you have to add the lo and hi and not use size, otherwise the mid will always be in the left partition
    mid = (lo + hi) // 2
    if size <= 1:
        return
    # sort the left side
    _sort(arr, lo, mid, aux)
    # sort the right side
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
