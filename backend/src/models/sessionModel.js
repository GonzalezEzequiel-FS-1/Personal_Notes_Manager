const dynamoose = require('dynamoose')
const sessionModel = new dynamoose.Schema({
    sessionID: {
        type: String,
        hashKey: true
    },
    name: {
        type: String,

    },
    expires: {
        type: Number
    },
    data: {
        type: Object
    },
    isAuthenticated: {
        type: Boolean,
        default: false
    }
})
const Session = dynamoose.model("Sessions", sessionModel)
module.exports = Session;