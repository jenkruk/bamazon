DROP DATABASE IF EXISTS bamazon_DB;
CREATE DATABASE bamazon_DB;

USE bamazon_DB;

-- Create table
CREATE TABLE products(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(50) NOT NULL,
  department_name VARCHAR(50) NOT NULL,
  price DECIMAL(4,2) default 0,
  stock_quantity INT default 0,
  PRIMARY KEY (item_id)
);

-- Insert more than one row at a time
 INSERT INTO products (product_name, department_name, price, stock_quantity)
 VALUES ("Toilet Paper", "Essentials", 12.00, 100), 
 ("Hand Sanitizer", "Essentials", 5.00, 80), 
 ("Clorox Wipes", "Essentials", 8.00, 90), 
 ("Hand Soap", "Essentials", 3.00, 200), 
 ("Wine", "Also Essential", 75.00, 100), 
 ("Chocolates", "Also Essential", 10.00, 300), 
 ("Netflix Subscription", "Also Essential", 14.00, 400), 
 ("Puzzles", "Good to Have's", 10.00, 150), 
 ("Hot Pockets", "Good to Have's", 06.00, 175), 
 ("Hair Color", "Good to Have's", 12.00, 110);