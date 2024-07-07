import express, { response } from "express";
import mongoose from "mongoose";
import Product from './models/ProductModel.js';
import Cart from './models/CartModel.js';
import Order from './models/OrderModel.js';
import User from './models/UserModel.js';

const apiRouter = express.Router();
apiRouter.use(express.static('public'));

apiRouter.post('/get-all-products', async (req,res)=>{
    try {
        const products = await Product.find({});
    
        if (!products) {
            console.log('<<< [/api/get-all-products] >>> Products Not Found >>>');
            return res.status(404).json({
                success: false,
                messgage: 'Products Not Found'
            });

        } else {
            return res.status(200).json({
                success: true,
                products
            });
        }

    } catch (error) {
        console.error(`<<< [/api/get-all-products] >>> ${error} >>>`);
        return res.status(500).json({
            success: false,
            message: 'ERROR',
            error
        });
    }
});

apiRouter.post('/get-product', async (req,res)=>{
    try {
        const {productID} = req.body;
        const product = await Product.findById(productID);
    
        if (!product) {
            console.log('<<< [/api/get-product] >>> Product Not Found >>>');
            return res.status(404).json({
                success: false,
                messgage: 'Product Not Found'
            });

        } else {
            return res.status(200).json({
                success: true,
                product
            });
        }

    } catch (error) {
        console.error(`<<< [/api/get-product] >>> ${error} >>>`);
        return res.status(500).json({
            success: false,
            message: 'ERROR',
            error
        });
    }
});

apiRouter.post('/get-product-price', async (req,res)=>{
    try {
        const {productID} = req.body;
        const product = await Product.findById(productID);
    
        if (!product) {
            console.log('<<< [/api/get-product] >>> Product Not Found >>>');
            return res.status(404).json({
                success: false,
                messgage: 'Product Not Found'
            });

        } else {
            return res.status(200).json({
                success: true,
                price: product.price
            });
        }

    } catch (error) {
        console.error(`<<< [/api/get-product] >>> ${error} >>>`);
        return res.status(500).json({
            success: false,
            message: 'ERROR',
            error
        });
    }
});

apiRouter.post('/get-product-quantity', async (req,res)=>{
    try {
        const {userID,productID} = req.body;
        const cart = await Cart.findOne({userID});
    
        if (!cart) {
            console.log('<<< [/api/get-product-quantity] >>> Cart Not Found >>>');
            return res.status(404).json({
                success: false,
                message: 'Cart Not Found'
            });
        } 

        if(cart.products.some(prod => prod['productID'] === productID)){
            const index = cart.products.findIndex(prod => prod['productID'] === productID);
            return res.status(200).json({
                success: true,
                quantity: cart.products[index]['quantity']
            });

        } else {
            return res.status(200).json({
                success: true,
                quantity: 0
            });
        }

    } catch (error) {
        console.error(`<<< [/api/get-product-quantity] >>> ${error} >>>`);
        return res.status(500).json({
            success: false,
            message: 'ERROR',
            error
        });
    }
});

apiRouter.post('/get-cart-length', async (req,res)=>{
    try {
        const {userID} = req.body;

        if(!userID){
            console.log('<<< [/api/get-cart-length] >>> Invalid userID >>>');
            return res.status(404).json({
                success: false,
                message: 'Invalid userID'
            });
        }
        const cart = await Cart.findOne({ userID });

        if (!cart) {
            console.log('<<< [/api/get-cart-length] >>> Cart Not Found >>>');
            return res.status(404).json({
                success: false,
                message: 'Cart Not Found'
            });

        } else {
            return res.status(200).json({
                success: true,
                length: cart.products.length
            });
        }

    } catch (error) {
        console.error(`<<< [/api/get-cart-length] >>> ${error} >>>`);
        return res.status(500).json({
            success: false,
            message: 'ERROR',
            error
        });
    }
});

apiRouter.post('/get-cart-total-price', async (req,res)=>{
    try {
        const {userID} = req.body;

        if(!userID){
            console.log('<<< [/api/get-cart-total-price] >>> Invalid UserID >>>');
            return res.status(404).json({
                success: false,
                message: 'Invalid userID'
            });
        }
        const cart = await Cart.findOne({ userID });

        if (!cart) {
            console.log('<<< [/api/get-cart-total-price] >>> Cart Not Found >>>');
            return res.status(404).json({
                success: false,
                message: 'Cart Not Found'
            });

        } else {
            return res.status(200).json({
                success: true,
                totalPrice: cart.totalPrice
            });
        }

    } catch (error) {
        console.error(`<<< [/api/get-cart-total-price] >>> ${error} >>>`);
        return res.status(500).json({
            success: false,
            message: 'ERROR',
            error
        });
    }
});

