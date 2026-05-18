# Product-Order-Management-System

## Setup
    npm install
    npm run dev

## ENV Variables
    MONGODB_URI=
    DB_NAME=
    PASS_SALT=
    TOKEN_KEY=

## Schema 
# User 
    _id: ObjectId
    name:String, required
    roles:Array,
    email:String, unique, required
    password:String, required

# Product 
    _id: ObjectId
    name:String, required, index
    description:String,
    quantity:Number, required min:0
    price:Number, required min:0
    isDisabled:boolean

# Order_items 
    _id: ObjectId
    productId:refrence Product
    price: Number
    quantity:Number

# Cart_items 
    _id: ObjectId
    productId:refrence Product
    price: Number
    quantity:Number

# Cart 
    _id: ObjectId
    userId:refrence User
    items: embedded object constains Cart_items

# Order
    _id: ObjectId
    userId:refrence User
    allOrder: embedded object contains Order_items
    total:Number,
    address:String
    status:enum String

## API List
* User
    * POST /api/users/create
    * POST /api/users/login

* Products
    * POST /api/products/create
    * GET /api/products/all
    * PUT /api/products/update/:id
    * PATCH /api/products/:id/disable
    * PATCH /api/products/:id/enable
    * DELETE /api/products/:id/delete

* Cart 
    * POST /api/cart/addtocart
    * GET /api/cart/getcart
    * PUT /api/cart/update
    * DELETE /api/cart/removeitem/:productID

* Order
    * POST /api/order/placeorder
    * GET /api/order/allorder
    * GET /api/order/:id

## Swagger Docs
    
    http://localhost:8000/api-docs