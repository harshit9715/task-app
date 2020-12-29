// config.js
const dotenv = require('dotenv');
dotenv.config();
module.exports = {
    PORT: process.env.PORT, // e.g. 3000
    Maintenance: process.env.Maintenance,   // Is website under maintenance ? boolean
    EMAIL_SENDER: process.env.EMAIL_SENDER, // SendGrid sender email address
    MONGODB_URL: process.env.MONGODB_URL,   // MongoDB database URL
    MONGODB_NAME: process.env.MONGODB_NAME, // MongoDB database name
    
    // SECRETS
    JWT_SECRET: process.env.JWT_SECRET,     // A secret for generating JWTs for users.
    SG_API_KEY: process.env.SG_API_KEY,     // SendGrid API KEY
};