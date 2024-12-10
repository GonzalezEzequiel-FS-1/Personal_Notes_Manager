const  User = require('../models/UserModel');
const checkUser = async (user) => {
    if (!user) {
        console.log('No User Provided');
        return false;
    }
    
    try {
       
        const response = await User.get(user);  
        
        if (!response) {
            return true; 
        } else {
            return false; 
        }
    } catch (error) {
        console.error('Error finding user:', error.message);
        return false; 
    }
};

module.exports = {
    checkUser
};
