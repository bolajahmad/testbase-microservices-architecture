import { Schema, model } from 'mongoose';
import { IEmailConfig } from './emailCofig.model';

const emailSchema = new Schema({
  email: {
    type: String,
    required: true,
    min: 3,
    max: 60,
  },
  subject: {
      type: String,
      required: true,
      min: 3,
  },
  html: {
      type: String,
      required: true,
      min: 10
  }
})

export const EmailSchema = model<IEmailConfig>('Email', emailSchema);