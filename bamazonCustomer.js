//requirements: console.table, inquirer
var mysql = require("mysql");
const cTable = require('console.table');
var inquirer = require('inquirer');

//connection to database
var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "",
    database: "bamazonDB"
});

//function to connect to database and begin shopping
connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    displayItems();
});

//query database, display products, initiate shop function
function displayItems() {
    connection.query("SELECT item_id, product_name, price FROM products", function (err, items) {
        if (err) throw err;
        console.log("\n");
        console.table(items);
        shop();
    })
};
//begin inquirer prompts to start shopping
function shop() {
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        inquirer
            .prompt([
                {
                    name: "selection",
                    type: "rawlist",
                    choices: function () {
                        var choiceArr = [];
                        for (var i = 0; i < results.length; i++) {
                            choiceArr.push(results[i].product_name);
                        }
                        return choiceArr;
                    },
                    message: "Which item would you like to purchase?"
                },
                {
                    name: "quantity",
                    type: "input",
                    message: "How many would you like to purchase?"
                },
            ])
            .then(function (answer) {
                var selection;
                for (var i = 0; i < results.length; i++) {
                    if (results[i].product_name === answer.selection) {
                        selection = results[i];
                    }
                }
                //if statement to check stock compared to answer.quantity to see if purchase can go through
                if (selection.stock_quantity >= parseInt(answer.quantity)) {
                    // console.log(selection);
                    connection.query(
                        "UPDATE products SET ? WHERE ?",
                        [
                            {
                                stock_quantity: (selection.stock_quantity - parseInt(answer.quantity))
                            },
                            {
                                item_id: selection.item_id
                            }
                        ],
                        function (error) {
                            if (error) throw error;
                            console.log("Your total cost is $" + selection.price * parseInt(answer.quantity) + ".");
                            console.log("\n");
                            // console.log(selection.stock_quantity);
                            inquirer
                                .prompt(
                                    {
                                        name: "contshop",
                                        type: "list",
                                        choices: ["Yes", "No"],
                                        message: "Would you like to purchase additional items?"
                                    }
                                )
                                .then(function (answer) {
                                    if (answer.contshop === "Yes") {
                                        displayItems();
                                    } else {
                                        connection.end();
                                    }
                                })
                        }
                    )
                }
                else {
                    console.log("Sorry, we don't have that many in stock. We have " + selection.stock_quantity + " in stock. Please select another item or a smaller quantity.");
                    console.log("\n");
                    inquirer
                        .prompt({
                            name: "beginshop",
                            type: "list",
                            choices: ["Yes", "No"],
                            message: "Would you like to keep shopping?"
                        })
                        .then(function (answer) {
                            if (answer.beginshop === "Yes") {
                                displayItems();
                            } else {
                                connection.end();
                            }
                        })
                };

            })
    })
}