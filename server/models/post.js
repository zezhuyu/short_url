import mongoose from 'mongoose';
import moment from 'moment';
import config from "../config.js";

const userSchema = new mongoose.Schema({
    url: { type: String, required: true, unique: true },
    code: { type: String, required: true , unique: true },
    createdAt: { type: Date, default: moment().format('YYYY-MM-DD HH:mm:ss') },
}, { collection: config.COLLECTION_NAME });

export default mongoose.model('User', userSchema);