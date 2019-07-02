# node.js-mysql
This is a node application that allows a user to "shop" from a locally hosted database, or take actions as the manager.
As the user shops, the inventory will be updated as appropriate.
As the manager works with the program, they will be able to view current products, view low inventory, update inventory, and/or add new products to the store.

### Using the app
To use this app you'll simply need to follow a few steps:

* In the bamazonManager.js and/or bamazonCustomer.js file, locate the password field within the Connection to Database section of the code. You'll find this just below the requirements section towards the top of each file. Enter the password for your local root database.

![database connection](assets/README_images/password.png);

### Customer View
* To begin shopping, type the following:

        node bamazonCustomer.js

* You will then be shown a table with a list of products available for purchase
![bamazon customer view](assets/README_images/customer_view.png)
* Follow the prompts to make your selection followed by the desired quantity
![purchase prompts](assets/README_images/purchase_prompts.png)

* If the user's desired quantity exceeds inventory quantities, then the user will see how much inventory is on hand and will be prompted to continue shopping.
![not enough stock](assets/README_images/no_stock.png)

### Manager View
* To begin manager's tasks, type the following:

        node bamazonManager.js

* You will be prompted to select an action:

![manager actions](assets/README_images/manager_actions.png)

* Selecting View Products for Sale will display a table of the products currently available.

![table view](assets/README_images/view_products.png)

* Selecting View Low Inventory will display a table with products that currently have an inventory or 5 or fewer.

![low inventory table](assets/README_images/low_inventory.png)

* Selecting Add to Inventory will display a series of prompts to gather information on which item to update and the amount of inventory to be added to the current stock. The database will then be updated with this information and a table displaying the new inventory quantities will be displayed.

     * Make Selection
    ![adding to inventory -select item](assets/README_images/inventory_selection.png)

    * Input quantity to add to inventory and view updated inventory counts
    ![adding to inventory - input quantity](assets/README_images/inventory_quantity.png)

* Selecting Add New Product will display a series of prompts to take in information about the new product. This information will then be input into the database table, and a new table displaying all of the products including the newly added item will be displayed.

    * Input the name of the new product
    
        ![new product - name](assets/README_images/add_item.png)
    * Input the department
    
        ![new prod - dept](assets/README_images/add_dept.png)

    * Input price and inventory counts (these values are validated, if NaN then price defaults to 1 and stock defaults to 0)
        ![new prod - price/inventory](assets/README_images/add_product_all.png)


* Selecting Exit will end the connection to the database.

    ![program exit](assets/README_images/exit.png);


### Technologies used
* MySQL
* javascript
* node js
* console.table
* inquirer

### Developer Information
Developed by Sylvia Jonon in Austin, TX.