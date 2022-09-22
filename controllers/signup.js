const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

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


function generateAccessToken(id) {
    return jwt.sign({userid:id}, 'CHATAPP')
}

exports.login = (req,res) => {
    const email = req.body.email;
    const password = req.body.password;

    if(isstringinvalid(email) || isstringinvalid(password)){
        return res.status(404).json({success: false, message:'emailid or password is missing'})
    }

    User.findAll({where : {email}})
        .then(response => {
            if(response.length > 0){
                bcrypt.compare(password,response[0].password, (err,result) => {
                    if(err){
                        return res.json({success:false, message:'Something Wrong'})
                    }
                    if(result === true) {
                        const jwttoken = generateAccessToken(response[0].id)
                        console.log(jwttoken)
                        res.status(200).json({token: jwttoken, success:true, message:'login Successfully'})
                    }else{
                        return res.status(400).json({success: false, message:'password is incorrect'})
                    }
                })
            }else{
                return res.status(404).json({success: false, message: 'User does not exist'})
            }
        })
        .catch(err => {
            res.status(500).json({success:false,message: err})
        })
}
