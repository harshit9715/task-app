const mongoose = require('mongoose');
const validator = require('validator');

const {MONGODB_NAME, MONGODB_URL} = require('../config')
const connURL = `${MONGODB_URL}/${MONGODB_NAME}`

mongoose.connect(connURL, {
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useCreateIndex: true
})