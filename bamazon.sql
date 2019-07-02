DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products(
    item_id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(30) NOT NULL,
    department_name VARCHAR(30) NOT NULL,
    price INTEGER NOT NULL,
    stock_quantity INTEGER
);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES
("Four person tent", "outdoor", "500", "5"),
("Two person tent", "outdoor", "300", "5"),
("Sleeping bag", "outdoor", "100", "5"),
("Rolling luggage", "travel", "200", "5"),
("Duffel", "travel", "50", "10"),
("Notebook", "office supplies", "8", "10"),
("Pen", "office supplies", "2", "2"),
("US Map", "travel", "5", "2"),
("Cheetos", "food", "2", "1"),
("S'mores", "food", "2", "1")
