'''
https://leetcode.com/problems/longest-common-subsequence/

- create a matrix, zeros in first row and column
-
'''


def lcs(x, y):
    x_len = len(x)
    y_len = len(y)
    matrix = [[None] * (y_len+1) for i in range(x_len+1)]

    for row in range(x_len+1):  # add 1 col to pad rows with zero
        for col in range(y_len+1):  # add 1 to pad col with zeros
            if row == 0 or col == 0:  # pad the first rows and cols with 0
                matrix[row][col] = 0
            elif x[row-1] == y[col-1]:  # if the letters match grab the diagnol value plus 1
                matrix[row][col] = matrix[row-1][col-1]+1
            else:
                # take the largest value of left cell or top cell
                matrix[row][col] = max(matrix[row-1][col], matrix[row][col-1])
    return matrix[x_len][y_len]


x = 'abcdaf'
y = 'acbcf'
sub_count = lcs(x, y)
print(sub_count)
