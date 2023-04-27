import fs from 'fs';
const config_file  = fs.readFileSync('./config.json', {encoding:'utf8', flag:'r'});
const config = JSON.parse(config_file);

export default {
    MONGODB_URL: process.env.MONGODB_URL || config.MONGODB_URL,
    MONGO_PORT: process.env.MONGO_PORT || config.MONGO_PORT,
    MONGO_DB: process.env.MONGO_DB || config.MONGO_DB,
    COLLECTION_NAME: process.env.COLLECTION_NAME || config.COLLECTION_NAME,
    PORT: process.env.PORT || config.PORT,
    CLINNT_URL: process.env.CLINNT_URL || config.CLINNT_URL,
    CLIENT_TOKEN: process.env.CLIENT_TOKEN || config.CLIENT_TOKEN,
    ADMIN_TOKEN: process.env.ADMIN_TOKEN || config.ADMIN_TOKEN,
    APP_TOKEN: process.env.APP_TOKEN || config.APP_TOKEN,
    KEYWORD_LENGTH: process.env.KEYWORD_LENGTH || config.KEYWORD_LENGTH,
    BLACK_LIST: process.env.BLACK_LIST || config.BLACK_LIST,
    KEYWORD_BLACK_LIST: process.env.KEYWORD_BLACK_LIST || config.KEYWORD_BLACK_LIST
}
