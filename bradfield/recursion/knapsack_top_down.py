'''
BRUTE FORCE
- try all combinations of the given items, then choose the
  one with maximum profits and a weight that doesnt exceed to total.

- for each item i
- create a new set which includes item i if the total weight does not exceed the capacity, and
  recursivly process the remaining capacity and items
- create a new set WITHOUT item i, and recursivly process the remaining items
- return the set from the above two sets with higher profits

'''


def brute_knapsack(profits, weights, capacity):
    return brute_knapsack_recursive(profits, weights, capacity, 0)


def brute_knapsack_recursive(profits, weights, capacity, currentIndex):
    # first we need a base case
    # there 2 one is that were moving up to new items
    # the second is being over capacity
    if currentIndex >= len(profits) or capacity <= 0:
        return 0

    # test choosing it or not choosing it
    # we can only choose it if the weight is within capacity
    profit1 = 0
    if weights[currentIndex] <= capacity:
        # add the item and increase the total profits
        profit1 = profits[currentIndex] + brute_knapsack_recursive(
            profits, weights, capacity - weights[currentIndex], currentIndex + 1)

    profit2 = brute_knapsack_recursive(
        profits, weights, capacity, currentIndex + 1)

    return max(profit1, profit2)


def brute_main():
    print(brute_knapsack([1, 6, 10, 16], [1, 2, 3, 5], 7))
    print(brute_knapsack([1, 6, 10, 16], [1, 2, 3, 5], 6))


brute_main()
