import express from 'express';
import { IBillingModel, BillingSchema, CreditWalletModel } from '../models';

type Request = express.Request<never, never, CreditWalletModel>

export const createBillingController = ({ body }: Request, response: express.Response) => {
    // const { userId, amount, invoiceNo, status } = body;
    const date = new Date();

//    try { 
//     //    const billing = new BillingSchema({
//     //        userId, billAmount, date, invoiceNo, status
//     //    });
//     //    console.log({ billing });

//         // billing.save((err, data) => {
//         //     if (err) {
//         //         throw err
//         //     }

//         //     return response.status(201).json({
//         //         message: 'Successfully debited wallet',
//         //         isSuccessful: true,
//         //         data
//         //     })
//         // })
//     } catch (err) {
//         console.log({ err });
//         response.status(400).json({
//             message: 'Failed to Bill Wallet',
//             isSuccessful: false,
//             data: undefined
//        });
//     }
};