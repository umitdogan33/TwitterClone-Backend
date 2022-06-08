const Joi = require("joi");

const CreateValidation = Joi.object({
    full_name:Joi.string().required().min(2),
    password:Joi.string().required().min(8),
    email:Joi.string().required().min(8),
})

const LoginValidation = Joi.object({
    password:Joi.string().required().min(8),
    email:Joi.string().required().min(8),
})

const ChangePasswordValidation = Joi.object({
    password:Joi.string().required().min(8),
})

const UpdateValidation = Joi.object({
    full_name:Joi.string().required(),
    email:Joi.string().required().min(8),
    profil_image:Joi.string(),
})

const PasswordUpdateValidation = Joi.object({
    current_password:Joi.string().required(),
    new_password:Joi.string().required(),
    confirm_password:Joi.string().required(),
})


module.exports={
    CreateValidation,
    LoginValidation,
    UpdateValidation,
    PasswordUpdateValidation,
    ChangePasswordValidation,
}