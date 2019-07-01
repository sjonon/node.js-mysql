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
    password: "Lenaluna",
    database: "bamazonDB"
});

//function to connect to database and begin shopping
connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    shop();
});

//query database, display products, begin inquirer prompts to start shopping
function shop() {
    connection.query("SELECT item_id, product_name, price FROM products", function (err, results) {
        if (err) throw err;
        console.log("\n");
        console.table(results);
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
                console.log("Your total cost is $" + selection.price * parseInt(answer.quantity) + ".")
            })
    })
}