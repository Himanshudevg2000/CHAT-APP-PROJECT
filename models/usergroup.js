const Sequelize = require('sequelize')

const sequelize = require('./database')

const Usergroup = sequelize.define('usergroup', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    isadmin: {
        type: Sequelize.BOOLEAN,
        byDefault: false,
        allowNull: false
    }
})

module.exports = Usergroup