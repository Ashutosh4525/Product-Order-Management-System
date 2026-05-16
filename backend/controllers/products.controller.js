import Products from "../models/products.model.js";
import { asyncHandler,ApiError } from "../middlewares/error.middleware.js";

export const createProduct=asyncHandler(async (req,res) => {
    const {name,quantity,price,description}=req.body;

    if(!name||!quantity||price===0){
        throw new ApiError("Input all values",400)
    }
    const product= await Products.findOne({name})
    if(product){
        throw new ApiError("Product Already exists",403)
    }
    const qunat=Number(quantity);
    const val=Number(price)
    const newProduct=await Products.create({name,quantity:qunat,price:val,description})

    return res.status(201).json({
        success:true,
        message:"Product created",
        data:newProduct
    })
})

export const getAllProduct=asyncHandler(async (req,res) => {
    const products= await Products.find({isDisabled:false});

    if (!products) {
        throw new ApiError("Products are empty", 404);
    }

    return res.status(200).json({
        success:true,
        message:"fetched products",
        data:products
    })
})


export const updateProduct=asyncHandler(async (req,res) => {
    const {id}=req.params;

    const product= await Products.findOne({_id:id,isDisabled:false})
    if(!product){
        throw new ApiError("Could not find product or disabled product",401)
    }

    const {name,quantity,price,description}=req.body;
     const qunat=Number(quantity);
    const val=Number(price)
    const updatedProduct = await Products.findByIdAndUpdate(id,
        {$set:{name,quantity:qunat,price:val,description}},
        {
            new:true,
            runValidators:true
        }
    )

    return res.status(200).json({
        success:true,
        message:"updated products",
        data:updatedProduct
    })
})

export const disableProduct=asyncHandler(async (req,res) => {
    const {id}=req.params;

    const product= await Products.findOne({_id:id,isDisabled:false})
    if(!product){
        throw new ApiError("Could not find product or disabled already product",401)
    }

    const disable= await Products.findByIdAndUpdate(id,
        {$set:{isDisabled:true}},
        {new:true,runValidators:true}
    );

    return res.status(200).json({
        success:true,
        message:"disabled product",
        data:disable
    })
})

export const enableProduct=asyncHandler(async (req,res) => {
    const {id}=req.params;

    const product= await Products.findOne({_id:id,isDisabled:true})
    if(!product){
        throw new ApiError("Could not find product or disabled already product",401)
    }

    const disable= await Products.findByIdAndUpdate(id,
        {$set:{isDisabled:false}},
        {new:true}
    );

    return res.status(200).json({
        success:true,
        message:"disabled product",
        data:disable
    })
})

export const deleteProduct = asyncHandler(async (req,res) => {
    const {id} =req.params;

    const product=await Products.findById(id);

    await Products.deleteOne(product);

    return res.status(200).json({
        success:true,
        message:"deleted product",
    })
})
