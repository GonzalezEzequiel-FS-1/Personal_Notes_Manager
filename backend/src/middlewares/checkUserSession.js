const checkUserSession = async (req, res, next) => {
    const userInSession = req.session.userName();
    if (!userInSession) {
        console.log('No user found in session');
        return res.status(404).json({
            success: false,
            message: "No user found in session"
        })
    }
    try {
        
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            success: false,
            error: error.message
        })
    }
}