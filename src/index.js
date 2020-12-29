const express = require('express')

require('./db/mongoose')

const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
const app = express()
const Maintenance = process.env.Maintenance || false
const PORT = process.env.PORT || 3000




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

app.listen(PORT, ()=> {
    console.log('Server is running on PORT: '+PORT);
})

