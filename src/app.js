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
    swaggerOptions: {
        url: 'https://raw.githubusercontent.com/harshit9715/task-app/main/docs/task.json'
      },
    customCss: '.swagger-ui .topbar { display: none } .swagger-ui .highlight-code>.microlight {max-width:1000px} .swagger-ui img.full-width {width: auto}'
  };

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(null, options));


app.use(express.json())

// Routes
app.use(userRouter);
app.use(taskRouter);

module.exports = app