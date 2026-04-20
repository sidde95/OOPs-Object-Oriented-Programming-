# Comprehensive Object Oriented Programming (OOP) Handbook

---
## Table of Contents
1. Introduction to OOP
2. Classes and Objects
3. The 4 Pillars of OOP
4. Advanced Concepts
5. Mini Project

---
## Introduction to OOP

### What is OOP?

Object-Oriented Programming is a programming paradign based on the concept of "Object" and "Classes". It stuctures software in a way that mimics real world entities and their interactions.

### Why OOP?
    - **Modularity** - Code is organized and easier to manage
    - **Reusability** - write once, use mutliple times.
    - **Maintainibility** - Changes in one place affect the entire system consistently.
    - **Scalibility** - Easier to expand and add new faatures.

---
## Classes and Objects

### What is Class?

A class is a blueprint or template for creating objects. It defines the structure and behaviour.

### What is an Object?

An object is an instance (concrete realization) of a class.

#### Example 1: Basic Class and Object

```python
class Car:
    def __init__(self, make, model, year):
        self.make = make
        self.model = model
        self.year = year

    def display_info(self):
        print(f"{self.year}, {self.make} {self.model}")

# Create objects (instances)
car1 = Car("Toyota", "Camry", "2020")
car2 = Car("Honda", "Civic", "2015")

car1.display_info() #output: 2020, Toyota, Camry
car2.display_info() #output: 2015, Honda, Civic
```

### Example 2: Class with Attributes and Methods

```python
class BankAccount:
    def __init__(self, owner, balance = 0):
        self.owner = owner
        self.balance = balance

    def deposit(self, amount):
        self.balance += amount
        print(f"Deposited ${amount}. New Balance {self.balance}") 

    def withdrawn(self, amount):
        if amount <= self.balance:
            self.balance -= amount
            print(f"Withdrew ${amount}. New Balance {self.balance}") 
        else:
            print("Insufficient Balance.")

account = BankAccount()
account1.desposit(500) # Output: Deposited $500. New Balance 1500
account1.withdraw(750) # Output: Withdrew $750. New Balance 750
```

---

## The 4 Pillars of OOP

## 1. ENCAPSULATION

Building data and methods together and hiding internal implementation details from the outside world.

### Purpose:
    - Control access to object data
    - Prevent unintended modifications
    - Provide a clean interface

### Example 1: Using Private Attributes

```python
class Student:
    def __init__(self, name, gpa):
        self.__name = name  # Private attribute (double standard)
        self.__gpa = gpa
    
    # Getter Method
    def get_name(self):
        return self.__name

    def get_gpa(self):
        return self.__gpa

    # Setter method with validation
    def set_gpa(self, gpa):
        if 0 <= gpa <= 4:
            self.__gpa = gpa
            print(f"GPA updated to {gpa}")
        else:
            print("Invalid GPA! Must be between 0 and 4")
        
student = Student("Bob", 2.8)
print(student1.get_name())
print(student1.get_gpa())

student1.set_gpa(3.4)  # Output: GPA updated to 3.4
print(student1.get_gpa()) # Output: 3.4
```

### Example 2: Protecting Data

```python
class Employee:
    def __init__(self, name, salary):
        self.__name = name
        self.__salary = salary

    def give_raise(self, amount):
        if amount:
            self.__salary += amount
            print(f"Your salary has risen by ${amount}. New salary ${self.__salary}")
        else:
            print(f"Raise must be positive.")
        
    def get_salary(self):
        return self.__salary


emp = Employee("Siddhartha", 61500)
emp.give_raise(5000)
print(emp.get_salary()) # Output: Your salary has risen by $5000. New Salary $66500
```

---

## 2. INHERITANCE

A class (child) inherits attributes and methods from another class (parent).

### Purpose
    - Code reusability
    - Establish class hierarchies
    - Create more specific versions of general classes

### Example 1: Basic Inheritance

```python
# Parent Class
class Animal:
    def __init__(self, name):
        self.name = name

    def speak(self):
        print(f"{self.name} makes a sound")

    def sleep(self):
        print(f"{self.name} is sleeping!")

# Child Class
class Dog:
    def speak(self):                        # Overwrite parent method
        print(f"{self.name} barks: Woof!")

class Car:
    def speak(self):
        print(f"{self.name} meows: Meow!")

dog = Dog("Buddy")
dog.speak() # Output: Buddy barks: Woof!

cat = Cat("Cactus")
cat.speak() # Output: Cactus meows: Meow!

dog.sleep() # Buddy is sleeping!(inherited method)
```

### Example 2: Multi-level Inheritance

```python
class Vehicle:
    def __init__(self, make, model):
        self.make = make
        self.model = model

    def display_info(self):
        print(f"{self.make}, {self.model}")

class Car(Vehicle):
    def __init__(self, make, model, doors):
        super().__init__(make, model) 
        self.doors = doors

    def display_info(self):
        super().display_info() # Call parent method
        print(f"{self.doors}")

class ElectricCar(Vehicle):
    def __init__(self, make, model, doors, battery_capacity):
        super().__init__(make, model, doors)
        self.battery_capacity = battery_capacity

    def display_info(self):
        super().display_info()
        print(f"{self.battery_capacity}")

tata = ElectricCar("Tata", "Harrier EV", 4, 120)
tata.display_info() # Output: Make: Tata, Model: Harrier EV, Doors; 4, Battery Capacity: 120
```

### Example 3: Using super() Function

```python
class Parent:
    def __init__(self, name):
        self.name = name

    def greet(self):
        print(f"Hello. I'm {self.name}")

class child:
    def __init__(self, name, age):
        super().__init__(name)
        self.age = age

    def greet(self):
        super().greet()
        print(f"I'm {self.age} years old")

child = Child("Siddhartha", 31)
child.greet()

# Output:
# Hello, I'm Siddhartha.
# I'm 31 years old
```

