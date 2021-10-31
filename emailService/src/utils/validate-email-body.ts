import joi from "joi";
import { IEmailConfig } from "../models";

export const handleEmailValidation = (body: IEmailConfig) => {
  const { error } = emailValidator(body);
  if (error) {
    console.log({ error });
    throw Error(error.details[0].message);
  }
};

export const emailValidator = (value: IEmailConfig) => {
  const emailSchema = joi.object({
    html: joi.string().min(10).required(),
    subject: joi.string().min(3).max(60).required(),
    email: joi.string().email().min(3).max(60).required()
  });

  return emailSchema.validate(value);
};
