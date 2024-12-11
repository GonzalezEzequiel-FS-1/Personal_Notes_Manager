const dynamoDB = require("../db/DynamoSetUp");
const bcrypt = require('bcryptjs')
const User = require('../models/UserModel')
const { checkUser } = require('../utils/checkUser');
const createSession = require("./sessionContollers/Sessions");
const { v4: uuidv4 } = require('uuid');
//const session = require("express-session");
const ttl = 3600

const createUser = async (req, res) => {
    console.log('Checking if user name, password, and email reached the server');
    const { userName, userEmail, userPass } = req.body;

    if (!userName || !userEmail || !userPass) {
        console.log('Incomplete User Data');
        return res.status(400).json({
            success: false,
            message: 'Please Complete all Fields'
        });
    }

    console.log('UserName, Password, and Email found, moving on');
    console.log('Hashing')
    const hashedPass = await bcrypt.hash(userPass, 10);

    try {
        console.log("Checking if the user exists on DB")
        const userExists = await checkUser(userName)
        if (userExists === false) {
            console.log(`User with ID ${userName} already exists`)
            return res.status(400).json({
                success: false,
                message: `User with ID ${userName} already exists`
            })
        }

        console.log("Setting user with Dynamoose")
        const newUser = await User.create({
            name: userName,
            email: userEmail,
            password: hashedPass
        });

        await newUser.save();
        console.log(`User Created: ${JSON.stringify(newUser)}`)

        console.log('Successfully completed all operations');

        return res.status(200).json({
            success: true,
            User_Data: newUser
        });
    } catch (error) {
        console.log(`Error creating user: ${error.stack}`);
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
}
const signin = async (req, res) => {
    const { userName, userPassword } = req.body;
    console.log('Getting user Data from the requests body')
    if (!userName || !userPassword) {
        console.log('UserData not found on the request body')
        return res.status(400).json({
            success: false,
            message: "Incomplete data provided"
        });
    }

    try {
        console.log(' user data found ')
        const userData = await User.get(userName);
        console.log(' checking db for user ', userName)
        if (!userData) {
            console.log(userName,' Not found on DB  ')
            return res.status(404).json({
                success: false,
                message: 'User Not Found'
            });
        }
        console.log(' User Found checking password ')
        const storedPassword = userData.password;

        if (!storedPassword) {
            console.log(' no password provided ')
            return res.status(404).json({
                success: false,
                message: 'Password Not Found for User'
            });
        }
        console.log(' Password found checking db ')
        const isPasswordValid = await bcrypt.compare(userPassword, storedPassword);
        if (!isPasswordValid) {
            console.log(' Passwords did not match ')
            return res.status(400).json({
                success: false,
                message: 'Invalid Credentials'
            });
        }
        console.log(' Passwords Matched, user authenticated ')
        return res.status(200).json({
            success: true,
            message: 'User Authenticated Successfully'
        });

    } catch (error) {
        console.log(`Error Authenticating User: ${error.stack}`);
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

const signOff = async (req, res) => {
    
    if (req.session && req.session.userName) {
        console.log("Session not deleted");
        return res.status(400).json({
            success: false,
            message: 'Session not deleted'
        })
    }
    try {
        console.log('Session destroyed, redirecting');
        return res.status(303).redirect('http://localhost:5173/signup')
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({
            success:false,
            error:error.message
        })
    }
}

module.exports = {
    createUser,
    signin,
    signOff
};



/*

const createUser = async (req, res) => {
    console.log('Checking if user name, password, and email reached the server');
    const { userName, userEmail, userPass } = req.body;

    if (!userName || !userEmail || !userPass) {
        console.log('Incomplete User Data');
        return res.status(400).json({
            success: false,
            message: 'Please Complete all Fields'
        });
    }

    console.log('UserName, Password, and Email found, moving on');
    console.log('Hashing')
    const hashedPass = await bcrypt.hash(userPass, 10);

    try {
        console.log('Setting params');
        const params = {
            TableName: "User",
            Item: {
                UserName:userName, 
                userEmail,
                userPassword:hashedPass,
                createdAt: new Date().toISOString()
            }
        };

        console.log('Ready to write to DynamoDB');
        console.log('Params:', params);

        const data = await dynamoDB.put(params).promise();

        console.log('Successfully completed operation', data);

        return res.status(200).json({
            success: true,
            data: data
        });
    } catch (error) {
        console.log(`Error creating user: ${error.stack}`);
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
}



const signin = async (req, res) => {
    const { userName, userPassword } = req.body;

    if (!userName || !userPassword) {
        return res.status(400).json({
            success: false,
            message: "Incomplete data provided"
        });
    }

    try {
        const params = {
            TableName: "User",
            Key: {
                UserName: userName
            }
        };

        const response = await dynamoDB.get(params).promise();

        if (!response.Item) {
            return res.status(404).json({
                success: false,
                message: 'User Not Found'
            });
        }

        const storedPassword = response.Item.userPassword;

        if (!storedPassword) {
            return res.status(404).json({
                success: false,
                message: 'Password Not Found for User'
            });
        }

        const isPasswordValid = await bcrypt.compare(userPassword, storedPassword);
        if (!isPasswordValid) {
            return res.status(400).json({
                success: false,
                message: 'Invalid Credentials'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'User Authenticated Successfully'
        });

    } catch (error) {
        console.log(`Error Authenticating User: ${error.stack}`);
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

*/