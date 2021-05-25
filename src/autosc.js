const express = require('express');
const router = express.Router();
const Web3 = require('web3');
const contract = require('truffle-contract');
const artifacts = require('../build/contracts/AutoSC.json');

if (typeof web3 !== 'undefined') {
    var web3 = new Web3(web3.currentProvider)
  } else {
    var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))
}
const AutoSC = contract(artifacts)
AutoSC.setProvider(web3.currentProvider)



router.get("/", (req, res) => {
	res.send("Connected to AutoSC services");
});

router.post('/registerManufacturer', async (req,res)=>{
        
    const accounts = await web3.eth.getAccounts();
    const autosc = await AutoSC.deployed();

    let entityaddress = req.body.entityaddress;
    if(entityaddress == null) {
        autosc.addManufacturer(accounts[1], {from: accounts[0]})
            .then(result =>{
                console.log(result);
                res.json({"status":"manufacturer reisgtered successfully!!", result})
            })
            .catch(err=>{
                res.status(500).json({"status":"Failed", "reason":"error occured during registeation"})
            })
    }
    else {
        autosc.addManufacturer(entityaddress, {from: accounts[0]})
            .then(result =>{
                console.log(result);
                res.json({"status":"manufacturer reisgtered successfully!!", result})
            })
            .catch(err=>{
                res.status(500).json({"status":"Failed", "reason":"error occured during registeation"})
            })
    }
  })
  
  router.post('/registerDealer', async (req,res)=>{
    
    const accounts = await web3.eth.getAccounts();
    const autosc = await AutoSC.deployed();

    let entityaddress = req.body.entityaddress;
    if(entityaddress == null) {
        autosc.addDealer(accounts[2], {from: accounts[0]})
            .then(result =>{
                console.log(result);
                res.json({"status":"dealer reisgtered successfully!!", result})
            })
            .catch(err=>{
                res.status(500).json({"status":"Failed", "reason":"error occured during registeation"})
            })
    }
    else{
        autosc.addDealer(entityaddress, {from: accounts[0]})
            .then(result =>{
                console.log(result);
                res.json({"status":"dealer reisgtered successfully!!", result})
            })
            .catch(err=>{
                res.status(500).json({"status":"Failed", "reason":"error occured during registeation"})
            })
    }
  })
  
  router.post('/registerCustomer', async (req,res)=>{
    
    const accounts = await web3.eth.getAccounts();
    const autosc = await AutoSC.deployed();

    let entityaddress = req.body.entityaddress;

    if(entityaddress == null) {
        autosc.addCustomer(accounts[3], {from: accounts[0]})
            .then(result =>{
                console.log(result);
                res.json({"status":"customer reisgtered successfully!!", result})
            })
            .catch(err=>{
                res.status(500).json({"status":"Failed", "reason":"error occured during registeation"})
            })
    }
    else {
        autosc.addCustomer(entityaddress, {from: accounts[0]})
            .then(result =>{
                console.log(result);

                res.json({"status":"customer reisgtered successfully!!", result})
            })
            .catch(err=>{
                res.status(500).json({"status":"Failed", "reason":"error occured during registeation"})
            })
    }
  })
  
  router.post('/createCar', async (req,res)=>{
    let vin = req.body.vin
    let serialNumber = req.body.serialNumber
    let price = Number(req.body.price);
  
    const accounts = await web3.eth.getAccounts();
    const autosc = await AutoSC.deployed();

    autosc.makeCar(vin, serialNumber, price, {from: accounts[1]})
    .then(result => {
        console.log(result);
        res.json({"status":"Car manufactured successfully!!", result})
    })
    .catch(err=>{
        res.status(500).json({"status":"Failed", "reason":"error occured during createcar call"})
    })
        
  })

  router.post('/carReadyForSale', async (req,res)=>{
    let vin = req.body.vin
  
    const accounts = await web3.eth.getAccounts();
    const autosc = await AutoSC.deployed();

    autosc.carReadyForSale(vin, {from: accounts[2]})
    .then(result => {
        console.log(result);
        res.json({"status":"Car is ready for sale", result})
    })
    .catch(err=>{
        res.status(500).json({"status":"Failed", "reason":"error occured during carReadyForSale call"})
    })
        
  })

  router.post('/carSold', async (req,res)=>{
    let vin = req.body.vin
  
    const accounts = await web3.eth.getAccounts();
    const autosc = await AutoSC.deployed();

    autosc.carSold(vin, accounts[3], {from: accounts[2]})
    .then(result => {
        console.log(result);
        res.json({"status":"Car sold successfully!!", result})
    })
    .catch(err=>{
        res.status(500).json({"status":"Failed", "reason":"error occured during carSold call"})
    })
        
  })
  
  router.get('/carDetails', async (req,res)=>{
    let vin = req.query.vin

    console.log(req.query)
    const autosc = await AutoSC.deployed();

    autosc.fetchCarDetails(vin)
    .then(result => {
        console.log(result);
        res.json({"status":"success", result: result })
    })
    .catch(err=>{
        res.status(500).json({"status":"Failed", "reason":"error occured while fetching car details"})
    })     
  })

module.exports = router;