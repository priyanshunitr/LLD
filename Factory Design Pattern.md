# 1. WITHOUT FACTORY PATTERN

## Problem:

The client (main) is responsible for deciding which object to create.

```cpp
#include <iostream>
using namespace std;

// -------------------------
// Abstract Base Class
// -------------------------
class Vehicle {
public:
    // Pure virtual functions
    virtual void start() = 0;
    virtual void stop() = 0;

    // Virtual destructor
    virtual ~Vehicle() {}
};

// -------------------------
// Car Class
// -------------------------
class Car : public Vehicle {
public:
    void start() override {
        cout << "Car is starting..." << endl;
    }

    void stop() override {
        cout << "Car is stopping..." << endl;
    }
};

// -------------------------
// Truck Class
// -------------------------
class Truck : public Vehicle {
public:
    void start() override {
        cout << "Truck is starting..." << endl;
    }

    void stop() override {
        cout << "Truck is stopping..." << endl;
    }
};

// -------------------------
// Bike Class
// -------------------------
class Bike : public Vehicle {
public:
    void start() override {
        cout << "Bike is starting..." << endl;
    }

    void stop() override {
        cout << "Bike is stopping..." <<endl;
    }
};

int main() {

    string choice;
    cout << "Enter Vehicle (Car/Truck/Bike): ";
    cin >> choice;

    Vehicle* vehicle = nullptr;

    // Client decides which object to create
    if(choice == "Car")
    {
        vehicle = new Car();
    }
    else if(choice == "Truck")
    {
        vehicle = new Truck();
    }
    else if(choice == "Bike")
    {
        vehicle = new Bike();
    }
    else
    {
        cout << "Invalid Vehicle" << endl;
        return 0;
    }

    vehicle->start();
    vehicle->stop();

    delete vehicle;

    return 0;
}
```

## Flow

```text
main()
   |
   |---- if Car
   |         |
   |         ---> new Car()
   |
   |---- if Truck
   |         |
   |         ---> new Truck()
   |
   |---- if Bike
             |
             ---> new Bike()
```

Notice that `main()` knows about every concrete class.

If tomorrow you add

- Bus
- Auto
- Van
- Scooter

`main()` must change.

## Problems with this approach

Imagine your project has

- Main.cpp
- Payment.cpp
- Admin.cpp
- Driver.cpp
- Booking.cpp

All of them create vehicles.

Each file contains

```cpp
if(type=="Car")
    vehicle = new Car();

else if(type=="Truck")
    vehicle = new Truck();

else if(type=="Bike")
    vehicle = new Bike();
```

Now suppose you add

`Bus`

You must modify every file.

This violates the Open-Closed Principle.

# 2. WITH FACTORY PATTERN

Now let's move the creation logic into a separate class.

```cpp
#include <iostream>
using namespace std;

// -------------------------
// Abstract Base Class
// -------------------------
class Vehicle {
public:

    virtual void start() = 0;
    virtual void stop() = 0;

    virtual ~Vehicle() {}
};

// -------------------------
// Car Class
// -------------------------
class Car : public Vehicle {
public:

    void start() override {
        cout << "Car is starting..." << endl;
    }

    void stop() override {
        cout << "Car is stopping..." << endl;
    }
};

// -------------------------
// Truck Class
// -------------------------
class Truck : public Vehicle {
public:

    void start() override {
        cout << "Truck is starting..." << endl;
    }

    void stop() override {
        cout << "Truck is stopping..." << endl;
    }
};

// -------------------------
// Bike Class
// -------------------------
class Bike : public Vehicle {
public:

    void start() override {
        cout << "Bike is starting..." << endl;
    }

    void stop() override {
        cout << "Bike is stopping..." << endl;
    }
};

// ======================================================
// Factory Class
// ======================================================

class VehicleFactory {

public:

    // Static because we don't need an object
    static Vehicle* getVehicle(string type)
    {
        if(type == "Car")
            return new Car();

        else if(type == "Truck")
            return new Truck();

        else if(type == "Bike")
            return new Bike();

        else
            return nullptr;
    }
};

int main()
{
    string choice;

    cout << "Enter Vehicle (Car/Truck/Bike): ";
    cin >> choice;

    // Ask the factory to create the object
    Vehicle* vehicle = VehicleFactory::getVehicle(choice);

    if(vehicle == nullptr)
    {
        cout << "Invalid Vehicle";
        return 0;
    }

    vehicle->start();
    vehicle->stop();

    delete vehicle;

    return 0;
}
```

## Flow

```text
main()
   |
   |
   |------ VehicleFactory::getVehicle()
                     |
                     |
         -------------------------
         |          |            |
       Car       Truck        Bike
         |          |            |
         -------------------------
                     |
                 Returns Vehicle*
```

Now `main()` doesn't know which class is being created.

It simply asks

> "Factory, give me a Vehicle."

# Difference

## Without Factory

Main

```cpp
if(Car)
    new Car()

else if(Truck)
    new Truck()

else if(Bike)
    new Bike()
```

Main is responsible for object creation.

## With Factory

Main

```cpp
VehicleFactory::getVehicle(type)
```

Object creation is delegated to the factory.

## If we add a Bus class

### Without Factory

```text
Main.cpp          âŒ Change
Payment.cpp       âŒ Change
Booking.cpp       âŒ Change
Driver.cpp        âŒ Change
Admin.cpp         âŒ Change
```

Five files change.

### With Factory

Only this file changes:

```cpp
class Bus : public Vehicle
{
    ...
};
```

and

```cpp
static Vehicle* getVehicle(string type)
{
    if(type == "Car")
        return new Car();

    else if(type == "Truck")
        return new Truck();

    else if(type == "Bike")
        return new Bike();

    else if(type == "Bus")
        return new Bus();      // Only new line

    return nullptr;
}
```

Everything else remains exactly the same.

# Visual Comparison

## WITHOUT FACTORY

```text
================

            Main
              |
     -------------------
     |        |        |
   new Car  new Bike new Truck
```

## WITH FACTORY

```text
=============

             Main
               |
               |
      VehicleFactory
               |
      ------------------
      |       |        |
    Car     Bike     Truck
```

# Key Takeaways (Interview Notes)

| Without Factory | With Factory |
| --- | --- |
| Client creates objects | Factory creates objects |
| Client knows all concrete classes | Client only knows the interface (Vehicle) |
| Object creation logic is duplicated | Creation logic is centralized |
| Hard to maintain | Easy to maintain |
| Violates Open-Closed Principle as the application grows | Easier to extend by modifying one place |
| Tightly coupled | Loosely coupled |

> **One modern C++ improvement:** In production code, you'd typically return `std::unique_ptr<Vehicle>` from the factory instead of a raw `Vehicle*`. That removes the need for manual `delete` and makes ownership of the object explicit and safer.
