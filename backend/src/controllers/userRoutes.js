const dynamoDB = require("../db/DynamoSetUp");
const bcrypt = require('bcryptjs')

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
                userPassword,
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

module.exports = {
    createUser,
    signin
};
