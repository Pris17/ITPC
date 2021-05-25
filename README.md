# ITPC

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. 

### Prerequisites

Please make sure you've already installed ganache-cli and Truffle

### Installing

A step by step series of commands that will help you set a development env running

Clone this repository:
```
git clone https://github.com/Pris17/ITPC.git
```

Change directory to ```ITPC``` folder and install all requisite npm packages (as listed in ```package.json```):

```
cd ITPC
npm install
```

Launch Ganache:
```
ganache-cli
```

In a separate terminal window, again change directory to ```ITPC``` folder and compile smart contracts:

```
truffle compile
```

This will create the smart contract artifacts in folder ```build\contracts```.

Migrate smart contracts to the locally running blockchain, ganache-cli:

```
truffle migrate
```

Test smart contracts:

```
truffle test
```

All 4 tests should pass.

In a separate terminal window, again change directory to ```ITPC``` folder and start the services:

```
npm start
```

Services will start on port ```8082```

Once the services are started, request you to first register Manufacturer, Dealer and Customer using below API endpoint.
All are POST method with an option to pass the ethereum address account to be registered as one of the entity. For simplicity, I have passed accounts from ganache. So you don't need to pass any account for testing.
```
http://localhost:8082/autosc/registerManufacturer
http://localhost:8082/autosc/registerDealer
http://localhost:8082/autosc/registerCustomer
```

Once the accounts are registered to specific role, you can proceed interacting with other APIs for creating a car by manufacturer or selling a car by dealer.

```Note: In order to finish the test on time, I haven't considered intermediary steps of automotive supply chain. There are only 3 states of car here.```

## Authors
Priya Shah
