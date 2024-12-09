import dynamoose from "dynamoose";

const userSchema = new dynamoose.Schema({
    id:{
        type : String,
        hashKey : true
    },
    name: String,
  
    email: {
        type: String,
        required: true,
        validate: (email: string) =>
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email), // Simple email validation
      },
})