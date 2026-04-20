# Vehicle Rental System (Inrtermediate)
# Topics Covered: Classes, Inheritance, Composition, Lists

# List of Items in the program
# 1. vechicles (vehicle_id, make, model) # available = true
# 2. Car(doors)
# 3. Bike(engine_cc)
# 4. Rental (customer_name, vehicle) # available = False | return vehicle #vehicle_is_avialable
# 5. RentalService (add_vehicle, rent_vehicle, show_available_vehicles)


class Vehicle:
    def __init__(self, vehicle_id, make, model):
        self.vehicle_id = vehicle_id
        self.make = make
        self.model = model
        self.available = True


class Car(Vehicle):
    def __init__(self, vehicle_id, make, model, doors):
        super().__init__(vehicle_id, make, model)
        self.doors = doors

class Bike(Vehicle):
    def __init__(self, vehicle_id, make, model, engine_cc):
        super().__init__(vehicle_id, make, model)
        self.engine_cc = engine_cc

class Rental:
    def __init__(self, customer_name, vehicle):
        self.customer_name = customer_name
        self.vehicle = vehicle
        self.vehicle.available = False

    def return_vehicle(self):
        self.vehicle.available = True
        return f"Vehicle {self.vehicle.make} {self.vehicle.model} returned successfully."
    

class RentalService:
    def __init__(self):
        self.vehicles = []
        self.rentals = []

    def add_vehicle(self, vehicle):
        self.vehicles.append(vehicle)

    def rent_vehicle(self, customer_name, vehicle_id):
        for vehicle in self.vehicles:
            if vehicle.vehicle_id == vehicle_id and vehicle.available:
                rental = Rental(customer_name, vehicle)
                self.rentals.append(rental)
                return f"Vehicle {vehicle.make} {vehicle.model} rented to {customer_name}."
        return "Vehicle not available for rent."
    
    def show_available_vehicles(self):
        available_vehicles = [vehicles for vehicles in self.vehicles if vehicles.available]
        return f"Available Vehicles: {[f'{vehicle.make} {vehicle.model}' for vehicle in available_vehicles]}"
    


# Example Usage
rental_service = RentalService()
rental_service.add_vehicle(Car(1, "Toyota", "Camry", 4))
rental_service.add_vehicle(Bike(2, "Honda", "CBR500R", 500))       

print(rental_service.show_available_vehicles())
print(rental_service.rent_vehicle("Siddhartha", 2))
print(rental_service.show_available_vehicles())
print(rental_service.rentals[0].return_vehicle())
print(rental_service.show_available_vehicles())