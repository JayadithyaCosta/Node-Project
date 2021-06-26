const Sequelize = require('sequelize');

const sequalize = new Sequelize('node-project', 'root', 'root', {
    dialect: 'mysql', 
    host: 'localhost'
});

module.exports = sequalize;

//Connection