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
    allOrder: embedded object constains Order_items
    total:Number,
    address:String
    status:enum String

## API List
* User
    * POST http://localhost:8000/api/users/create
    * POST http://localhost:8000/api/users/login

* Products
    * POST http://localhost:8000/api/products/create
    * GET http://localhost:8000/api/products/all
    * PUT http://localhost:8000/api/products/update/:id
    * PATCH http://localhost:8000/api/products/:id/disable
    * PATCH http://localhost:8000/api/products/:id/enable
    * DELETE http://localhost:8000/api/products/:id/delete

* Cart 
    * POST http://localhost:8000/api/cart/addtocart
    * GET http://localhost:8000/api/cart/getcart
    * PUT http://localhost:8000/api/cart/update
    * DELETE http://localhost:8000/api/cart/removeitem/:productID

* Order
    * POST http://localhost:8000/api/order/placeorder
    * GET http://localhost:8000/api/order/allorder
    * GET http://localhost:8000/api/order/:id

