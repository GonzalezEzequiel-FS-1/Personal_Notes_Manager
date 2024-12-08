const testServer = async (req, res) =>{
    try {
        console.log('api works')
        res.status(200).json({
            success:true,
            message:'API Works'
        })
    } catch (error) {
        console.error(error.message)
        res.status(500).json({
            success:false,
            error:error.message
        })
    }
}
module.exports = testServer;