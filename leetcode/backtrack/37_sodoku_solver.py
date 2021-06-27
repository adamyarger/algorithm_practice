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
        - when do we backtrack?
        - this is known as an exact cover problem, many problems can be reduced to this.

        backtrack
        - what are the next candidates?
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
        if self.checkrow(row, ch) and self.checkcol(col, ch) and self.checksquare(boxrow, boxcol, ch):
            return True
        return False

    def checkrow(self, row, ch):
        for col in range(9):
            if self.board[row][col] == ch:
                return False
        return True
