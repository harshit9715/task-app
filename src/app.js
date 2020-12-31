const express = require('express')

require('./db/mongoose')

const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
const { Maintenance } = require('./config');
const app = express()


// Middleware for maintenance mode
app.use((req, res, next) => {
    if (Maintenance==='true')
        return res.status(503).send({error: 'Site under maintenance, please try again later.'})
    next()
})


app.use(express.json())

// Routes
app.use(userRouter);
app.use(taskRouter);

module.exports = app