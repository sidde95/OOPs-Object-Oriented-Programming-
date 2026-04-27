# How to remove minimum element from an array in Python?

# Solution:
# TODO 1 Consider the following array:
arr = list([3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5])

# TODO 2 This is the variable where my minimum element will be stored

min_element = max(arr) 
location = 0

for i in range(len(arr)):
    # TODO 3 Comparing the current element with the minimum element found so far
    if arr[i] < min_element:
        min_element = arr[i]
        location = i
print(f"Minimum element is {min_element} at index {location}")
    
# TODO 4 Now removing the minimum element from the array

arr.pop(location)

# TODO 5 Updated Array
print(f"Updated Array: {arr}")

listy = []
print(listy[4])

    