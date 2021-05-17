'''
https://leetcode.com/problems/longest-common-subsequence/

- create a matrix, zeros in first row and column
-
'''


def lcs(x, y):
    '''
    - create a matrix, allow the first row and column to be padded with 0's
    - that means col and row length +1
    - if the 2 chars match, take the value diagnol to it and add 1
    - if they dont match, take the max value of top cell or left cell
    - to get the path, start at the bottom right cell
        - if cell is larger than top and left cells its a char
        - if not move in the direction of the biggest cell
    '''
    x_len = len(x) + 1
    y_len = len(y) + 1
    # I have a hard time visualizing the rows and cols on nsted arrays
    matrix = [[None] * y_len for item in range(x_len)]
    for row in range(x_len):
        for col in range(y_len):
            if row == 0 or col == 0:
                matrix[row][col] = 0
            elif x[row-1] == y[col-1]:  # need to subtract 1 to use the right index
                matrix[row][col] = matrix[row-1][col-1] + 1
            else:
                matrix[row][col] = max(matrix[row-1][col], matrix[row][col-1])
    return matrix[-1][-1]


x = 'abcdaf'
y = 'acbcf'
sub_count = lcs(x, y)
print(sub_count)
