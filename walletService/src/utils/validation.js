<<<<<<< HEAD
const joi = require("joi")

const validation = (value) =>{
    const schema = joi.object({
        userId: joi.string().required(),
        username : joi.string().required(),
        amount : joi.number().required()
    })
    return schema.validate(value)
}

=======
const joi = require("joi")

const validation = (value) =>{
    const schema = joi.object({
        userId: joi.string().required(),
        username : joi.string().required(),
        amount : joi.number().required()
    })
    return schema.validate(value)
}

>>>>>>> 1770bd5944385bbb24c15fe468a8dc778cd480e0
module.exports = validation