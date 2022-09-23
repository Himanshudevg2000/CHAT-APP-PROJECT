const jwt = require('jsonwebtoken')

const User = require('../models/user')

exports.authenticate = (req, res, next) => {
    
    try{

        const token = req.header('Authorization');
        console.log(token);
        
        const user = jwt.verify(token, 'CHATAPP')

        console.log(user.userid)
        User.findByPk(user.userid)
        .then(user => {

            req.user = user;
            next();
        })
        .catch(err => {
            throw new Error(err)
        })
    }
    catch(err){
        console.log(err)
        return res.status(404).json({success:false, message: 'failed to authenticate'})
    }
}