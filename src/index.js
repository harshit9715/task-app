const express = require('express')

require('./db/mongoose')

const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
const { PORT, Maintenance } = require('./config');
const app = express()




// Middleware for maintenance mode
app.use((req, res, next) => {
    if (Maintenance)
        return res.status(503).send({error: 'Site under maintenance, please try again later.'})
    next()
})


app.use(express.json())

// Routes
app.use(userRouter);
app.use(taskRouter);

// Start the express app.
if (PORT){
    app.listen(PORT, ()=> {
        console.log('server on port:',PORT);
    })   
}
else {
    console.log('\x1b[41m\x1b[37m%s\x1b[0m', "Create a .env file in project root and mention PORT and other API-KEYs");
}
