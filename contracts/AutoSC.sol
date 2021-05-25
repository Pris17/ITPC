// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.5.0 < 0.8.4;

import "./accesscontrol/CustomerRole.sol";
import "./accesscontrol/DealerRole.sol";
import "./accesscontrol/ManufacturerRole.sol";

contract AutoSC is CustomerRole, DealerRole, ManufacturerRole {

    // Define 'owner'
    address owner;

    enum State { CREATED, READY_FOR_SALE, SOLD }
    
    struct Car {
        string vin;
        string serial_number;
        uint price;
        address ownerId;
        address manufacturerId;
        address dealerId;
        address customerId;
        State status;
    }
    
    mapping(string => Car) public cars;

    // Define events
    event CarManufactured(string vin);
    event CarReadyForSale(string vin);
    event CarSold(string vin);
    event Error(string vin);

    // Define a modifer that checks to see if msg.sender == owner of the contract
    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    // Define a modifer that verifies the Caller
    modifier verifyCaller(address _address) {
        require(msg.sender == _address);
        _;
    }

    // Define a modifier that checks if an status of a car is CREATED
    modifier created(string memory _vin) {
        require(cars[_vin].status == State.CREATED);
        _;
    }

    // Define a modifier that checks if an status of a car is READY_FOR_SALE
    modifier readyForSale(string memory _vin) {
        require(cars[_vin].status == State.READY_FOR_SALE);
        _;
    }

    // Define a modifier that checks if an status of a car is SOLD
    modifier sold(string memory _vin) {
        require(cars[_vin].status == State.SOLD);
        _;
    }

    constructor() public {
        owner = msg.sender;
    }

    function _getCar(string memory _vin) private view returns (Car memory) {
        Car memory car = cars[_vin];
        return car;
    }

    // Add car details once it is manufactured
    function makeCar(string memory _vin, string memory _serialNumber, uint _price) public onlyManufacturer{
        Car memory car = _getCar(_vin);
        car.vin = _vin;
        car.serial_number = _serialNumber;
        car.price = uint(_price);
        car.ownerId = msg.sender;
        car.manufacturerId = msg.sender;
        car.status = State.CREATED;
        cars[_vin] = car;
        // Emit the appropriate event
        emit CarManufactured(_vin);  
    }

    //Update car details once it is ready for sale
    function carReadyForSale(string memory _vin) public created(_vin) onlyDealer {
        // Update the appropriate fields
        Car memory car = _getCar(_vin);
        car.ownerId = msg.sender;
        car.dealerId = msg.sender;
        car.status = State.READY_FOR_SALE;
        cars[_vin] = car;
        // emit the appropriate event
        emit CarReadyForSale(_vin);
    }

    //Update car details once it is sold
    function carSold(string memory _vin, address _customerId) public readyForSale(_vin) onlyDealer{
        
        if(isCustomer(_customerId)) {
            // Update the appropriate fields
            Car memory car = _getCar(_vin);
            car.ownerId = _customerId;
            car.customerId = _customerId;
            car.status = State.SOLD;
            cars[_vin] = car;
            // emit the appropriate event
            emit CarSold(_vin);
        } 
        else{
            emit Error(_vin);
        }
    }

    // Define a function 'fetchCarDetails' that fetches the car data
    function fetchCarDetails(string memory _vin) public view returns
    (
        string memory vin,
        string memory serial_number,
        uint price,
        address ownerId,
        address manufacturerId,
        address dealerId,
        address customerId,
        uint status
    )
    {
        Car memory car = _getCar(_vin);
        vin = car.vin;
        serial_number = car.serial_number;
        price = uint(car.price);
        ownerId = car.ownerId;
        manufacturerId = car.manufacturerId;
        dealerId = car.dealerId;
        customerId = car.customerId;
        status = uint(car.status);

        return
        (
        vin,
        serial_number,
        price,
        ownerId,
        manufacturerId,
        dealerId,
        customerId,
        status
        );
    }
}