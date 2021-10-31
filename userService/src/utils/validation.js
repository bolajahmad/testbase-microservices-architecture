const joi = require("joi");
const { schema } = require("../models/user.model");

const registerValidator = (value) => {
  const userSchema = joi.object({
    first_name: joi.string().min(3).max(60).required(),
    last_name: joi.string().min(3).max(60).required(),
    username: joi.string().email().min(3).max(60).required(),
    password: joi.string().min(8).max(115).required().error((errors) => new Error('"foo" requires a positive number'))
  });

  return userSchema.validate(value);
};

const loginValidator = (value) => {
  const userSchema = joi.object({
    username: joi.string().email().min(3).max(60).required(),
    password: joi.string().min(8).max(115).required(),
  });

  return userSchema.validate(value);
};

module.exports = { registerValidator, loginValidator };
