const createSession = async (req, res, next) => {
    //Get user from the body of the request
    const user = req.body.userName
    //If no user is sent to the server return with a 404
    if (!user) {
        console.log(`No User found in the request's body`)
        return res.status(404).json({
            succes: false,
            message: `No User found in the request's body`
        })
    }
    try {
        //Assigning user to session
        req.session.userName = userName;
        // Ensuring that the name was added to the session
        if (!req.session.userName) {
            console.log(`No user attached to session`)
            return res.status(200).json({
                success: false,
                message: `No user attached to session`
            })
        }
        //Explicitly saving session
        req.session.save((err => {
            //If an error occurs while saving log the error
            console.error(`Explicit error saving session:>>>>>${err.message}`);
            return res.status(400).json({
                success: false,
                message: `Explicit error saving session`,
                error: error.message
            })
        }))

        //Logging to the console the successful creation
        console.log(`User created: ${req.session.userName}`)
        return next()

    } catch (error) {
        console.log(`Error Creating Session, Please Consult: ${error.message}`)
        return res.status(500).json({
            success: false,
            message: `Error Creating Session, Please Consult: ${error.message}`
        })
    }
    //Done!
}

const checkSession = async (req, res, next) => {
    //Set variable to store the user in session
    const userInSession = req.session.userName();
    //Logging to the console that the middleware started
    console.log("Starting Check User in Session middleware")
    if (!userInSession) {
        //No user found send a log to the console and return a 404
        console.log('No user found in session');
        return res.status(404).json({
            success: false,
            message: "No user found in session"
        })
    }
    try {
        //User found log the user to the console as confirmation
        console.log(`User in Session Found: >>>>>>>>${userInSession}<<<<<<<`);
        //Next step in the chain
        return next();
    } catch (error) {
        //Uncaught Errors:
        console.log(error.message)
        return res.status(500).json({
            success: false,
            error: error.message
        })
    }
    //Done!
}

const destroySession = async (req, res, next) => {
    try {
        //Attempt to destroy the session
        req.session.destroy((err)=>{
            console.log(`An explicit error has occurred while destroying session: ${err.message}`)
            return res.status(400).json({
                success:false,
                message:`An explicit error has occurred while destroying session: ${err.message}`
            })
        })
        //Proceed with the next step on the chain
        next()
    } catch (error) {
        //Catch Uncaught errors
        console.log(`An uncaught error has occurred while destroying the session: ${error.message}`)
        res.status(500).json({
            success: false,
            message: 'An uncaught error has occurred while destroying the session',
            error: error.message
        })
    }
}

module.exports = {
    createSession,
    destroySession,
    checkSession
}