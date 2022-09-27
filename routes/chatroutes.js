const express = require('express')

const expresscontroller = require('../controllers/chat')

const authenticationmiddleware = require('../middleware/authorization');

const router = express.Router();

router.get('/chatroutes',authenticationmiddleware.authenticate, expresscontroller.chatmessage)

router.post('/messages/:id',authenticationmiddleware.authenticate, expresscontroller.messages)

router.get('/getmessages/:id',authenticationmiddleware.authenticate, expresscontroller.getmessages)

router.post('/creategroup',authenticationmiddleware.authenticate, expresscontroller.creategroup)

router.get('/getgroup',authenticationmiddleware.authenticate, expresscontroller.getgroup)

router.post('/addusers/:id',expresscontroller.addusers)

router.get('/getUsers/:id',authenticationmiddleware.authenticate, expresscontroller.getUsers)

router.post('/removeuser/:id', expresscontroller.removeuser)

router.post('/createadmin/:id', expresscontroller.createadmin)

router.post('/removeadmin/:id', expresscontroller.removeadmin)

module.exports = router