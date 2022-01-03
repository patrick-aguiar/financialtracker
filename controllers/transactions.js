import TransactionSchema from "../models/Transactions.js";

// @description  Get all transaction
// @route  GET /api/v1/transactions connected to transactions inside routes
const getTransactions = async (req, res, next) => {
  try {
    const transactions = await TransactionSchema.find();

    return res.status(200).json({
      success: true,
      count: transactions.length,
      data: transactions,
    });
  } catch (error) {
    console.log(`Error: ${err.message}`.red);
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

// @description  Add transaction
// @route  Post /api/v1/transactions connected to transactions inside routes
const addTransactions = async (req, res, next) => {
  try {
    const { text, amount } = req.body;

    const transactions = await TransactionSchema.create(req.body);

    return res.status(201).json({
      success: true,
      data: transactions,
    });
  } catch (err) {
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((val) => val.message);

      return res.status(400).json({
        success: false,
        error: messages,
      });
    } else {
      console.log(`Error: ${err.message}`.red);
      return res.status(500).json({
        success: false,
        error: "Server Error",
      });
    }
  }
};

// @description  DELETE transaction
// @route  DELETE /api/v1/transactions:id connected to transactions inside routes
const deleteTransactions = async (req, res, next) => {
  try {
    const transaction = await TransactionSchema.findById(req.params.id);
    if (!transaction) {
      return res.status(404).json({
        success: true,
        error: "No transaction found",
      });
    }

    await transaction.remove();

    return res.status(200).json({
      success: true,
      data: transaction,
      message: 'Successful deleted'
    });
  } catch (err) {
    console.log(`Error: ${err.message}`.red);
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

export { getTransactions, addTransactions, deleteTransactions };
