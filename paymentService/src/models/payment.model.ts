import { Schema, model } from "mongoose"

export interface IPaymentSchema {
    wallet_id: string;
    paid_by: string;
    paid_to: string;
    status: string;
    payment_amount : number;
}

const paymentSchema = new Schema({
    wallet_id: {
        type: String,
        required: true 
    },
    paid_by: {
        type: String,
        required: true
    },
    paid_to: {
        type: String,
        required: false
    },
    status: {
        type: String,
        required: true
    },
    payment_amount : {
        type: Number,
        required: true
    }
})

export const PaymentSchema = model<IPaymentSchema>("Payment", paymentSchema)