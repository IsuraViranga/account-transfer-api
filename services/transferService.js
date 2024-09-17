const accounts = require('../models/accountModel');
const transactions = require('../models/transactionModel');

const transferFunds = (sourceAccount, destinationAccount, amount) => {
    if (!accounts[sourceAccount]) {
        throw new Error('Source account not found');
    }
    if (!accounts[destinationAccount]) {
        throw new Error('Destination account not found');
    }
    if (accounts[sourceAccount].balance < amount) {
        throw new Error('Insufficient balance');
    }

    accounts[sourceAccount].balance -= amount;
    accounts[destinationAccount].balance += amount;

    const transaction = {
        sourceAccount,
        destinationAccount,
        amount,
        date: new Date()
    };
    transactions.push(transaction);

    return transaction;
};

const getAccountBalance = (accountNumber) => {
    if (!accounts[accountNumber]) {
        throw new Error('Account not found');
    }
    return accounts[accountNumber].balance;
};

const getTransactions = () => transactions;

module.exports = { transferFunds, getAccountBalance, getTransactions };
