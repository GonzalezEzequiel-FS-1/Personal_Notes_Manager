const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const routes = require('./src/routes/index');
const session = require('express-session');
const DynamoDBStore = require('connect-dynamodb')(session);
const { Issuer, generators } = require('openid-client');

dotenv.config();

app.use(express.json());

app.use(session({
    secret: 'some secret',
    resave: false,
    saveUninitialized: false
}));


let client;
// Initialize OpenID Client
async function initializeClient() {
    const issuer = await Issuer.discover('https://cognito-idp.us-east-1.amazonaws.com/us-east-1_WYYdypKal');
    client = new issuer.Client({
        client_id: '6a6jmjpipjtotbap17st6ejac4',
        client_secret: '<client secret>',
        redirect_uris: ['http://localhost:5173/home'],
        response_types: ['code']
    });
};
initializeClient().catch(console.error);



app.get('/login', (req, res) => {
    const nonce = generators.nonce();
    const state = generators.state();

    req.session.nonce = nonce;
    req.session.state = state;

    const authUrl = client.authorizationUrl({
        scope: 'phone openid email',
        state: state,
        nonce: nonce,
    });

    res.redirect(authUrl);
});

/*
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
*/
// Helper function to get the path from the URL. Example: "http://localhost/hello" returns "/hello"
function getPathFromURL(urlString) {
    try {
        const url = new URL(urlString);
        return url.pathname;
    } catch (error) {
        console.error('Invalid URL:', error);
        return null;
    }
}

app.get(getPathFromURL('http://localhost:5173/home'), async (req, res) => {
    try {
        const params = client.callbackParams(req);
        const tokenSet = await client.callback(
            'http://localhost:5173/home',
            params,
            {
                nonce: req.session.nonce,
                state: req.session.state
            }
        );

        const userInfo = await client.userinfo(tokenSet.access_token);
        req.session.userInfo = userInfo;

        res.redirect('/');
    } catch (err) {
        console.error('Callback error:', err);
        res.redirect('/');
    }
});


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