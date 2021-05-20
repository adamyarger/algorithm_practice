'''
- when the total items is 0 the value is 0, so we fill in the first column with zeros
- if the only item you have to choose from is weiht 1 and value 1 then the answer is one no matter how much weight the knapsack can carry (no reapting)
- if an items weight is larger than the knapsack it cant be selected
- take the max value --> up then back current total wieghts to find the index that gets added to the selected value, then compare it to not selecting it whic is the value above


ROW is ALWAYS first
row is always first
row is always first

matrix[row][col]
'''


def knap_sack(total_weight, weight, value):
    '''
    contraints: max weight is 7, want maximum value while under weight

    - this uses tabulation since were filling out a matrix then using our past results to calculate new results
    - topdown vs bottom up == https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Binary_heap_bottomup_vs_topdown.svg/440px-Binary_heap_bottomup_vs_topdown.svg.png
    - we know the whats true for a smaller bag is true for the bigger bag
    - this way of dynamic programming is just running through different bag size scenarios with the same items each time
    - row is always first


    - you either picking the new value or your not picking it
    - only use row to access the weight and value arrays, the other one is always too long
    '''
    row_len = total_weight + 1
    col_len = len(value) + 1
    matrix = [[None] * row_len for item in range(col_len)]
    # [
    #     [None, None, None, None, None, None, None, None],
    #     [None, None, None, None, None, None, None, None],
    #     [None, None, None, None, None, None, None, None],
    #     [None, None, None, None, None, None, None, None],
    #     [None, None, None, None, None, None, None, None]
    # ]
    for row in range(col_len):
        for col in range(row_len):
            if row == 0 or col == 0:
                matrix[row][col] = 0
            # theres a match, choose the max of new value plus value up and back weight amount
            elif col >= weight[row-1]:
                # up and go back by the orws weight amount
                new_value = matrix[row-1][col-weight[row-1]] + value[row-1]
                top_value = matrix[row-1][col]
                matrix[row][col] = max(new_value, top_value)
            else:
                matrix[row][col] = matrix[row-1][col]
    return matrix[-1][-1]

    # Driver program to test above function
value = [1, 4, 5, 7]
weight = [1, 3, 4, 5]
total_weight = 7
print(knap_sack(total_weight, weight, value))
