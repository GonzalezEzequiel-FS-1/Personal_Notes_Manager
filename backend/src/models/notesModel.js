const dynamoose = require('dynamoose')
const notesModel = new dynamoose.Schema({
    title: {
        type: String,
        hashKey: true
    },
    note: {
        type: String,
    },
    belongsTo: {
        type: String,
    },
    createdOn: {
        type: String,
    },
    at: {
        type: String,
    }
})
const newNote = dynamoose.model("Notes", notesModel)
module.exports = newNote;