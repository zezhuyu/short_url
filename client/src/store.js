import config from './config.json';
import mongoose from 'mongoose';
import moment from 'moment';
//const db = mongoose.createConnection(config.MONGODB_URL);
const urlSchema = new mongoose.Schema({
    url: { type: String, required: true },
    code: { type: String, required: true },
    date: { type: Date, default: moment().format('YYYY-MM-DD HH:mm:ss') }
});


function Store(url, code) {
    return true;
}

function CheckURL(url) {
    return true;
}

function GetURL(code) {
    return true;
}

export {Store, CheckURL, GetURL};