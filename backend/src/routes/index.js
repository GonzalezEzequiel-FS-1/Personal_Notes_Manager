const express = require('express');
const router = express.Router()
const testServer = require('../controllers/test');

const {
    createUser,
    signin,
    signOff
} = require('../controllers/userRoutes');
const { createSession, destroySession } = require('../middlewares/sessionMiddleware');

router.get('/test', testServer);
router.post('/signup', createSession, createUser)
router.post('/signin', signin)
router.post('/logout', destroySession, signOff)

module.exports = router;