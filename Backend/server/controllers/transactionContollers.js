const Transaction = require('../models/Transaction'); // Supposons que vous avez un modèle Transaction

exports.getAccountTransactions = async (req, res) => {
  try {
    const { accountId } = req.params;
    const transactions = await Transaction.find({ accountId }); // Adaptez à votre ORM/ODM
    
    res.status(200).json({
      status: 200,
      message: "Account's transactions retrieved successfully",
      body: transactions
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.updateTransactionCategory = async (req, res) => {
  try {
    const { transactionId } = req.params;
    const { category } = req.body;
    
    const updatedTransaction = await Transaction.findByIdAndUpdate(
      transactionId,
      { category },
      { new: true }
    );
    
    res.status(200).json({
      status: 200,
      message: "Transaction category updated successfully",
      body: updatedTransaction
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.updateTransactionNote = async (req, res) => {
  try {
    const { transactionId } = req.params;
    const { note } = req.body;
    
    const updatedTransaction = await Transaction.findByIdAndUpdate(
      transactionId,
      { note },
      { new: true }
    );
    
    res.status(200).json({
      status: 200,
      message: "Transaction note updated successfully",
      body: updatedTransaction
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};