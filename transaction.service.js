const Transaction = require('./models/transaction.model');

require('./mongo').connect();

function getTransactions(req, res) {
    const docquery = Transaction.find({});
    docquery
        .exec()
        .then(transactions => {
            res.status(200).json(transactions);
        })
        .catch(error => {
            res.status(500).send(error);
            return;
        });
}

function deleteTransaction(req, res) {
    Transaction.findOneAndRemove(req.params.id)
        .then(transaction => {
            if (!checkFound(res, transaction)) return;
            res.status(200).json(transaction);
            console.log('Transaction deleted successfully!');
        })
        .catch(error => {
            if (checkServerError(res, error)) return;
        });
}

function createTransaction(req, res) {
    let transaction = new Transaction(req.body);
    transaction.save(error => {
        if (checkServerError(res, error)) return;
        res.status(200).json(transaction);
        console.log('Transaction created successfully');
    })
}

function createManyTransactions(req, res) {
    Transaction.collection.insertMany(req.body)
        .then(transactions => {
            console.log('Transactions created successfully');
            res.status(200).json(transactions);
        })
        .catch(error => {
            if (checkServerError(res, error)) return;
        });
}

function checkFound(res, Transaction) {
    if (!Transaction) {
        res.status(404).send('Transaction not found.');
        return;
    }
    return Transaction;
}

function checkServerError(res, error) {
    if (error) {
        res.status(500).send(error);
        return error;
    }
}

module.exports = {
    getTransactions,
    deleteTransaction,
    createTransaction,
    createManyTransactions
}