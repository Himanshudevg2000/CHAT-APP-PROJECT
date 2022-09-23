const express = require('express')

const cors = require('cors')

const bodyParser = require('body-parser')

const sequelize = require("./models/database");
const User = require("./models/user")
const Message = require("./models/messages")

const app = express()

const details = require('./routes/signup')
const chatroute = require('./routes/chatroutes')

app.use(cors())

app.use(bodyParser.json())
app.use('/signup',details)
app.use('/chatroutes',chatroute)

User.hasMany(Message)
Message.belongsTo(User)

sequelize
    .sync()
    // .sync({force:true})
    .then(() => {
        app.listen(9000)
    })

    .catch(err => {
        console.log(err)
    })


