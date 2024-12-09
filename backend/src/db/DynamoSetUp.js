const AWS = require("aws-sdk");

const AWS_REGION = process.env.AWS_REGION
AWS.config.update({
    region:"us-east-1",
    accessKeyId:process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey:process.env.AWS_SECRET_ACCESS_KEY
})

const dynamoDB = new AWS.DynamoDB.DocumentClient();

module.exports = dynamoDB;