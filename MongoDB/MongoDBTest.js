var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/MySupplyChain";

var minDate = new Date(2012, 0, 1, 0, 0, 0, 0);
var maxDate = new Date(2013, 0, 1, 0, 0, 0, 0);
var delta = maxDate.getTime() - minDate.getTime();
 
var job_id = 1;
 
var batchSize = 500;
var batchNumber = 5 * 1000;
var start = new Date();
 
var batchDocuments = new Array();
var index = 0;

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Database created!");
    var dbo = db.db("MySupplyChain")
    //create a collection "products" in the "MySupplyChain" database on MongoDB
    dbo.createCollection("products", function(err, res) {
        if (err) throw err;
        console.log("Collection created!");
        db.close();
    });
    //Run 10 tests for each batch
    for(i = 0; i < 10; i++){
        var tsstart = Math.round((new Date()).getTime() / 1000);
        console.log('Job#' + job_id + ' started:  ' + tsstart);
        var start = new Date();
        //insert documents according to the size of the batch (e.g; 1,10,25,100,etc.)
        for(x = 0; x < batchSize; x++) {
            var document = {        
                productID : x,
                productName : "product" + x
            };
            batchDocuments[x % batchSize] = document;
            if((x + 1) % batchSize == 0) {
                dbo.collection("products").insertMany(batchDocuments);
            }
        }
        console.log('Job#' + job_id + ' inserted ' + batchSize + ' in ' + (new Date() - start)/1000.0 + 's');
        var tsfinish = Math.round((new Date()).getTime() / 1000);
        console.log('Job#' + job_id + ' finished:  ' + tsfinish);
        job_id = job_id + 1;
        //Delete (clear) all records from the database for next test.
        myquery = { productName: /^product/ };
        dbo.collection("products").deleteMany(myquery, function(err, obj) {
            if (err) throw err;
            console.log(obj.result.n + "document(s) deleted");
            db.close();
          });
    }
    db.close();
});

//https://www.w3schools.com/nodejs/nodejs_mongodb.asp
//https://vladmihalcea.com/mongodb-facts-80000-insertssecond-on-commodity-hardware/