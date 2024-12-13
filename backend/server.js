//Import required dependencies
const express = require('express')
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const routes = require('./src/routes/index');
const session = require('express-session');
const DynamoDBStore = require('connect-dynamodb')(session);
dotenv.config();

app.use(express.json());

app.use(session({
    secret : process.env.SESSION_SECRET,
    resave : false,
    saveUninitialized : false,
    store: new DynamoDBStore({
        table: 'Sessions',  
        AWSConfig: {        
            region: 'us-east-1',  
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        },
    }),
    cookie : {
        maxAge : 100 * 60 * 60,
        secure : false
    }
}))

if (!process.env.SESSION_SECRET || !process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
    console.error("Missing required environment variables.");
    process.exit(1);
}


const PORT = process.env.PORT || 3000;

app.use(morgan('dev'));

app.use(cors({
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials:true
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