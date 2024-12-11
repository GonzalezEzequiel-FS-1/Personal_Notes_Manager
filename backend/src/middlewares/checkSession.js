const checkUserSession = async (req, res, next) => {
    const user = req.session.userName;
    if (!user) {
        console.log('User Not Found On Session')
        res.status(404).json({
            success: false,
            message: `User with name ${user}`
        })
        try {
            console.log(user)
            next();
        } catch (error) {
            console.log(error);
            res.status(500).json({
                success: false,
                error: error.message
            })
        }
    }
}
module.exports = checkUserSession;