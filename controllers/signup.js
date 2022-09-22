const User = require('../models/user')
const bcrypt = require('bcrypt')

function isstringinvalid(string){
    if(string == undefined || string.length === 0){
        return true;
    }
    else{
        return false;
    }
}

exports.signup = (req,res) => {

    const name = req.body.name
    const email = req.body.email
    const phoneNumber = req.body.phoneNumber
    const password = req.body.password

    const saltrounds = 10

    if(isstringinvalid(name) || isstringinvalid(email) || isstringinvalid(password)) {
        return res.status(500).json({success:false, message:'name or email or password is missing'})
    }

    bcrypt.hash(password, saltrounds, (err,hash) => {

        User.create({
            name:name,
            email:email,
            phoneNumber:phoneNumber,
            password:hash
        })
        .then(result => {
            console.log(result)
            res.status(200).json({success: true,result})
        })
        .catch(err => {
            res.status(500).json({err})
            console.log(err)
        })
    })
}