const joi = require("joi")

const validation = (value) =>{
    const schema = joi.object({
        userId: joi.string().required(),
        username : joi.string().required(),
        amount : joi.number().required()
    })
    return schema.validate(value)
}

module.exports = validation