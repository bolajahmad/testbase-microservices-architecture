import axios from "axios";
import express from 'express';
require('dotenv').config();

export const getBankList = async (request: express.Request, response: express.Response) => {
    await axios({
        method: 'GET',
        url: 'https://api.paystack.co/bank',
        headers: {
            "Authorization": `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
        }
    })
    .then((res) => res.data)
    .then((data) => {
        return response.status(200).json({
            message: data.message,
            data: data.data.map(({ name, code }: { name: string; code: string; }) => ({
                name,
                code
            })),
            isSuccessful: true
        });
    })
    .catch((err) => {
        console.log({ err });
        response.status(400).json({
            message: 'Request Failed',
            data: null,
            isSuccessful: false
        });
    })
}
