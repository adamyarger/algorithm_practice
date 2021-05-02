
def anagram_checking_off(s1, s2):
    if len(s1) != len(s2):
        return False

    to_check_off = list(s2)

    for char in s1:
        # enumerate creates an iterable along with an index (i), here were unpacking
        for i, other_char in enumerate(to_check_off):
            print(char, other_char)
            if char == other_char:
                to_check_off[i] = None
                print(to_check_off)
                break
        # this else clause belongs to the for loop NOT the if statement
        else:
            return False

    return True


print(anagram_checking_off('nice', 'icen'))


# if an iterable is empty then the else statement is fired and the looping part is never hit
# for x in range(0):
#     print('looping')
# else:
#     print('empty range')

# when an iterable has at least 1 item then the block of the loop will be first 1 time and then the else statment will fire when its at the end
# for x in range(1):
#     print('looping')
# else:
#     print('empty range')
