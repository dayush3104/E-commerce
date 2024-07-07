import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true   
    },
    description: {
        type: String,
        required: true,
        trim: true   
    },
    price: {
        type: Number,
        required: true
    },
    imageURL: {
        type: String,
        required: true
    },
    tags: [{
        type: String,
        trim: true
    }]
}, {timestamps: true});

export default mongoose.model('products', productSchema);