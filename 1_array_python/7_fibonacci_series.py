# How to find finocci series in Python?

def fibonacci_series(
        n = input("Enter the number of terms you want in the Fibonacci series: ")
):
    
    fibonacci_series = [0, 1]
    for i in range(2, int(n)):
        first_element = fibonacci_series[i-2]
        second_element = fibonacci_series[i - 1]

        next_element = first_element + second_element
        fibonacci_series.append(next_element)

    return f"Fibonacci series up to {n} terms is: {fibonacci_series[:int(n)]}"

fibonacci_series_result = fibonacci_series()
print(fibonacci_series_result)