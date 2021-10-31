import {EmailSchema} from "../models";
import express from 'express';

export const fetchEmailController = async (request: express.Request<{ id?: string; }>, response: express.Response) => {
  const id = request.params.id;
  console.log({ id });

  try {
    const emailDetails = EmailSchema.find((err, data) => {
      if (err) {
        throw err;
      }

      return data
    })
    console.log({ emailDetails })
    
    return response.status(201).json({
      message: 'Email Sent Successfully',
      isSuccessful: true,
      data: emailDetails
    });
  } catch (error) {
    return response.status(400).json({ 
      message: (error as any).message,
      isSuccessful: false,
      data: undefined
    });
  }
};