apiRouter.post('/add-to-cart', async (req,res)=>{
    try {
        const {userID,productID} = req.body;

        if(!userID || !productID){
            console.log('<<< [/api/add-to-product] >>> Invalid userID or productID >>>');
            return res.status(404).json({
                success: false,
                message: 'Invalid userID or productID'
            });
        }
        const session = await mongoose.startSession();
        session.startTransaction();

        const cart = await Cart.findOne({ userID });
        const product = await Product.findById(productID);

        cart.totalPrice += product.price;
        if(cart.products.some(prod => prod['productID'] === productID)){
            const index = cart.products.findIndex(prod => prod['productID'] === productID);
            cart.products[index]['quantity']++;
        }
        else{
            const prod = {
                'productID': productID, 
                'quantity': 1
            }
            cart.products.push(prod);
        }

        await cart.save();
        await session.commitTransaction();
        session.endSession();

        return res.status(200).json({
            success: true,
            message: 'Product Added To Cart'
        });

    } catch (error) {
        console.error(`<<< [/api/add-to-cart] >>> ${error} >>>`);
        return res.status(500).json({
            success: false,
            message: 'ERROR',
            error
        });
    }
});

apiRouter.post('/decrease-quantity', async (req,res)=>{
    try {
        const {userID,productID} = req.body;

        if(!userID || !productID){
            console.log('<<< [/api/decrease-quantity] >>> Invalid userID or productID >>>');
            return res.status(404).json({
                success: false,
                message: 'Invalid userID or productID'
            });
        }

        const session = await mongoose.startSession();
        session.startTransaction();                                                                                   

        const cart = await Cart.findOne({ userID });
        const product = await Product.findById(productID);

        if(cart.products.some(prod => prod['productID'] === productID)){
            cart.totalPrice -= product.price;
            cart.totalPrice = Math.max(cart.totalPrice, 0);

            const index = cart.products.findIndex(prod => prod['productID'] === productID);
            if(cart.products[index]['quantity'] === 1){
                cart.products.splice(index, 1);
            }
            else{
                cart.products[index]['quantity']--;
            }
        }
        else{
            return res.status(200).json({
                success: true,
                message: 'Product Quantity Reduced'
            }); 
        }

        await cart.save();

        await session.commitTransaction();
        session.endSession();

        return res.status(200).json({
            success: true,
            message: 'Product Quantity Reduced'
        });

    } catch (error) {
        console.error(`<<< [/api/decrease-quantity] >>> ${error} >>>`);
        return res.status(500).json({
            success: false,
            message: 'ERROR',
            error
        });
    }

});

apiRouter.post('/del-from-cart', async (req,res)=>{
    try {
        const {userID,productID} = req.body;

        if(!userID || !productID){
            console.log('<<< [/api/del-from-cart] >>> Invalid userID or productID >>>');
            return res.status(404).json({
                success: false,
                message: 'Invalid userID or productID'
            });
        }

        const session = await mongoose.startSession();
        session.startTransaction();

        const cart = await Cart.findOne({ userID });
        const product = await Product.findById(productID);

        if(cart.products.some(prod => prod['productID'] === productID)){
            const index = cart.products.findIndex(prod => prod['productID'] === productID);
            cart.totalPrice -= (cart.products[index].quantity*product.price);
            cart.totalPrice = Math.max(cart.totalPrice, 0);
            
            cart.products.splice(index, 1);

            await cart.save();
        }

        await session.commitTransaction();
        session.endSession();

        return res.status(200).json({
            success: true,
            message: 'Product Removed From Cart'
        });

    } catch (error) {
        console.error(`<<< [/api/del-from-cart] >>> ${error} >>>`);
        return res.status(500).json({
            success: false,
            message: 'ERROR',
            error
        });
    }

});

