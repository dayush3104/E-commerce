import express from "express";
import path from 'path';
import { fileURLToPath } from 'url';
import Product from './models/ProductModel.js';
import Order from './models/OrderModel.js';
import MetaData from './models/MetaData.js';
import User from './models/UserModel.js';
import { comparePassword } from './helpers/authHelper.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const adminRouter = express.Router();
adminRouter.use(express.static('public'));

const adminAuth = async (req,res,next)=>{
    const {adminID} = req.body;
    console.log(adminID);
    const meta = await MetaData.findOne({});
    if(meta.adminID === adminID){
        next();
    }
    else{
        console.log('<<< [/admin/adminAuth()] >>> PROTECTED ROUTES DENIED >>>');
        return res.status(500).json({
            success: false,
            message: 'PROTECTED ROUTES DENIED'
        });
    }
}

adminRouter.get('/', (req,res)=>{
    res.redirect('admin-login');
});

adminRouter.get('/admin-login', (req,res)=>{
    res.status(200).sendFile(__dirname + '/public/AdminLogin.html');
});

adminRouter.get('/home', (req,res)=>{
    res.status(200).sendFile(__dirname + '/public/AdminHome.html');
});

adminRouter.get('/orders', (req,res)=>{
    res.status(200).sendFile(__dirname + '/public/AdminOrders.html');
});

adminRouter.get('/products', (req,res)=>{
    res.status(200).sendFile(__dirname + '/public/AdminProducts.html');
});

adminRouter.get('/add-product', (req,res)=>{
    res.status(200).sendFile(__dirname + '/public/AddProduct.html');
});

adminRouter.get('/edit-product', (req,res)=>{
    res.status(200).sendFile(__dirname + '/public/EditProduct.html');
});

adminRouter.post('/authentication', adminAuth, (req,res)=>{
    return res.status(200).json({
        success: true,
        message: 'PROTECTED ROUTES ALLOWED'
    });
});

adminRouter.post('/admin-login', async (req,res)=>{
    try {
        const {email,password} = req.body;
        const user = await User.findOne({ email });
    
        if (!user) {
            console.log('<<< [/admin/POST/admin-login] >>> User Not Found >>>');
            return res.status(404).json({
                success: false,
                message: 'User Not Found'
            });
        }
        else {
            const meta = await MetaData.findOne({});
            if(meta.adminID === user._id.toString()){
                const match =  await comparePassword(password, user.password);
                if(!match){
                    console.log('<<< [/admin/POST/admin-login] >>> Invalid Password >>>');
                    return res.status(200).json({
                        success: false,
                        message: 'Invalid Password'
                    });
                }
                else{
                    return res.status(200).json({
                        success: true,
                        message: 'Login : SUCCESSFUL',
                        userID: user._id.toString()
                    });
                }
            }
            else{
                console.log('<<< [/admin/POST/admin-login] >>> PROTECTED ROUTES DENIED >>>');
                return res.status(500).json({
                    success: false,
                    message: 'PROTECTED ROUTES DENIED'
                });
            }
        }
            
    } catch (error) {
        console.error(`<<< [/admin/POST/admin-login] >>> ${error} >>>`);
        return res.status(500).json({
            success: false,
            message: 'ERROR',
            error
        });
    }
});

adminRouter.post('/add-product', adminAuth, async (req,res)=>{
    try {
        const {name,description,imageURL,price,tags} = req.body;
        const newProduct = new Product({name,description,imageURL,price,tags});
        await newProduct.save();
        return res.status(200).send({
            success: true,
            message: 'New Product Added'
        });

    } catch (error) {
        console.error(`<<< [/admin/POST/add-product] >>> ${error} >>>`);
        return res.status(500).json({
            success: false,
            message: 'ERROR',
            error
        });
    }
});

adminRouter.post('/edit-product', adminAuth, async (req,res)=>{
    try {
        const {productID, product} = req.body;
        await Product.findByIdAndUpdate(productID, product);

        return res.status(200).send({
            success: true,
            message: 'Product Details Updated'
        });

    } catch (error) {
        console.error(`<<< [/admin/POST/edit-product] >>> ${error} >>>`);
        return res.status(500).json({
            success: false,
            message: 'ERROR',
            error
        });
    }
});

adminRouter.post('/get-all-orders', adminAuth, async (req,res)=>{
    try {
        const orders = await Order.find({});
        
        if(!orders){
            console.log('<<< [/admin/get-all-orders] >>> Orders Not Found >>>');
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
        console.error(`<<< [/admin/get-all-orders] >>> ${error} >>>`);
        return res.status(500).json({
            success: false,
            message: 'ERROR',
            error
        });
    }
});

adminRouter.post('/change-order-status', adminAuth, async (req,res)=>{
    try {
        const {orderID, status} = req.body;
        const order = await Order.findById(orderID);

        if(!order){
            console.log('<<< [/api/change-order-status] >>> Order Not Found >>>');
            return res.status(404).json({
                success: false,
                message: 'Order Not Found'
            });
        }

        order.status = status;
        await order.save();

        return res.status(200).send({
            success: true,
            message: 'Order Status Updated'
        });

    } catch (error) {
        console.error(`<<< [/admin/POST/change-order-status] >>> ${error} >>>`);
        return res.status(500).json({
            success: false,
            message: 'ERROR',
            error
        });
    }
});

export default adminRouter;