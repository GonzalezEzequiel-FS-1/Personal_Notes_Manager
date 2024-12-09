const  User = require('../models/UserModel');
const checkUser = async (user) => {
    if (!user) {
        console.log('No User Provided');
        return false; // Return false or throw an error as per your logic
    }
    
    try {
        // If 'user' is an object, you should pass the proper key (e.g., userName or email).
        const response = await User.get(user);  // Assuming 'user' is a valid partition key
        
        if (!response) {
            return true;  // User doesn't exist
        } else {
            return false;  // User exists
        }
    } catch (error) {
        console.error('Error finding user:', error.message);
        return false;  // Return false if an error occurs
    }
};

module.exports = {
    checkUser
};
