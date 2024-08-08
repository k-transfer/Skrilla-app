const db = require('../models');

const Account = db.Account;
const Transaction = db.Transaction;

exports.transfer = async (req, res) => {
    try {
        const { recieverId, amount } = req.body;
        const senderAccount = await Account.findOne({ where: {
            userId: req.userId } });
            const recieverAccount = await Account.findOne({ where: {
                userId: recieverId } });

                if (!senderAccount || !recieverAccount) {
                    return res.status(404).send({ message: 'Sender or Reciever account NOT FOUND!' });
                }

                if (senderAccount.balance < amount) {
                    return res.status(400).send({ message: 'Insufficient Funds.' });
                }

                senderAccount.balance -= parseFloat(amount);
                recieverAccount.balance += parseFloat(amount);
            
            await senderAccount.save();
        await recieverAccount.save();
    
    const transaction = await Transaction.create({
        senderId: senderAccount.id,
        recieverId: recieverAccount.id, amount,
        currency: senderAccount.currency,
        status: 'completed',
        timestamp: new Date()
    });
    res.status(200).send({ message: 'Transfer Successful!', transaction });
} catch (err) {
    res.status(500).send({ message: err.message });
}
};

exports.getTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.findAll({
            where: {
                [db.Sequelize.Op.or]: [
                    { senderId: req.userId },
                    { recieverId: req.userId }
                ]
            }
        });

        res.status(200).send({ transaction });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};