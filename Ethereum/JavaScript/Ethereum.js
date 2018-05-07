var SupplyChain;

function setupEthereum(){  
    if (typeof web3 !== 'undefined') {
        web3 = new Web3(web3.currentProvider);
    } else {
        // set the provider you want from Web3.providers
        web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
    }

    web3.eth.defaultAccount = web3.eth.accounts[0];

    //ABI
    var SupplyChainContract = web3.eth.contract([
    {
    "constant": true,
    "inputs": [
        {
            "name": "",
            "type": "uint256"
        }
    ],
    "name": "productAccts",
    "outputs": [
        {
            "name": "",
            "type": "uint256"
        }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
    },
    {
    "constant": true,
    "inputs": [
        {
            "name": "ins",
            "type": "uint256"
        }
    ],
    "name": "getProduct",
    "outputs": [
        {
            "name": "",
            "type": "uint256"
        },
        {
            "name": "",
            "type": "string"
        }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
    },
    {
    "constant": false,
    "inputs": [
        {
            "name": "_productID",
            "type": "uint256"
        },
        {
            "name": "_productName",
            "type": "string"
        }
    ],
    "name": "registerProduct",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
    },
    {
    "constant": true,
    "inputs": [],
    "name": "getProducts",
    "outputs": [
        {
            "name": "",
            "type": "uint256[]"
        }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
    },
    {
    "constant": true,
    "inputs": [],
    "name": "countProducts",
    "outputs": [
        {
            "name": "",
            "type": "uint256"
        }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
    }
    ]);

    SupplyChain = SupplyChainContract.at('0xafb7c1219fee1993e97749a21a61be2bd93014c7');
    console.log(SupplyChain);

}

/*var estimatedGas = web3.eth.estimateGas({
    to: "0xcf8A37Aad07E384708A374042725c8B2FD4FC660", 
    data: "0xc6888fa10000000000000000000000000000000000000000000000000000000000000003"
});
console.log(estimatedGas);*/


function addProduct(ID,Name){
    SupplyChain.registerProduct(ID,Name, { gas: 214642 });
}

function getProduct(ID) {
    alert(SupplyChain.countProducts());
    SupplyChain.getProduct(ID,function(error, result){
        if(!error)
            {
                return ("Product ID: " + result[0]+' ('+result[1]+')');
                console.log(result);
            }
        else
            console.error(error);
    });    
}

function runEthereumBatch(batchSize) {
    var numTrans = batchSize;
    var numComplete = 0;
    
    var start = new Date();
    console.log("Start time for "+ numTrans + " writes: " + start);
    while(numComplete < numTrans){                
        var prodName = "TestProduct" + numComplete;
        SupplyChain.registerProduct(numComplete,prodName, { gas: 214642 });
        numComplete++;
    }
    finish = (new Date() - start)/1000.0
    console.log("Finish in seconds for "+ numTrans + " writes: " + finish);
}
