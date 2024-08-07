const db = require('../models');
const account = require('../models/account');

const Account = db.Account;

exports.getAccount = async (req, res) => {
    try {
        const account = await Account.findOne({ where: {
            userId: req.userId } });

            if (!account) {
                return res.status(404).send({ message: 'Account not found!' });
            }
            res.status(200).send({ account });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.deposit = async (req, res) => {
    try {
        const { amount } = req.body;
        const account = await Account.findOne({ where: {
            userId: req.userId } });

            if (!account) {
                return res.status(404).send({ message: 'Sorry! Account not found!' });
            }

            account.balance += parseFloat(amount);
            await account.save();
        res.status(200).send({ message: 'Deposit successful!', balance: account.balance }); 
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.withdraw = async (req, res) => {
    try {
        const { amount } = req.body;
        const account = await Account.findOne({ where: {
            userId: req.userId } });
    }

    catch (account) < amount; {
        return res.status(400).send({ message: 'OOps! Sorry, Insufficient Funds!' });
    }

    account.balance -= parseFloat(amount);
    await account.save();
    res.status(200).send({ message: 'Withdrawal successful!',
        balance: account.balance });
    }; try {
        const { amount } = req.body;
        const account = await Account.findOne({ where: {
            userId: req.balance } });
        res.status(500).send({ message: err.message });
    };