const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    balance: {
        type: Number,
        default: 0,
    },
});

const User = mongoose.model('User', userSchema);

module.exports = User;


module.exports =  (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        username: {
            type: DataTypes.STRING, unique: true,
            allowNull: false },
        password: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, unique: true,
        allowNull: false },
    }, {
        hooks: {
            beforeCreate: async (user) => {
                user.password = await bcrypt.hash(user.password, 10);
            }
        }
    });
    return User;
};