
import nodemailer from "nodemailer";
import { IEmailConfig } from '../models';
require('dotenv').config();

const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
  },
});

export const sendConfirmationEmail = ({ email, subject, html }: IEmailConfig) => {
    transport.sendMail({
      from: process.env.MAIL_USERNAME,
      to: email,
      subject,
      html,
    }).catch(err => console.log(err));
  };