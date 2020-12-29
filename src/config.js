// config.js
const dotenv = require('dotenv');
dotenv.config();
module.exports = {
    PORT: process.env.PORT, // e.g. 3000
    Maintenance: process.env.Maintenance,       // Is website under maintenance ? boolean
    EMAIL_SENDER: process.env.EMAIL_SENDER,     // SES sender email address
    MONGODB_URL: process.env.MONGODB_URL,       // MongoDB database URL
    MONGODB_NAME: process.env.MONGODB_NAME,     // MongoDB database name
    
    // SECRETS
    JWT_SECRET: process.env.JWT_SECRET,         // A secret for generating JWTs for users.
    SES_API_KEY: process.env.SES_API_KEY,        // SES API KEY
    SES_API_SECRET: process.env.SES_API_SECRET, // SES API SECRET
    SES_REGION: process.env.SES_REGION
};