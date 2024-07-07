import mongoose from "mongoose";

const MetaDataSchema = new mongoose.Schema({
    adminID: {
        type: String
    }
}, {timestamps: true});

export default mongoose.model('metadatas', MetaDataSchema);