apiRouter.post('/get-cart', async (req,res)=>{
    try {
        const {userID} = req.body;

        if (!userID) {
            console.log('<<< [/api/get-cart] >>> Invalid userID >>>');
            return res.status(404).json({
                success: false,
                messgage: 'Invalid userID'
            });

        } 
    
        const cart = await Cart.findOne({userID});

        if(!cart){
            console.log('<<< [/api/get-cart] >>> Cart Not Found >>>');
            return res.status(404).json({
                success: false,
                message: 'Cart Not Found'
            });
        
        } else {
            return res.status(200).json({
                success: true,
                cart: cart
            });
        }

    } catch (error) {
        console.error(`<<< [/api/get-cart] >>> ${error} >>>`);
        return res.status(500).json({
            success: false,
            message: 'ERROR',
            error
        });
    }

});

apiRouter.post('/place-order', async (req,res)=>{
    try {
        const {userID,address,phone} = req.body;

        if(!userID || !address || !phone){
            console.log('<<< [/api/place-order] >>> Invalid Credentials >>>');
            return res.status(404).json({
                success: false,
                message: 'Invalid Credentials'
            });
        }

        const session = await mongoose.startSession();
        session.startTransaction();

        const cart = await Cart.findOne({userID});
        if(!cart){
            console.log('<<< [/api/place-order] >>> Cart Not Found >>>');
            return res.status(404).json({
                success: false,
                message: 'Cart Not Found'
            });
        
        }

        const newOrder = new Order({userID, products:cart.products, totalPrice:cart.totalPrice, status:"Pending", address, phone});
        cart.totalPrice = 0;
        cart.products = [];

        await newOrder.save();
        await cart.save();

        await session.commitTransaction();
        session.endSession();
        
        return res.status(200).json({
            success: true,
            message: 'Order Placed'
        });

    } catch (error) {
        console.error(`<<< [/api/place-order] >>> ${error} >>>`);
        return res.status(500).json({
            success: false,
            message: 'ERROR',
            error
        });
    }
})

apiRouter.post('/get-user-orders', async (req,res)=>{
    try {
        const {userID} = req.body;

        if(!userID){
            console.log('<<< [/api/get-user-orders] >>> Invalid Credentials >>>');
            return res.status(404).json({
                success: false,
                message: 'Invalid Credentials'
            });
        }

        const orders = await Order.find({userID});
        
        if(!orders){
            console.log('<<< [/api/get-user-orders] >>> Orders Not Found >>>');
            return res.status(404).json({
                success: false,
                message: 'Orders Not Found'
            });
        }

        res.status(200).json({
            success: true,
            orders: orders
        });

    } catch (error) {
        console.error(`<<< [/api/get-user-orders] >>> ${error} >>>`);
        return res.status(500).json({
            success: false,
            message: 'ERROR',
            error
        });
    }
});

apiRouter.post('/get-user-name', async (req,res)=>{
    try {
        const {userID} = req.body;

        if(!userID){
            console.log('<<< [/api/get-user-name] >>> Invalid Credentials >>>');
            return res.status(404).json({
                success: false,
                message: 'Invalid Credentials'
            });
        }

        const user = await User.findById(userID);
        
        if(!user){
            console.log('<<< [/api/get-user-name] >>> User Not Found >>>');
            return res.status(404).json({
                success: false,
                message: 'User Not Found'
            });
        }

        res.status(200).json({
            success: true,
            name: user.name
        });

    } catch (error) {
        console.error(`<<< [/api/get-user-name] >>> ${error} >>>`);
        return res.status(500).json({
            success: false,
            message: 'ERROR',
            error
        });
    }
});

apiRouter.post('/get-user-contact', async (req,res)=>{
    try {
        const {userID} = req.body;

        if(!userID){
            console.log('<<< [/api/get-user-contact] >>> Invalid Credentials >>>');
            return res.status(404).json({
                success: false,
                message: 'Invalid Credentials'
            });
        }

        const user = await User.findById(userID);
        
        if(!user){
            console.log('<<< [/api/get-user-contact] >>> User Not Found >>>');
            return res.status(404).json({
                success: false,
                message: 'User Not Found'
            });
        }

        res.status(200).json({
            success: true,
            contact: {
                address: user.address,
                phone: user.phone
            }
        });

    } catch (error) {
        console.error(`<<< [/api/get-user-contact] >>> ${error} >>>`);
        return res.status(500).json({
            success: false,
            message: 'ERROR',
            error
        });
    }
});

export default apiRouter;