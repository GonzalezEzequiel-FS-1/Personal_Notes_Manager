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
router.get('/sessiontester', (req,res)=>{
    console.log('Checking user in session')
    const user = req.session.userName;
    console.log(user)
})

module.exports = router;