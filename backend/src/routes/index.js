const express = require('express');
const router = express.Router()
const testServer = require('../controllers/test');

const {
    createUser,
    signin,
    signOff
} = require('../controllers/userRoutes');
const { createSession, destroySession, checkSession } = require('../middlewares/sessionMiddleware');
const { createNote, getAllNotes } = require('../controllers/noteControllers/noteControllers');

router.get('/test', testServer);
router.post('/signup', createSession, createUser)
router.post('/signin',createSession, signin)
router.get('/logout', signOff)
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
    console.log('Checking user in session', req.session);
    
    // Ensure the session exists and has data
    if (!req.session.isAuthenticated || req.session.isAuthenticated === false) {
        console.error('No user in session');
        return res.status(404).json({
            success: true,
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
            session: req.session,
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

//Notes Routes
router.post("/createnote", createNote);
router.get('/fetchnotes/:user', getAllNotes)
module.exports = router;