import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userID: {
        type: String,
        required: true
    },
    products: [{
        productID: {
            type: String
        },
        quantity: {
            type: Number,
            default: 0
        }
    }],
    totalPrice: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        trim: true
    }
}, {timestamps: true});

export default mongoose.model('orders', orderSchema);