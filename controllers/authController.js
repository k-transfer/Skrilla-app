const db = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config/config');

const User = db.User;

exports.register = async (req, res) => {
    try {
        const { username, password, email, phoneNumber } = req.body;
        const user = await User.create({ username, password, email, phoneNumber });
        res.status(201).send({ message: 'User registered successfully!', user });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(404).send({ message: 'User not found!' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).send({ message: 'Invalid password!' });
        }

        const token = jwt.sign({ id: user.id }, config.secret, { expiresIn: 86400 }); // 24 hours
        res.status(200).send({ token, user });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.logout = (req, res) => {
    //invalidate the token by client-side implementation
    res.status(200).send({ message: 'User logged out successfully.' });
};