'''
LeetCode 260 - Single Number III [medium]

Given an array of numbers nums, in which exactly two elements appear only once and all the other elements appear exactly twice. Find the two elements that appear only once.

Example:

Input:  [1, 2, 1, 3, 2, 5]
Output: [3, 5]
Note:

The order of the result is not important. So in the above example, [5, 3] is also correct.
Your algorithm should run in linear runtime complexity. Could you implement it using only constant space complexity?
'''
from typing import List


class Solution:
    def singleNumber(self, nums: List[int]) -> List[int]:
        '''
        - 2 elements appear 1 time
        - all others appear 2 times
        - return the 2 elements that appear 1 time
        '''
        # XOR of all numbers in the list
        n1xn2 = 0
        for num in nums:
            # this will leave us with the xor of the 2 single digits
            # how do we find the 2 seperate numbers?
            # they are 2 different numbers, so they should have at least 1 bit diffferent between them
            n1xn2 ^= num
        print('n1xn2: ', n1xn2)

        # if a bit in n1xn2 is 1, this mean theat num1 and num2 have different bits in that place
        rightmost_bit = 1
        while (rightmost_bit & n1xn2) == 0:
            rightmost_bit = rightmost_bit << 1

        # rightmost will = 2

        # 0b0011 = 3
        # 0b0101 = 5
        # 0b0110 = 6 (xor)
        # rightmost not set
        # right most is set at 2
        # 0b0001 & 0b0010 = 0, num2 = 1
        # 0b0010 & 0b0010 = 2, num1 = 2
        # 0b0001 & 0b0001 = 0, num2 = 0

        '''
        - the rightmost bit is in spot 2, that where n1 and n2 have different bits
        - if a bit is 1 in n1xn2 it means num1 and num2 have different bits in that place (becuase we did an xor)
        - were going to partition all numbers in the numbers array into 2 groups
        - group 1 will have all number with that bit set to 0
        - group 2 will have all nums with bit set to 1
        '''

        num1, num2 = 0, 0
        for num in nums:
            # check if the bit is set
            if num & rightmost_bit != 0:
                num1 ^= num
                print('num1: ', num1, bin(num1))
            else:
                # the bit is not set
                num2 ^= num
                print('num2: ', num2, bin(num2))

        return [num1, num2]


sol = Solution()
print(sol.singleNumber([1, 2, 1, 3, 2, 5]))
