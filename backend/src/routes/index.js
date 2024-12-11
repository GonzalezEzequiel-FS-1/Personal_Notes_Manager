const express = require('express');
const router = express.Router()
const testServer = require('../controllers/test');

const {
    createUser,
    signin,
    signOff
} = require('../controllers/userRoutes');
const { checkUser } = require('../utils/checkUser');
const checkUserSession = require('../middlewares/checkSession')

router.get('/test', testServer);
router.post('/signup', checkUserSession, createUser)
router.post('/signin', checkUserSession, signin)
router.post('/logout', signOff)
router.post('/print', (req,res)=>{
    const userSession = req.session.userName
    try {
        console.log(req.session.user)
        res.status(200).json({
            success:true,
            message:req.session.userName
        })
    } catch (error) {
        console.error(error.message)
    }
})

module.exports = router;