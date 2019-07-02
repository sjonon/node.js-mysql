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

//function to connect to database
connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    manager_choice();
});

//function to allow manager to view products, view low inventory, add inventory, and add new products
function manager_choice() {
    inquirer
        .prompt(
            [
                {
                    name: "manager_action",
                    type: "list",
                    choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "Exit"],
                    message: "Hello, manager, what would you like to do?"
                }
            ]
        ).then(function (answer) {
            var database_info = "SELECT * FROM products ORDER BY department_name";
            if (answer.manager_action === "View Products for Sale") {
                connection.query(database_info, function (err, res) {
                    if (err) throw error;
                    console.log("\nViewing Products for Sale\n")
                    console.table(res);
                    manager_choice();
                })
            } if (answer.manager_action === "View Low Inventory") {
                connection.query("SELECT * FROM products WHERE stock_quantity <= 5 ORDER BY stock_quantity", function (err, res) {
                    if (err) throw err;
                    console.log("\nViewing Low Inventory\n")
                    console.table(res);
                    manager_choice();
                })
            } if (answer.manager_action === "Add to Inventory") {
                connection.query(database_info, function (err, results) {
                    if (err) throw err;
                    inquirer
                        .prompt(
                            [
                                {
                                    name: "inventory_item",
                                    type: "list",
                                    choices: function () {
                                        var choiceArr = [];
                                        for (var i = 0; i < results.length; i++) {
                                            choiceArr.push(results[i].product_name);
                                        }
                                        return choiceArr;
                                    },
                                    message: "Which item's inventory would you like to update?"
                                },
                                {
                                    name: "add_inventory",
                                    type: "input",
                                    message: "How many would you like to add to the inventory?"
                                }
                            ]
                        ).then(function (answer) {
                            var item;
                            for (var i = 0; i < results.length; i++) {
                                if (results[i].product_name === answer.inventory_item) {
                                    item = results[i];
                                }
                            }
                            //updating inventory based on manager's selections
                            connection.query(
                                "UPDATE products SET ? WHERE ?",
                                [
                                    {
                                        stock_quantity: (item.stock_quantity + parseInt(answer.add_inventory))
                                    },
                                    {
                                        item_id: item.item_id
                                    }
                                ],
                                function (error) {
                                    connection.query(database_info, function (err, res) {
                                        if (err) throw err;
                                        console.log("\nUpdated Inventory Counts\n")
                                        console.table(res)
                                        manager_choice();
                                    })
                                })
                        })
                })
            } if (answer.manager_action === "Exit") {
                connection.end();
            } else if (answer.manager_action === "Add New Product"){
                //adding new product to database - gathering inputs and then writing them to database table
                console.log("last function here")
                inquirer
                    .prompt(
                        [
                            {
                                name: "item",
                                type: "input",
                                message: "What is the name of the item you would like to add?"
                            },
                            {
                                name: "department",
                                type: "input",
                                message: "Which department should this item be placed in?"
                            },
                            {
                                name: "price",
                                type: "input",
                                message: "How much does this item cost?",
                                validate: function (value) {
                                    if (isNaN(value) === false) {
                                        return true;
                                    }
                                    return false;
                                }
                            },
                            {
                                name: "new_inventory",
                                type: "input",
                                message: "How much inventory do we have for this item?",
                                validate: function (value) {
                                    if (isNaN(value) === false) {
                                        return true;
                                    }
                                    return false;
                                }
                            }
                        ]
                    ).then(function (answer) {
                        //update database with new item
                        connection.query(
                            "INSERT INTO products SET ?",
                            {
                                product_name: answer.item,
                                department_name: answer.department,
                                price: answer.price || 1,
                                stock_quantity: answer.new_inventory || 0
                            },
                            function (error) {
                                if (error) throw error;
                            }
                        );
                        connection.query(database_info, function (err, res) {
                            if (err) throw err;
                            console.log("\nProducts Updated with New Items\n");
                            console.table(res)
                            manager_choice();
                        })
                    })
                    
            }
        })

}