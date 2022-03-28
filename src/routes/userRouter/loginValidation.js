import Joi from 'joi'

const loginValidation = Joi.object({
    username: Joi.string().required(),
    password: Joi.string()
      .min(6)
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required(),
  });

  export default loginValidation