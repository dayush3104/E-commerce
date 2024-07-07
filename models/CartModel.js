import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    userID: {
        type: String,
        unique: true
    },
    products: [{
        productID: String,
        quantity: {
            type: Number,
            default: 0
        }
    }],
    totalPrice: {
        type: Number,
        default: 0
    }
}, {timestamps: true});

export default mongoose.model('carts', cartSchema);