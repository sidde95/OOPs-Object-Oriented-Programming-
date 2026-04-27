# How to rotate an array in Python, without using any built-in functions?

def rotate_array(arr, k):
    '''This function rotates an array to the right by k positions without using any built-in functions. It uses a temporary variable to store the last element and shifts the elements to the right.'''
    k = k % len(arr)  # Handle cases where k is greater than n
    
    for _ in range(k):
        last_element = arr[-1]  # Store the last element
        # Shift elements to the right
        for i in range(len(arr) - 1, 0, -1):
            arr[i] = arr[i - 1]
        arr[0] = last_element  # Place the last element at the front
    return arr

rotated_array_result = rotate_array(list([1, 2, 3, 4, 5, 6, 7, 8]), 1)
print(rotated_array_result)


        