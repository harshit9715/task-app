const app = require('./app')
const { PORT } = require('./config')

// Start the express app.
if (PORT){
    app.listen(PORT, ()=> {
        console.log('server on port:',PORT);
    })   
}
else {
    console.log('\x1b[41m\x1b[37m%s\x1b[0m', "Create a .env file in project root and mention PORT and other API-KEYs");
}
