pragma solidity ^0.4.18;

contract SupplyChain{
    
    struct Product {
        string productName;
        uint productID;
    }
    
    mapping (uint => Product) products;
    uint[] public productAccts;
    
    function registerProduct(uint _productID, string _productName) public {
        var product = products[_productID];
        
        product.productName = _productName;
        product.productID = _productID;
        
        productAccts.push(_productID);
    }
    
    function getProducts() view public returns (uint[]) {
        return productAccts;
    }
    
    function getProduct(uint ins) view public returns (uint, string) {
        return (products[ins].productID, products[ins].productName);
    }
    
    function countProducts() view public returns (uint) {
        return productAccts.length;
    }
}