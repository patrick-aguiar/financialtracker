import express from "express";

import {getTransactions, addTransactions , deleteTransactions}  from "../controllers/transactions.js";

const transactionsRoute = express.Router();

transactionsRoute
    .route("/")
    .get(getTransactions)
    .post(addTransactions);

transactionsRoute
    .route('/:id')
    .delete(deleteTransactions)

export default transactionsRoute;
