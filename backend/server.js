const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const routes = require('./src/routes/index');

dotenv.config();

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use(morgan('dev'));

app.use(cors({
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    allowedHeaders: ['Content-Type', 'Authorization'],
  }));

app.use("/api", routes)
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