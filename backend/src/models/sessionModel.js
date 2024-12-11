const dynamoose = require('dynamoose');

const sessionModel = new dynamoose.Schema(
    {
        sessionID: {
            type: String,
            hashKey: true
        },
        name: {
            type: String,
            required: true
        },
        expires: {
            type: Number,
            required: true
        },
        data: {
            type: Object
        }
    },
    {
        timestamps: true // Automatically add createdAt and updatedAt fields
    }
);

const Session = dynamoose.model('Sessions', sessionModel);

module.exports = Session;
