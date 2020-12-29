const mongoose = require('mongoose');
const validator = require('validator');

const dbName = 'task-manager-api'
const connURL = `mongodb://127.0.0.1:27017/${dbName}`

mongoose.connect(connURL, {
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useCreateIndex: true
})