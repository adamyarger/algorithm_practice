def bst(arr, lo, hi, item):
    if (hi - lo) <= 0:
        return -1

    mid = (hi + lo) // 2
    if arr[mid] == item:
        return item
    if item < arr[mid]:
        return bst(arr, lo, mid-1, item)
    if item > arr[mid]:
        return bst(arr, mid+1, hi, item)


arr = [1, 2, 3, 4, 5, 6, 7]
found = bst(arr, 0, len(arr), 9)
print(found)
