# How to find missing element in an array in Python, without using any built-in functions?

def find_missing_element(arr):
    arr_sum = 0
    for i in range(len(arr)):
        arr_sum += arr[i]
    n = len(arr) + 1
    total_sum = n * (n + 1) //2
    missing_element = total_sum - arr_sum
    
    print(f"Sum of elements in the array: {arr_sum}")
    print(f"Total sum of first {n} natural numbers: {total_sum}")
    
    return f"Missing element in the array is: {missing_element}"

arr = list([1, 2, 4, 5, 6])
result = find_missing_element(arr)
print(result)
