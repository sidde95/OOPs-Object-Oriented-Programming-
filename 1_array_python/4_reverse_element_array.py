# How to reverse an array in Python, using indexing?

def reverser_array_indexing(arr):
    '''This function uses slicing to reverse an array'''
    return f"Reversed array using indexing: {arr[::-1]}"


# How to reverse an array in Python, using temp array?

def reverse_array_temp(arr):
    '''This function uses a temporary array to reverse an array'''
    # TODO 1 Create a temporary array to hold the reversed elements
    temp_arr = [0] * len(arr)

    # TODO 2 Loop in reverse order and fill temp. array, Note: 0 in for loop doe not happen
    for i in range(len(arr), 0, -1):
        temp_arr[i - 1] = arr[len(arr) - i]

    return f"Reversed array using temp array: {temp_arr}"


# How to reverse an array in Python, without using any built-in functions, but using indexing?

# ERROR: IndexError: list index out of range, because of -i + 1, it should be -i - 1
def reverse_array_no_builtin_m1(arr):
    '''This function reverses an array without using any built-in functions. It uses indexing to swap elements in place.'''
    # [1, 7, 8, 9, 10]         
    for i in range(len(arr)//2):
        arr[i], arr[-i +1] = arr[-i +1], arr[i]
    return f"Reversed array without using built-in functions: {arr}"

# How to reverse an array in Python, without using any built-in functions?

def reverse_array_no_builtin_m2(arr):
    '''This function reverses an array without using any built-in functions. It uses two pointers to swap elements in place.'''
    start = 0
    end = len(arr) - 1
    while start< end:
        arr[start], arr[end] = arr[end], arr[start]
        start += 1
        end -= 1
    return f"Reversed array without using any built-in functions(pointers): {arr}"


reverse_array_indexing_result = reverser_array_indexing(list([3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5]))
print(reverse_array_indexing_result)    

print("*" * 100)

reverse_array_temp_result = reverse_array_temp(list([3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5]))
print(reverse_array_temp_result)  

print("*" * 100)

reverse_array_no_builtin_m1_result = reverse_array_no_builtin_m1(list([3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5]))
print(reverse_array_no_builtin_m1_result)

print("*" * 100)

reverse_array_no_builtin_m2_result = reverse_array_no_builtin_m2(list([3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5]))
print(reverse_array_no_builtin_m2_result)