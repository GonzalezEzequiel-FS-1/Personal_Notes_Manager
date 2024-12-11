const express = require('express');
const router = express.Router()
const testServer = require('../controllers/test');

const {
    createUser,
    signin,
    signOff
} = require('../controllers/userRoutes');
const { createSession, destroySession, checkSession } = require('../middlewares/sessionMiddleware');

router.get('/test', testServer);
router.post('/signup', createSession, createUser)
router.post('/signin', signin)
router.post('/logout', destroySession, signOff)
// router.get('/sessiontester', (req,res)=>{
//     console.log('Checking user in session')
//     const user = req.session;
//     console.log('From index function=>',JSON.stringify(res.locals))
//     if(!user){
//         console.error('No user in session')
//         return res.status(400).json({
//             success:false,
//             message:'No user in session'
//         })
//     }
//     try {
//         console.log(user);
//         return res.status(200).json({
//             success:true,
//             message:user
//         })
//     } catch (error) {
//         console.error(error.message)
//     }
// })

router.get('/sessiontester', (req, res) => {
    console.log('Checking user in session');
    
    // Ensure the session exists and has data
    if (!req.session || Object.keys(req.session).length === 0) {
        console.error('No user in session');
        return res.status(400).json({
            success: false,
            message: 'No user in session',
        });
    }

    try {
        // Log the session object for debugging
        console.log('Session object:', req.session);
        
        // Send the session data back to the client
        return res.status(200).json({
            success: true,
            message: 'User in session',
            session: req.session, // Include session details in the response
        });
    } catch (error) {
        // Handle unexpected errors
        console.error('Error while retrieving session:', error.message);
        return res.status(500).json({
            success: false,
            message: 'Internal server error while checking session',
        });
    }
});


module.exports = router;