'''
- backtrack is about gathering partial solution and seeing if we can extend that solution if we go further
- if we cant go further then we backtrack a level
- backtrack uses depth first search
- dfs is prefered over bfs due to space efficiency
- bfs space is proportional to the width of a tree
- dfs is proportioanl to the height of a tree

https://leetcode.com/problems/subsets/discuss/429534/General-Backtracking-questions-solutions-in-Python-for-reference-%3A
https://wangyy395.medium.com/deal-with-subset-permutation-combination-problems-using-backtracking-algorithm-d50dc8f60f92
'''
from typing import List


class BacktrackCallback:
    """
    Back track callback API.
    """

    def is_a_solution(self, a: list, k: int, _input) -> bool:
        """
         Test the first k elements of vector a are a complete solution for the given problem.

        :param a: solution vector.
        :param k: first k elements.
        :param _input: allow pass general information.
        :return: true if the first k elements of vector a are a complete solution, otherwise false.
        """
        return False

    def process_solution(self, a: list, k: int, _input) -> None:
        """
        Process a complete solution once it is constructed.

        :param a: solution vector.
        :param k: first k elements.
        :param _input: allow pass general information.
        :return: None
        """
        pass

    def construct_candidates(self, a: list, k: int, _input) -> tuple:
        """
        Fills an array c with the complete set of possible candidates for the kth position of a,
        given the contents of the first k - 1 positions.

        :param a: solution vector.
        :param k: first k elements.
        :param _input: allow pass general information.
        :return: pair candidates and number of candidates and
        """
        return (), 0

    def make_move(self, a: list, k: int, _input) -> None:
        """
        Make a move based on updated kth position of a.

        :param a: solution vector.
        :param k: first k elements.
        :param _input: allow pass general information.
        :return: None
        """
        pass

    def unmake_move(self, a: list, k: int, _input) -> None:
        """
        Undo the move based on updated kth position of a.

        :param a: solution vector.
        :param k: first k elements.
        :param _input: allow pass general information.
        :return: None
        """
        pass


NMAX = 100  # maximum solution size
MAXCANDIDATES = 100  # max possible next extensions


class Backtrack:
    def __init__(self):
        self.finished = False

    def backtrack(self, a: list, k: int, _input, callback: BacktrackCallback) -> None:
        # if we found a solution, do what you need with it
        # this usually means return a value of True or and aggragated value
        if callback.is_a_solution(a, k, _input):
            callback.process_solution(a, k, _input)
        else:
            # need to keep working
            k += 1
            c, ncanidates = callback.construct_candidates(a, k, _input)

            for i in range(ncanidates):
                a[k] = c[i]
                # make move might mean adding to an array, or creating a new subset, combination, etc
                callback.make_move(a, k, _input)
                self.backtrack(a, k, _input, callback)
                if self.finished:  # terminate early
                    return
                # if we havent found anything by now, we need to go back up a level
                callback.unmake_move(a, k, _input)


class Subsets:
    def subsets(self, nums: List[int]) -> List[List[int]]:
        out = []
        self.backtrack(nums, [], out)
        return out

    def backtrack(self, nums, cur, out):
        out.append(cur)
        for i in range(len(nums)):
            # take the current num away from the next iterations canidates
            # add the current num to the cur subset (copy and add the num)
            self.backtrack(nums[i+1:], cur + [nums[i]], out)


# sol = Subsets()
# print(sol.subsets([1, 2, 3]))

class Permutations:
    def permute(self, nums: List[int]) -> List[List[int]]:
        out = []
        self.backtrack(nums, [], out)
        return out

    def backtrack(self, nums, cur, out):
        # base case, if no canidates left, weve hit the arr size
        if len(nums) == 0:
            out.append(cur)
            return

        # when cur and nums are combinaed we get all the numbers
        # combine them together to shift the ordering
        # take away from nums to get the subsets
        for i in range(len(nums)):
            self.backtrack(nums[:i] + nums[i+1:], cur + [nums[i]], out)


perm = Permutations()
print(perm.permute([1, 2, 3]))
