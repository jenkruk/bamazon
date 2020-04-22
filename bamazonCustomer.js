var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");

// instantiate
var table = new Table({
  head: ['Product Number', 'Item', "Department", "Price", "Quantity Available"]
});

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "bamazon_DB"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
  displayTable();
  });

  function displayTable(){
     //Select all products and return the result object:
  connection.query("SELECT * FROM products", function (err, result) {
    if (err) throw err;
    // console.log(result);
    for(var i = 0; i<result.length; i++ ){
      var row = result[i];
      row = Object.values(row);
      table.push(row);
    }
    console.log(table.toString() + "\n");
    placeOrder();
   });
  }

   function placeOrder() {
    inquirer
      .prompt([{
        name: "item",
        type: "number",
        message: "What is the product number for the item you would like to buy? \n", 
      },
      {
        name: "amount",
        type: "number",
        message: "How many of this item would you like to order? \n"
      }])
      .then(function(answer) {
        //console.log(answer); 
        var item = answer.item;
        var userQty = answer.amount;
        connection.query("SELECT * FROM products WHERE item_id = " + item, function (err, result) {
          if (err) throw err;
          //console.log(result);
          if (result.length === 0) {
            console.log ("\nThat product number does not exist\n");
          } else {
          var price = result[0].price;
          var quantity = result[0].stock_quantity;
          var userItem = result[0].product_name;
          //console.log(price, quantity);
          if(userQty<=quantity){
            console.log("\nThank you for your order of (" + userQty + ") " + userItem + ".\n");
            console.log("Your order total is: $", price * userQty + "\n");

            var query = "UPDATE products SET stock_quantity = stock_quantity - " + userQty + " WHERE item_id = " + item;
            // console.log(query);

            connection.query(query, function (err, result) {
              if(err) throw err;
              // console.log("Quantity updated.");

          inquirer
          .prompt([{
          name: "continue",
          type: "confirm",
          message: "Would you like to place another order? \n" 
          }])
          .then(function(answer){
            if(answer.continue){
              displayTable();
            } else {
              console.log("\nThank you for your order! See you next time!");
            }
          })
            });
          } else {
            console.log("\nYou have chosen a quantity greater than what we have available.");
          }
          }
        });
     }); 
   
    }; //end placeorder function