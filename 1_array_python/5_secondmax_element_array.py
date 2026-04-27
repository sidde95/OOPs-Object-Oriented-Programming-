
# How to find the second maximum element in an array in Python, using built-in functions?
def second_max_element_array(arr):
    '''This function finds the second maximum element in an array by first sorting the array and then returning the second last element.'''
    def sorted_list(arr):
        '''This function sorts the array in ascending order using the built-in sorted function.'''
        sorted_arr = sorted(arr)
        return sorted_arr

    def second_max_element(sorted_arr):
        '''This function returns the second maximum element from a sorted array.'''
        return sorted_arr[-2]
    
    return f"Sorted Array: {sorted_list(arr)}\nSecond maximum element in the array is: {second_max_element(sorted_list(arr))}"


second_max_element_array_result = second_max_element_array(list([3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5]))
print(second_max_element_array_result)



# How to find the second maximum element in an array in Python, without using any built-in functions?
def second_max_element_array_no_builtin(arr):
    '''This function finds the second maximum element in an array without using any built-in functions. It iterates through the array to find the maximum and second maximum values.'''
    
    def max(arr):
        '''This function finds the maximum element in the array.'''
        max_value = arr[0]
        for i in range(1, len(arr)):
            
            if arr[i] > max_value:
                max_value = arr[i]
        return max_value
    
    # for i in range(len(arr)):
    #     if arr[i] > max_value:
    #         max_value = arr[i]

    def second_max(arr, max_value):
        '''This function finds the second maximum element in the array by comparing each element with the maximum value.'''
        second_max_val = -1
        for j in range(1, len(arr)):
            if second_max_val < arr[j] < max_value:
                second_max_val = arr[j]
        return second_max_val
    
    # for j in range(len(arr)):
    #     if second_max_value < arr[j] < max_value:
    #         second_max_value = arr[j]

    # return f"Second maximum element in the array without using built-in functions is: {second_max_value}"
    return f"Maximum element in the array is: {max(arr)}\nSecond maximum element in the array without using built-in functions is: {second_max(arr, max(arr))}"

second_max_element_array_no_builtin_result = second_max_element_array_no_builtin(list([3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5]))
print(second_max_element_array_no_builtin_result)

