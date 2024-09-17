const { transferFunds, getAccountBalance, getTransactions } = require('../services/transferService');

// Controller for handling transfers
const transferController = {
    transfer: (req, res) => {
        const { sourceAccount, destinationAccount, amount } = req.body;

        try {
            const transaction = transferFunds(sourceAccount, destinationAccount, amount);
            res.status(200).json({ message: 'Transfer successful', transaction });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    getBalance: (req, res) => {
        const { accountNumber } = req.params;

        try {
            const balance = getAccountBalance(accountNumber);
            res.status(200).json({ accountNumber, balance });
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    },

    getTransactions: (req, res) => {
        try {
            res.status(200).json({transactions: getTransactions()});
        } catch(error) {
            res.status(404).json({ error: error.message });
        }
    }
};

module.exports = transferController;
