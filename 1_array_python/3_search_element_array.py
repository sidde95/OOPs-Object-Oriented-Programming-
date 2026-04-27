
# How to search for a target element in an array in Python, without using any built-in functions?

def search_element(arr, target):
    for i in range(len(arr)):
        
        # Debugger statement to check the current element being compared
        # print(f"Checking element at index {i}: {arr[i]}")

        if target == arr[i]:
            return f"Element {target} found at index {i}"
    return f"Element {target} not found in the array"


# TODO 1 Consider the following array:
arr1 = list([3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5])
# TODO 2 Searching for an element in the array
target = 5
result = search_element(arr1, target)
print(result)


print("*" * 50)
# How to search for an element in an array with using built-in functions?

def search_element_builtin(arr, target):
    
    if arr.index(target):
        return f"Element {target} found at index {arr.index(target)}"
    return f"Element {target} not found in the array"

arr2 = list([3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5])
target = 9
result_builtin = search_element_builtin(arr2, target)
print(result_builtin)