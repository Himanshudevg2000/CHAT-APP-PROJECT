const User = require('../models/user')
const Message = require('../models/messages')
const Group = require('../models/group')
const usergroup = require('../models/usergroup')

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
    const groupId = req.params.id
    Message.create({messages:messages, userId:req.user.id, groupId: groupId})
        .then(result=> {
            console.log(result)
            return res.status(201).json({success:true, message: 'message sent'})
        })
        .catch(err => {
            console.log(err)
            return res.status(500).json({success:false, message: 'message did not sent'})
        })
}

exports.getmessages = (req,res) => {
    const groupId = req.params.id
    Message.findAll({ where: {groupId:groupId},include: [{model: User, required:false}]})
        .then(result => {
            return res.status(201).json({result ,success:true, message: " got messages"})
        })
        .catch(err => {
            return res.status(404).json({success:false, message: "didn't got messages"})
        })
}

exports.creategroup = (req,res) => {

    const groupname = req.body.groupname
    console.log(groupname)
    Group.create({name:groupname})
        .then(response => {
            usergroup.create({ isadmin:true, userId:req.user.id,groupId: response.id})
        })
        .then(result => {
            return res.status(201).json({success:true, result})
        })
        .catch(err => {
            return res.status(500).json({success:false,err})
        })
}

exports.getgroup = (req,res) => {
    
    usergroup.findAll({where:{userid:req.user.id},include: [{model: Group, required:false}]})
        .then(response => {
            return res.status(200).json({response})
        })
        .catch(err => {
            return res.status(500).json({err})
        })

}

exports.addusers = (req,res) => {
    const groupId = req.params.id
    const name = req.body.name
    User.findAll({where:{name:name}})
        .then(user => {
            const userId = user[0].id
            usergroup.create({isadmin:false,groupId:groupId, userId:userId})
                .then(response=> {
                    return res.status(201).json({message:"user added"})
                })
                .catch(err => {
                    return res.status(500).json({err})
                })
        })
        .catch(err => {
            return res.status(500).json({err})
        })
}


exports.getUsers = (req,res) => {
    const groupId = req.params.id

    usergroup.findAll({where:{groupId:groupId}, include: [{model: User, required:false}]})
        .then(response => {
            return res.status(200).json({response,myuser:req.user, success:true})
        })
        .catch(err => {
            return res.status(500).json({err,success:false})
        })
}

exports.removeuser = (req,res) => {
    const groupId = req.params.id
    const userId = req.body.id

    usergroup.destroy({where:{userId:userId, groupId:groupId}})
        .then(response => {
            return res.status(200).json({message:"removed", success:true})
        })
        .catch(err => {
            return res.status(500).json({err,success: false})
        })
}


exports.createadmin = (req,res) => {
    const groupId = req.params.id
    const userId = req.body.id

    usergroup.update( {isadmin:true} ,{where:{userId:userId, groupId:groupId}})
        .then(response => {
            return res.status(200).json({message: "admin created", success:true})
        })
        .catch(err => {
            return res.status(500).json({message:"cannot mmake admin", success:false})
        })
}

exports.removeadmin = (req,res) => {
    const groupId = req.params.id
    const userId = req.body.id

    usergroup.update( {isadmin:false} ,{where:{userId:userId, groupId:groupId}})
        .then(response => {
            return res.status(200).json({message: "admin removed", success:true})
        })
        .catch(err => {
            return res.status(500).json({message:"cannot remove admin", success:false})
        })
}