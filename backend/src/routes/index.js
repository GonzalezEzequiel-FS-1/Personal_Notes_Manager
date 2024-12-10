const express = require('express');
const router = express.Router()
const testServer = require('../controllers/test');

const {
    createUser,
    signin,
    signOff
} = require('../controllers/userRoutes');

router.get('/test', testServer);
router.post('/signup', createUser)
router.post('/signin', signin)
router.post('/logout', signOff)

module.exports = router;