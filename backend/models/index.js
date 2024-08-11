const { Sequelize } = require('sequelize');
const config = require('../config/config');
const { stringify } = require('querystring');


const sequelize = new Sequelize(config.databaseUrl, 'https://github.com/k-transfer/Skrilla-app.git', 
    'John', 'Doee', {});
    import Sequelize from 'sequelize';


const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models
db.User = require('./user')(sequelize, Sequelize);
db.Account = require('./account')(sequelize, Sequelize);
db.Transaction = require('./transaction')(sequelize, Sequelize);

// Associations
db.User.hasOne(db.Account);
db.Account.belongsTo(db.User);
db.Account.hasMany(db.Transaction, {
    as: 'sentTransactions', foreignKey: 'senderId' });
db.Account.hasMany(db.Transaction, {
    as: 'recievedTransactions', foreignKey: 'recieverId' });


    module.exports = db;
