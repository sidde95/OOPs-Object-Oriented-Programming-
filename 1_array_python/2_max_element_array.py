# How to remove maximum element from an array in Python?

# Solution:
# TODO 1 Consider the following array:
arr = list([3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5])

# TODO 2 This is the variable where my maximum element will be stored
max_value = min(arr)
location = 0

for i in range(len(arr)):
     # TODO 3 Comparing the current element with the maximum element found so far
    if arr[i] > max_value:
        max_value = arr[i]
        location = i

print(f"Maximum element is {max_value} at index {location}")

# TODO 4 Now removing the maximum element from the array
arr.pop(location)

# TODO 5 Updated Array
print(f"Updated Array: {arr}")
