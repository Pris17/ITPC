// This script is designed to test the solidity smart contract - SuppyChain.sol -- and the various functions within
// Declare a variable and assign the compiled smart contract artifact
const AutoSC = artifacts.require('AutoSC');
const truffleAssert = require('truffle-assertions');

contract('AutoSC', async accounts => {
    // Declare few constants and assign a few sample accounts generated by ganache-cli

    const vin = "VIN01";
    const serial_number = "AZYRFD";
    const price = 1000000;
    const ownerID = accounts[0];
    const manufacturerId = accounts[1];
    const dealerId = accounts[2];
    const customerId = accounts[3];
    let carState = 0;


    console.log("ganache-cli accounts used here...");
    console.log("Contract Owner: accounts[0] ", accounts[0]);
    console.log("Manufacturer: accounts[1] ", accounts[1]);
    console.log("Dealer: accounts[2] ", accounts[2]);
    console.log("Customer: accounts[3] ", accounts[3]);


    it("init", async () => {
        const autosc = await AutoSC.deployed(); 
        autosc.addManufacturer(manufacturerId);
        autosc.addDealer(dealerId);
        autosc.addCustomer(customerId);
    });

    // 1st Test
    it("Testing smart contract function makeCar() that allows a manufacturer to create car", async () => {
        const autosc = await AutoSC.deployed();
        // Mark an item as Harvested by calling function harvestItem()
        let tx = await autosc.makeCar(vin, serial_number, price, {from: manufacturerId});
        truffleAssert.eventEmitted(tx, 'CarManufactured');
        // Retrieve the just now saved item from blockchain by calling function fetchItem()
        const fetchCarDetails = await autosc.fetchCarDetails.call(vin);
        // Verify the result set
        assert.equal(fetchCarDetails[0], vin, 'Error: Invalid VIN');
        assert.equal(fetchCarDetails[1], serial_number, 'Error: Invalid serial number');
        assert.equal(fetchCarDetails[2], price, 'Error: Invalid cost')
        assert.equal(fetchCarDetails[3], manufacturerId, 'Error: Invalid asset owner');
        assert.equal(fetchCarDetails[4], manufacturerId, 'Error: Invalid manufacturer');
        assert.equal(fetchCarDetails[7], 0, 'Error: Invalid car status');
    });

    // 2nd Test
    it("Testing smart contract function carReadyForSale() that allows a dealer to have car ready for sale", async () => {
        const autosc = await AutoSC.deployed();
        // Mark an item as Harvested by calling function harvestItem()
        let tx = await autosc.carReadyForSale(vin, {from: dealerId});
        truffleAssert.eventEmitted(tx, 'CarReadyForSale');
        // Retrieve the just now saved item from blockchain by calling function fetchItem()
        const fetchCarDetails = await autosc.fetchCarDetails.call(vin);
        // Verify the result set
        assert.equal(fetchCarDetails[0], vin, 'Error: Invalid VIN');
        assert.equal(fetchCarDetails[1], serial_number, 'Error: Invalid serial number');
        assert.equal(fetchCarDetails[2], price, 'Error: Invalid cost')
        assert.equal(fetchCarDetails[3], dealerId, 'Error: Invalid asset owner');
        assert.equal(fetchCarDetails[4], manufacturerId, 'Error: Invalid manufacturer');
        assert.equal(fetchCarDetails[5], dealerId, 'Error: Invalid dealer');
        assert.equal(fetchCarDetails[7], 1, 'Error: Invalid car status');
    });

    // 3rd Test
    it("Testing smart contract function carSold() that allows a manufacturer to create car", async () => {
        const autosc = await AutoSC.deployed();
        // Mark an item as Harvested by calling function harvestItem()
        let tx = await autosc.carSold(vin, customerId, {from: dealerId});
        truffleAssert.eventEmitted(tx, 'CarSold');
        // Retrieve the just now saved item from blockchain by calling function fetchItem()
        const fetchCarDetails = await autosc.fetchCarDetails.call(vin);
        // Verify the result set
        assert.equal(fetchCarDetails[0], vin, 'Error: Invalid VIN');
        assert.equal(fetchCarDetails[1], serial_number, 'Error: Invalid serial number');
        assert.equal(fetchCarDetails[2], price, 'Error: Invalid cost')
        assert.equal(fetchCarDetails[3], customerId, 'Error: Invalid asset owner');
        assert.equal(fetchCarDetails[4], manufacturerId, 'Error: Invalid manufacturer');
        assert.equal(fetchCarDetails[5], dealerId, 'Error: Invalid dealer');
        assert.equal(fetchCarDetails[6], customerId, 'Error: Invalid dealer')
        assert.equal(fetchCarDetails[7], 2, 'Error: Invalid car status');
    });
});