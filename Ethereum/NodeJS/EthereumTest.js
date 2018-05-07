const fs = require('fs');
const solc = require('solc');
const Web3 = require('web3');

// Connect to local Ethereum node
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));

// Compile the smart contract source code
var input = fs.readFileSync('MySupplyChain.sol');
var output = solc.compile(input.toString(), 1);
var bytecode = output.contracts[':SupplyChain'].bytecode;
var abi = JSON.parse(output.contracts[':SupplyChain'].interface);

var SupplyChainContract = web3.eth.contract(abi);

web3.eth.defaultAccount = web3.eth.accounts[0];

var contractInstance = SupplyChainContract.new({
    data: '0x' + bytecode,
    from: web3.eth.coinbase,
    gas: 408050
}, (err, res) => {
    if (err) {
        console.log(err);
        return;
    }

    // Log the tx, you can explore status with eth.getTransaction()
    console.log(res.transactionHash);

    // If we have an address property, the contract was deployed
    if (res.address) {
        console.log('Contract address: ' + res.address);
        //SupplyChain = SupplyChainContract.at(res.address);
        runEthereumBatch(500,res.address);
    }
});


function runEthereumBatch(batchSize,contractAddress) {
    var numTrans = batchSize;
    var numComplete = 0;
    var SupplyChain = SupplyChainContract.at(contractAddress);
    
    var start = new Date();
    console.log("Start time for "+ numTrans + " inserts: " + start);
    while(numComplete < numTrans){                
        var prodName = "TestProduct" + numComplete;
        SupplyChain.registerProduct(numComplete, prodName, { gas: 214642 });
        numComplete++;
    }
    var finish = (new Date() - start)/1000.0
    console.log("Finish in seconds for "+ numTrans + " inserts: " + finish);
}
