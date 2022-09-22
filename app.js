const express = require('express')

const cors = require('cors')

const bodyParser = require('body-parser')

const sequelize = require("./models/database");
const User = require("./models/user")

const app = express()

const details = require('./routes/signup')

app.use(cors())

app.use(bodyParser.json())
app.use('/signup',details)

sequelize
    .sync()
    // .sync({force:true})
    .then(() => {
        app.listen(9000)
    })

    .catch(err => {
        console.log(err)
    })


