import express from 'express';
// import morgan from 'morgan';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRouter from './userRoutes.js';
import adminRouter from './adminRoutes.js';
import apiRouter from './apiRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));
// app.use(morgan('dev'));

try{
connectDB().then(()=>{
    app.listen(PORT, ()=>{
        console.log(`<<< [server.js] >>> APP LISTENING ON PORT : ${PORT} >>>`);
    });
});

app.use('/user', userRouter);
app.use('/admin', adminRouter);
app.use('/api', apiRouter);

app.get('/', (req,res)=>{
    res.redirect('/user');
});
}catch(error){
  concole.error(error);  
};





