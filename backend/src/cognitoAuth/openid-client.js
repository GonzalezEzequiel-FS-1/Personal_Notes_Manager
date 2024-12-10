const express = require('express');
const session = require('express-session');
const { Issuer, generators } = require('openid-client');
const app = express();
      
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