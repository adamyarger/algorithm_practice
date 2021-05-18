'''
- when the total items is 0 the value is 0, so we fill in the first column with zeros
- if the only item you have to choose from is weiht 1 and value 1 then the answer is one no matter how much weight the knapsack can carry (no reapting)
- if an items weight is larger than the knapsack it cant be selected
- take the max value --> up then back current total wieghts to find the index that gets added to the selected value, then compare it to not selecting it whic is the value above
'''


def knapSack(total_weight, weight, value):
    length = len(value)
    row_len = length + 1
    col_len = total_weight + 1
    matrix = [[0] * col_len for item in range(row_len)]

    print(matrix)

    # Build table matrix[][] in bottom up manner
    for row in range(row_len):
        for col in range(col_len):
            if row == 0 or col == 0:
                matrix[row][col] = 0
            elif weight[row-1] <= col:
                matrix[row][col] = max(value[row-1] + matrix[row-1]
                                       [col-weight[row-1]],  matrix[row-1][col])
            else:
                matrix[row][col] = matrix[row-1][col]

    return matrix[length][total_weight]


# Driver program to test above function
value = [1, 4, 5, 7]
weight = [1, 3, 4, 5]
total_weight = 7
print(knapSack(total_weight, weight, value))
