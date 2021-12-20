import Joi from 'joi'

const userValidationRegister = Joi.object({
    username: Joi.string().min(4).max(25).required(),
    password: Joi.string().min(8).max(1000).required(),
    email: Joi.string().email().min(5).max(50).required(),
    phoneNumber: Joi.number().required(),
    name: Joi.string().min(4).max(50).required()
})


export default userValidationRegister;