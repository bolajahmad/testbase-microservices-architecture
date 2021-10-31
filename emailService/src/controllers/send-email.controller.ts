import { EmailSchema, IEmailConfig } from "../models";
import express from 'express';
import { handleEmailValidation } from "../utils";
import { sendConfirmationEmail } from "../config/node-mailer";

export const sendEmailController = (request: express.Request, response: express.Response) => {
    const { email, subject, html } = request.body;
    console.log({ body: request.body });

    handleEmailValidation({
      email,
      subject,
      html
    });
    const emailDetails = new EmailSchema({ email, subject, html });
    console.log({ emailDetails })
    sendConfirmationEmail({ email, subject, html });
    
    emailDetails.save((err, data) => {
      if (err) {
        return response.status(400).json({ 
          message: (err as any).message,
          isSuccessful: false,
          data: undefined
        });
      }
      console.log({ data });
      return response.status(201).json({
        message: 'Email Sent Successfully',
        isSuccessful: true,
        data
      });
    })
};
