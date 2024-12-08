const express = require('express');
const app = express();
const cors = require('cors');

const dotenv = require('dotenv')
dotenv.config()

const PORT = process.env.PORT || 3000;
const morgan = require('morgan')
const routes = require('./src/routes/index')


app.use("/api", routes)
app.use(cors());
app.use(morgan('dev'));

app.listen(PORT, ()=>{
    console.log(`Server Running on Port: ${PORT}`)
})

process.on('SIGINT', () => {
    console.log('Shutting down server...');
    process.exit();
});

process.on('uncaughtException', (err) => {
    console.error('There was an uncaught error:', err);
    process.exit(1);
});