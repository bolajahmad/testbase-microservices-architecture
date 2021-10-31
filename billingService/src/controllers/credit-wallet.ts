import express from 'express';
import { v4 } from 'uuid';
import { BillingSchema, CreditWalletModel } from '../models';

type Request = express.Request<never, never, CreditWalletModel>;

export const CreditWalletController = (request: Request, response: express.Response) => {
    const { userId, amount, payer } = request.body;

    try {
        const billing = new BillingSchema({
            billAmount: amount,
            date: new Date().getTime(),
            invoiceNo: v4(),
            payerId: payer.id,
            receiverId: userId,
            status: 'Pending'
        })

        billing.save((err, billing) => {
            if (err) throw err;

            return response.status(201).json({ data: billing })
        })
    } catch (error) {
        console.log({ error });
    }
}