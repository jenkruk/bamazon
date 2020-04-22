var mysql = require("mysql");
var inquirer = require("inquirer");

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
  //Select all products and return the result object:
  connection.query("SELECT * FROM products", function (err, result) {
    if (err) throw err;
    console.log(result);

    // ----------------------------------------------------------------------------------- 

    function placeOrder() {
      inquirer
        .prompt({
          name: "action",
          type: "list",
          message: "What is the item id for the product you would like to buy?",
          choices: [
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            10
          ]
        })
        .then(function(answer) {
          switch (answer.action) {
          case 1:
            console.log("You are ordering: Toilet Paper")
            break;
    
          case 2:
            console.log("You are ordering: Hand Sanitizer")
            break;
    
          case 3:
            console.log("You are ordering: Clorox wipes")
            break;
    
          case 4:
            console.log("You are ordering: Hand Soap")
            break;
      
          case 5:
            console.log("You are ordering: Wine")
            break;
      
          case 6:
            console.log("You are ordering: Chocolate")
            break;

          case 7:
            console.log("You are ordering: Netflix Subscription")
            break;
      
          case 8:
            console.log("You are ordering: Puzzles")
            break;
        
          case 9:
            console.log("You are ordering: Hot Pockets")
            break;
        
          case 10:
            console.log("You are ordering: Hair Color")
            break;
    
          default:
            connection.end();
            break;
          };
        });  //end of then.(function(answer) {switch case}
        //  prompts.next({
        //   message: "How many would you like to order?"
        // });
      }; //end of placeOrder()
      placeOrder();
  }); 
}); // end of connection.connect