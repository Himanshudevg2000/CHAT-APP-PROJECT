const express = require('express')

const expresscontroller = require('../controllers/chat')

const authenticationmiddleware = require('../middleware/authorization');

const router = express.Router();

router.get('/chatroutes',authenticationmiddleware.authenticate, expresscontroller.chatmessage)

router.post('/messages',authenticationmiddleware.authenticate, expresscontroller.messages)

router.get('/getmessages',authenticationmiddleware.authenticate, expresscontroller.getmessages)

module.exports = router