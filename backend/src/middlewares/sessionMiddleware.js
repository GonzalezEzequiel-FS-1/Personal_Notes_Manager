const { v4: uuidv4 } = require('uuid');
const createSession = async (req, res, next) => {
    const user = req.body.userName;
    const sessionID = uuidv4();
    console.log(`On CreateSession Middleware user variable ${user}`)

    if (!user) {
        console.log("No User found in the request's body");
        return res.status(404).json({ success: false, message: "No User found in the request's body" });
    }

    try {
        req.session.name = user;
        req.session.sessionID = sessionID;
        req.session.expires = Math.floor(Date.now() / 1000) + 3600;
        req.session.isAuthenticated = true

        console.log("Attempting to save session:", req.session);

        req.session.save((err) => {
            if (err) {
                console.error("Error saving session:", err.message);
                return res.status(500).json({ success: false, message: "Failed to save session", error: err.message });
            }
            console.log(`Session successfully created for user: ${user}`);
            next(); // Proceed to next middleware
        });
    } catch (error) {
        console.error("Error during session creation:", error.message);
        return res.status(500).json({ success: false, message: error.message });
    }
};

const checkSession = async (req, res, next) => {
    console.log("Session Check Middleware invoked");
    console.log("Session data:", req.session);

    const userInSession = req.session.name;
    if (!userInSession) {
        console.log("No user found in session");
        return res.status(404).json({ success: false, message: "No user found in session" });
    }
    try {
        console.log(`User in session: ${userInSession}`);
        next()
    } catch (error) {
        console.error(error.message)
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }

    //return res.status(200).json({ success: true, message: "User found in session", user: userInSession });
};

const destroySession = (req, res, next) => {
    try {
        console.log('Testing Middleware')
        next()
    } catch (error) {
        console.error(error.message)
    }
}
const destroySessiona = async (req, res, next) => {
    // Check for an active Session
    const user = req.session.userName;

    // If there is no session with a user attached, return with a 404
    if (!user) {
        console.log(`No session found`);
        return res.status(404).json({
            success: false,
            message: `No session found`
        });
    }

    try {
        // Attempt to destroy the session
        req.session.destroy((err) => {
            if (err) {
                console.log(`An explicit error has occurred while destroying session: ${err.message}`);
                return res.status(400).json({
                    success: false,
                    message: `An explicit error has occurred while destroying session: ${err.message}`
                });
            }

            // Logging the successful session destruction
            console.log(`Session destroyed for user: ${user}`);
            // return res.status(200).json({
            //     success: true,
            //     message: "Session successfully destroyed."
            // });
            next()
        });
    } catch (error) {
        // Catch Uncaught errors
        console.log(`An uncaught error has occurred while destroying the session: ${error.message}`);
        return res.status(500).json({
            success: false,
            message: 'An uncaught error has occurred while destroying the session',
            error: error.message
        });
    }
    //Done!
};

module.exports = {
    createSession,
    destroySession,
    checkSession
};
