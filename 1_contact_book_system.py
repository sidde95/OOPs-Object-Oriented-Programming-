# Project 1: Contact Book System (Beginner Level)
# Topics Covered: Classes, Objects, Lists, Methods

# List of Items in the program
# 1. contact: name, email, phone_number
# 2. Add more contacts and search for a contact by name and delete a contact by name.

class Contact:
    def __init__(self, name, email, phone_number):
        self.name = name
        self.email = email
        self.phone_number = phone_number

    def show_info(self):
        print(f"Name: {self.name} | Email: {self.email} | Phone Number: {self.phone_number}")

class ContactBook:
    def __init__(self):
        self.contacts = []

    def add_contact(self, contact):
        self.contacts.append(contact)

    def search_contact(self, name):
        for contact in self.contacts:
            if contact.name == name:
                return contact
            else:
                return "Contact not found."
    
    def delete_contact(self, name):
        self.name = name
        for contacts in self.contacts: 
            if contacts.name == name: 
                self.contacts.remove(contacts) 
                return f"Contact {name} deleted successfully."
        return "Cannot find contact to delete."
    
    def show_all(self):
        for contact in self.contacts:
            contact.show_info()
            

# Example Usage
contact_book = ContactBook()
contact_book.add_contact(Contact("Siddhartha", "roy.siddhartha45@gmail.com", "9831995685"))
contact_book.add_contact(Contact("John Doe", "john.doe@example.com", "1234567890"))
contact_book.add_contact(Contact("Jane Smith", "jane.smith@example.com", "0987654321"))
contact_book.add_contact(Contact("Alice Johnson", "alice.johnson@example.com", "5678901234"))

# Show all contacts
print(contact_book.show_all())

# Search for a contact
print(contact_book.search_contact("Siddhartha").show_info())