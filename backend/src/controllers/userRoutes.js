const dynamoDB = require("../db/DynamoSetUp");
const bcrypt = require('bcryptjs')
const createUser = async (req, res)=>{
    const {userName, userEmail, userPass} = req.body;
    if(!userName || !email || !password){
        console.log('Incomplete User Data')
        return res.status(400).json({
            success:false,
            message:'Please Complete all Fields'
        })
    }
    const hashedPassword = await bcrypt.hash(userPass, 10)
    try {
        const params = {
            TableName:"User",
            Item:{
                userName,
                userEmail,
                userPass:hashedPassword,
                createdAt: new Date().toISOString()
            }
        }
        const data = await dynamoDB.put(params).promise();

        console.log('Successfully completed operation', data);

        return res.status(200).json({
            success: true,
            data: data
        });
    } catch (error) {
        console.log(`Error creating user ${error.stack}`)
        return res.status(500).json({
            success:false,
            error:error.message
        })
    }
}
module.exports = createUser