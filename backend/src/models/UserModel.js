const dynamoose = require("dynamoose");

const userSchema = new dynamoose.Schema({
  name: {
    type: String,
    required: true,
    hashKey: true, 
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: () => new Date(),
  },
});


const User = dynamoose.model("Users", userSchema);

module.exports = User;
