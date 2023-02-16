# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints

#### Products
- Index 
- Show
- Create [token required]

#### Users
- Index [token required]
- Show [token required]
- Create N[token required]

#### Orders
- Current Order by user (args: user id)[token required]
- [OPTIONAL] Completed Orders by user (args: user id)[token required]

===============
# index
=============
    1-using the api
    A- user table 
        1-table schema
        2-users table route and how to...
    B-products table
        1-table schema
        2-products table route and how to .....
    C-orders table
        1-table schema
        2-orders table route and how to ....
    D-orders_products table
        1-table schema
        2-orders_products route and how to...
   ------------------------ end of index--------------------------
===========
============

## Data Shapes

 ------------------------------------------------------------------
 # A-- # **USERS TABLE**  
 ------------------------------------------------------------------
    1- ##### users table schema ######
    ------------------------------------

        Table "public.users"
            Column      |          Type          | Collation | Nullable |              Default              
        -----------------+------------------------+-----------+----------+-----------------------------------
        id              | integer                |           | not null | nextval('users_id_seq'::regclass)
        first_name      | character varying(30)  |           | not null | 
        last_name       | character varying(30)  |           | not null | 
        hashed_password | character varying(200) |           |          |

    -------------------
    2-## user route###
    ------------------

        -get localhost:3000/users   get all users require token
        -get localhost:3000/users/:id   get single user with id require token
        -post localhost:3000/users  create user 
        -post localhost:3000/users/auth  authinticate a user by (firstname,password)
        -post localhost:3000/guest  create token just in case .....

    -----###user input explanation##------

        1-kindly dont bother with password and hashed_password naming (i was having a minor bug ^^)
        2-making new user input for the post request body("firstname","lastname","password)
        3-authenticate user input into the post request body("firstname","password") 
        4-getting single user using id
        


 -----------------------------------------------------------------
 # B---- # **PRODUCTS TABLE**  
 -----------------------------------------------------------------
    1- ##### products table schema ######
    ---------------------------------------
        Table "public.products"
        Column |         Type          | Collation | Nullable |               Default                
        --------+-----------------------+-----------+----------+--------------------------------------
        id     | integer               |           | not null | nextval('products_id_seq'::regclass)
        name   | character varying(40) |           |          | 
        price  | integer               |           |          |

    ----------------------
    2-## products route ###
    ----------------------

        -get localhost:3000/products  get all products
        -get localhost:3000/products/:id  get single product
        -post localhost:3000  create new product require token

    -------------### product input explanation ####-----

        1-for creating a new product in post request>input in the body("name","price")
        2-for getting a product in get request>input in the body("product_id")
        3-for getting all product in get request()



 -----------------------------------------------------------------------------------------
 # C- # **ORDERS TABLE**  
 -----------------------------------------------------------------
    1- ##### ORDERS TABLE SCHEMA ######
    -------------------------------------
        Table "public.orders"
        Column  |         Type          | Collation | Nullable |              Default               
        ---------+-----------------------+-----------+----------+------------------------------------
        id      | integer               |           | not null | nextval('orders_id_seq'::regclass)
        user_id | integer               |           |          | 
        stats   | character varying(20) |           |          |
        Table "public.orders_products"

    ----------------------
    2-## ORDERS ROUTE ###
    ----------------------
        -get localhost:3000/orders/:id -- get an order by user id
        -post localhost:3000/orders create -- new order require token

        ----### order input explanation ###----

        1- for making a new order in post request >input in the body("userid","productid","quantity","status") 
        2-for getting an order(s) by user id >input in the body("enter the user id after the orders route ex"orders/1")
            


 -----------------------------------------------------------------------------------------
 # D-  # **ORDERS_PRODUCTS TABLE**  
 -----------------------------------------------------------------
    
    ---------------------------------------
    1- ##### order_products table schema ######
    ------------------------------------

        Column   |  Type   | Collation | Nullable |                   Default                   
        ------------+---------+-----------+----------+---------------------------------------------
        id         | integer |           | not null | nextval('orders_products_id_seq'::regclass)
        order_id   | integer |           |          | 
        product_id | integer |           |          | 
        quantity   | integer |           |          |

    ----------------------
    2-## orders_products route ###
    ----------------------
        -get localhost:3000/orders/:(user)id/products -- get product orders made by certain user
        -post localhost:3000/orders/:(order)id/products --create new product order with order(id)

        -----#### orders/product  input explanation #####-----

        1-for making new product-order in post request >input in the body("order_id,"product_id","quantity")
        2- for getting product-order  made by certain user in get request >input in the body("user_id")

