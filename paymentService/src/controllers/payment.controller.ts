import axios from "axios";
import { PaymentSchema, VerifyPaymentModel } from '../models';
import express from 'express';
require('dotenv').config();
import { handlePropsValidation } from "../utils";
import MessageBroker from "../messaging";

type Request = express.Request<never, never, VerifyPaymentModel>;

export const verifyPaymentController = async (request: Request, response: express.Response) => {
    const { accountNumber, bankCode, reference, email, amount, user } = request.body;
    console.log({ user })
    handlePropsValidation({ reference, bankCode, accountNumber, email, amount });

    try {
        const verifyResponse = await axios({
            method: 'GET',
            url: `https://api.paystack.co/transaction/verify/${reference}`,
            headers: {
                "Authorization": `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
            }
        });

        if (!verifyResponse || !verifyResponse.data) throw response;

        const paymentData = verifyResponse.data.data;
        const data = {
            amount: paymentData.amount,
            currency: paymentData.currency,
            transactionDate: paymentData.transaction_date,
            status: paymentData.status,
            reference: paymentData.reference,
        }

        const payments = new PaymentSchema({
            wallet_id: user.id,
            paid_by: user.username,
            paid_to: reference,
            payment_amount: paymentData.amount / 100,
            status: paymentData.status
        });
        const billingData = { 
            userId: user.id, 
            billAmount: amount, 
            invoiceNo: 1, 
            status: data.status 
        }
        
        const broker = await MessageBroker.getInstance();
        await broker.send('add-billing', Buffer.from(JSON.stringify(billingData)));
        
        payments.save((err) => {
            if (err) {
                return response.status(400).json({
                    message: 'Update Failed',
                    isSuccessful: false,
                    description: undefined,
                    data: null
                });
            }

            response.status(200).json({
                message: 'Payment Verified', 
                isSuccessful: true,
                data
            });
        }); 
    } catch (error) {
        console.log({ error });
        throw new Error('Payment Verification Failed');
    };
}