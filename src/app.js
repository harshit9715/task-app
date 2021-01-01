const express = require('express')

var swaggerUi = require('swagger-ui-express')

require('./db/mongoose')

const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
const swaggerDocument = require('../docs/task.json');
const { Maintenance } = require('./config');
const app = express()


// Middleware for maintenance mode
app.use((req, res, next) => {
    if (Maintenance==='true')
        return res.status(503).send({error: 'Site under maintenance, please try again later.'})
    next()
})
var options = {
    customCss: '.swagger-ui .topbar { display: none } .swagger-ui .highlight-code>.microlight {max-width:1000px}'
  };

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));


app.use(express.json())

// Routes
app.use(userRouter);
app.use(taskRouter);

module.exports = app