const Sequelize = require('sequelize')

const sequelize = require('./database')

const Messages = sequelize.define('chatmessage', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    messages: {
        type: Sequelize.STRING,
        allowNull: false
    }
} )

module.exports = Messages