---

## 3. POLYMORPHISM

*Many forms* - Object of different classes can used interchangeably if they share a common interface.

### Purpose
    - Write flexible, reusable code
    - Use different classes with the same method names
    - Reduce code complexity.

### Example 1: Method Overriding (Runtime Polymorphism)

```python
class Shape:
    def __init__(self):
        pass
    
class Rectangle(Shape):
    def __init__(self, width, height):
        self.width = width
        self.height = height

    def area(self):
        print(f"Area: {self.width * self.height}")

class Circle(Shape):
    def __init__(self, radius):
        self.radius

    def area(self):
        print(f"Area: {3.14 * self.radius**2}")

# Polymorphism in action
shapes = [Rectangle(5, 10), Circle(7), Rectangle(4, 8)]

for shape in shapes:
    print(f"Area: {shape.area()}")

# Output:
# Area: 50
# Area: 153.86
# Area: 32
```

### Example 2: Duck Typing (Polymorphism without Inheritance)

```python
class Dog:
    def speak(self):
        print("Woof!")
    
class Duck:
    def speak(self):
        print("Quack!")

class Person:
    def speak(self):
        print("Hello!")

def make_sound(obj):
    obj.speak()

# All different classes, but same method
dog = Dog()
duck = Duck()
person = Person()

make_sound(dog)     # Output: Woof!.
make_sound(duck)    # Output: Quack! 
make_sound(person)  # Output: Hello!
```

### Example 3: Operator Overloading

```python
class Vector:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __add__(self, other):
        return Vector(self.x + other.x + self.y + other.y)

    def __str__(self):
        return f"({self.x}, {self.y})"

v1 = Vector(4, 7)
v2 = Vector(9, 2)
v3 = v1 + v2

print(v3)  # Output: (13, 9)
```

---

## 4. COMPOSITION

Creating complex objects by combining simpler objects (has a relationship)

### Purpose:
    - Build complex system from simple parts
    - More flexible than inheritance
    - Better code organization

### Example 1: Basic Composition

```python
class Engine:
    def __init__(self, horsepower):
        self.horsepower = horsepower

    def start(self):
        print(f"Engine Started: ({self.horsepower} HP)")

class Wheel:
    def __init__(self, size):
        self.size = size

class Car:
    def __init__(self, make, model, engine, wheels):
        self.make = make
        self.model = model
        self.engine = engine
        self.wheels = wheels

    def drive(self):
        self.engine.start()
        print(f"Driving {self.make}, {self.model}")

engine = Engine(200)
wheels = [Wheel(17), Wheel(17), Wheel(17), Wheel(17)]

car = Car("Toyota", "Camry", engine, wheels)
car.drive()

# Output:
# Engine started (200 HP)
# Driving Toyota Camry
```

### Example 2: Complex Composition

```python
class Address:
    def __init__(self, street, city, zip_code):
        self.street = street
        self.city = city
        self.zip_code = zip_code

    def display(self):
        print(f"{self.street}, {self.city}, {self.zip_code}")

class Person:
    def __init__(self, name, address):
        self.name = name
        self.address = address

    def show_info(self):
        print(f"Name: {self.name}")
        self.address.display()

address = Address("Bourbon St", "Kolkata", 700086)
person = Person("Siddhartha", address)
person.show_info()

# Output
# Name: Siddharth
# Bourbon St, Kolkata, 700086
```

### Example 3: Composition vs Inheritance

```python
# Not Ideal - Inheritance
class Bird:
    def fly(self):
        return "Flying"
    
class Penguin(Bird):
    def fly(self):
        return "Cannot Fly" # Penguins don't fly

# Better - Composition
class Wing:
    def fly(self):
        return "Flying"

class Penguin:
    def __init__(self, name):
        self.name = same
    
    def move(self):
        return "Swimming"

penguin = Penguin("Pingu")
print(penguin.move())  # Output: Swimming
```

---

## Advance Concepts

### Abstract Classes and Intefaces

Abstract classes define a template for subclass but cannot be instantiated directly.

```python
from abs import ABC, abstractmethod

class Animal(ABC): # Abstract base Class
    @abstractmethod
    def speak(self):
        pass

    @abstractmethod
    def move(self):
        pass

class Dog(Animal):
    def speak(self):
        return "Woof!"

    def move(self):
        return "Running on four legs"

# animal = Animal() # Error: Can't instantiate abstract class
dog = Dog()
print(dog.speak())  # Output: Woof!
print(dog.move()) # Output: Running on four legs
```

### Static Methods and Class Methods

```python
class MathUtils:
    PI = 3.14 # Class variable

    @staticmethod
    def add(a, b):
        return a + b

    @classmethod
    def create_from_string(cls, value):
        return cls()

    def multiply(self, a, b):
        return a*b

#Static Method (no instance needed)
print(MathUtils.add(5, 10)) # Output: 15

#Instance method
utils = MathUtils()
print(utils.multiply(5, 10)) # Output: 50
```

### Properties and Decorators

```python
class Temperature:
    def __init__(self, celcius):
        self._celcius = celcius

    @property
    def celcius(self):
        return {self._celcius} * 9/5 +32

    @celcius.setter
    def celcius(self, value):
        if value < -273.15:
            print("Temperature cannot be below absolute zero!")
        else:
            self._celcius = value

temp = Temperature(25) 
print(temp.celcius)    # Output: 25
print(temp.fahrenheit) # Output: 77.0
temp.celcius = 30
print(temp.celcius)   # Output: 30
```
# OOPs-Object-Oriented-Programming-
