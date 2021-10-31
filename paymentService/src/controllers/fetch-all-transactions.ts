import axios from "axios";
import { PaymentSchema, VerifyPaymentModel } from '../models';
import express from 'express';
require('dotenv').config();

type Request = express.Request<{ walletId?: string }>;

export const fetchTransactions = async (request: Request, response: express.Response) => {
    try {
        PaymentSchema.find((err, payments) => {
            if (err) {
                throw err;
            }

            return response.status(201).json({
                message: 'Transactions Retrieved Successfully',
                isSuccessful: true,
                data: payments.map((payment) => ({ ...payment, id: payment._id }))
            });
        });
    } catch (error) {
        console.log({ error });
        return response.status(404).json({
            message: 'Failed to Retrieved Transactions',
            isSuccessful: false,
            data: undefined
        })
    }
}