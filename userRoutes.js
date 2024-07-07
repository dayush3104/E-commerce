import express from "express";
import path from 'path';
import { fileURLToPath } from 'url';
import { encryptPassword, comparePassword } from './helpers/authHelper.js';
import User from './models/UserModel.js';
import Cart from './models/CartModel.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const userRouter = express.Router();
userRouter.use(express.static('public'));

userRouter.get('/', (req,res)=>{
    res.redirect('login');
});

userRouter.get('/login', (req,res)=>{
    return res.status(200).sendFile(__dirname + '/public/LoginPage.html');
});

userRouter.get('/register', (req,res)=>{
    return res.status(200).sendFile(__dirname + '/public/RegisterPage.html');
});

userRouter.get('/home', (req,res)=>{
    res.status(200).sendFile(__dirname + '/public/HomePage.html');
});

userRouter.get('/cart', (req,res)=>{
    res.status(200).sendFile(__dirname + '/public/CartPage.html');
});

userRouter.get('/orders', (req,res)=>{
    res.status(200).sendFile(__dirname + '/public/OrderPage.html');
});

userRouter.get('/place-order', (req,res)=>{
    return res.status(200).sendFile(__dirname + '/public/PlaceOrder.html');
});

userRouter.post('/register', async (req,res)=>{
    try {
        const {name,email,password,phone,address} = req.body;
        const hashedPassword = await encryptPassword(password);
        const newCart = new Cart;
        const newUser = new User({name,email,password:hashedPassword,phone,address, cartID:newCart._id});
        newCart.userID = newUser._id;
        await newCart.save();
        await newUser.save();

        return res.status(200).send({
            success: true,
            message: 'Registeration : SUCCESSFUL',
        });

    } catch (error) {
        console.error(`<<< [/user/POST/register] >>> ${error} >>>`);
        return res.status(500).json({
            success: false,
            message: 'ERROR',
            error
        });
    }
});

userRouter.post('/login', async (req,res)=>{
    try {
        const {email,password} = req.body;
        const user = await User.findOne({ email });
    
        if (!user) {
            console.log('<<< [/user/POST/login] >>> User Not Found >>>');
            return res.status(404).json({
                success: false,
                message: 'User Not Found'
            });
        }
        else {
            const match =  await comparePassword(password, user.password);
            if(!match){
                console.log('<<< [/user/POST/login] >>> Invalid Password >>>');
                return res.status(200).json({
                    success: false,
                    message: 'Invalid Password'
                });
            }
            else{
                return res.status(200).json({
                    success: true,
                    message: 'Login : SUCCESSFUL',
                    userID: user._id
                });
            }
        }

    } catch (error) {
        console.error(`<<< [/user/POST/login] >>> ${error} >>>`);
        return res.status(500).json({
            success: false,
            message: 'ERROR',
            error
        });
    }
});

export default userRouter;