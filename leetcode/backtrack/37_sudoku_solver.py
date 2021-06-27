'''
Write a program to solve a Sudoku puzzle by filling the empty cells.

A sudoku solution must satisfy all of the following rules:

Each of the digits 1-9 must occur exactly once in each row.
Each of the digits 1-9 must occur exactly once in each column.
Each of the digits 1-9 must occur exactly once in each of the 9 3x3 sub-boxes of the grid.
The '.' character indicates empty cells.

Input: board = [["5","3",".",".","7",".",".",".","."],
                ["6",".",".","1","9","5",".",".","."],
                [".","9","8",".",".",".",".","6","."],
                ["8",".",".",".","6",".",".",".","3"],
                ["4",".",".","8",".","3",".",".","1"],
                ["7",".",".",".","2",".",".",".","6"],
                [".","6",".",".",".",".","2","8","."],
                [".",".",".","4","1","9",".",".","5"],
                [".",".",".",".","8",".",".","7","9"]]
Output: [["5","3","4","6","7","8","9","1","2"],
         ["6","7","2","1","9","5","3","4","8"],
         ["1","9","8","3","4","2","5","6","7"],
         ["8","5","9","7","6","1","4","2","3"],
         ["4","2","6","8","5","3","7","9","1"],
         ["7","1","3","9","2","4","8","5","6"],
         ["9","6","1","5","3","7","2","8","4"],
         ["2","8","7","4","1","9","6","3","5"],
         ["3","4","5","2","8","6","1","7","9"]]
Explanation: The input board is shown above and the only valid solution is shown below:

faster solution: https://leetcode.com/problems/sudoku-solver/discuss/298365/Fast-Python-3-Solution-with-Comments-(40ms-faster-than-99.51)
'''
from typing import List


class Solution:
    def solveSudoku(self, board: List[List[str]]) -> None:
        '''
        - find unassgned: loop through the grid and find the next empty space
          if no more left return -1's
        - solve: this is the backtrack function, grab the next row and col
          check if its solved
          loop through 1-9 to find a valid numbr for our current empty cell
          fill it in check if solved --> this is the recursive call to self.solve()
          backtrack by putting the . back if not solved
        - check row check col check square
        - square is different since we need to check a mini matrix of 3x3 use modulo
        '''
        self.board = board
        self.solve()

    def findUnassigned(self):
        # checks for unassigned points, if it finds one it returns it
        # if nothing unassigned is found return -1's
        for row in range(9):
            for col in range(9):
                if self.board[row][col] == '.':
                    return row, col
        return -1, -1

    def solve(self):
        '''
        - this is the backtracking function, similar to permutations, 
          but only one will fit the row based on constraints
        '''
        row, col = self.findUnassigned()
        if row == -1 and col == -1:
            # found a solution, everything is filled
            return True
        for num in ["1", "2", "3", "4", "5", "6", "7", "8", "9"]:
            if self.isSafe(row, col, num):
                # its safe fill in the cell
                self.board[row][col] = num
                # check if that finished it
                if self.solve():
                    return True
                # this is the backtracking part
                self.board[row][col] = '.'
        return False

    def isSafe(self, row, col, ch):
        # why use the modulo? keeps it restrained to guessing the square boxs row value
        boxrow = row - row % 3
        boxcol = col - col % 3
        # check the row check the col check the square, if all are good we can fill the cell with that number
        if self.checkrow(row, ch) and self.checkcol(col, ch) and self.checksquare(boxrow, boxcol, ch):
            return True
        return False

    def checkrow(self, row, ch):
        # can we find the number we want to use in the row?
        for col in range(9):
            if self.board[row][col] == ch:
                return False
        return True

    def checkcol(self, col, ch):
        for row in range(9):
            if self.board[row][col] == ch:
                return False
        return True

    def checksquare(self, row, col, ch):
        # why + 3?
        # start at modulo given row end in 3 spaces
        for r in range(row, row+3):
            for c in range(col, col+3):
                if self.board[r][c] == ch:
                    return False
        return True


sol = Solution()
board = [["5", "3", ".", ".", "7", ".", ".", ".", "."],
         ["6", ".", ".", "1", "9", "5", ".", ".", "."],
         [".", "9", "8", ".", ".", ".", ".", "6", "."],
         ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
         ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
         ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
         [".", "6", ".", ".", ".", ".", "2", "8", "."],
         [".", ".", ".", "4", "1", "9", ".", ".", "5"],
         [".", ".", ".", ".", "8", ".", ".", "7", "9"]]
sol.solveSudoku(board)
print(board)
