const User = require('../models/user')
const Message = require('../models/messages')

exports.chatmessage = (req,res) => {
    User.findAll()
    // req.user.getUsers()
        .then(result => {
            console.log(result)
            return res.status(201).json({result, success:true})
        })
}

exports.messages = (req,res) => {
    const messages = req.body.messages

    Message.create({messages:messages, userId:req.user.id})
        .then(result=> {
            console.log(result)
            return res.status(200).json({success:true, message: 'message sent'})
        })
        .catch(err => {
            console.log(err)
            return res.status(500).json({success:false, message: 'message did not sent'})
        })
}

exports.getmessages = (req,res) => {
    Message.findAll()
        .then(result => {
            return res.status(201).json({result ,success:true, message: " got messages"})
        })
        .catch(err => {
            return res.status(404).json({success:false, message: "didn't got messages"})
        })
}