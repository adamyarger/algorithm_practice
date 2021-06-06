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
    # were working from the top down
    # we need a base case
    if capacity <= 0 or currentIndex >= len(profits):
        return 0

    # were comparing profits with the item and without the item and choosing the more profitable
    profit1 = 0
    # if the current item weight is less than the sacks capacity
    # we choose it or we dont choose it
    # we choose it or we dont choose it

    # CHOOSE IT
    if weights[currentIndex] <= capacity:
        profit1 = profits[currentIndex] + brute_knapsack_recursive(
            profits,
            weights,
            capacity - weights[currentIndex],
            currentIndex + 1
        )

    # DONT CHOOSE IT
    profit2 = brute_knapsack_recursive(
        profits, weights, capacity, currentIndex + 1)

    return max(profit1, profit2)


def brute_main():
    print(brute_knapsack([1, 6, 10, 16], [1, 2, 3, 5], 7))
    print(brute_knapsack([1, 6, 10, 16], [1, 2, 3, 5], 6))


brute_main()
