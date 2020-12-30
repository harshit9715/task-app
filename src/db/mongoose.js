const mongoose = require('mongoose');
const validator = require('validator');

const {MONGODB_URL} = require('../config')
const connURL = MONGODB_URL

mongoose.connect(connURL, {
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useCreateIndex: true
})