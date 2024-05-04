import Joi from "joi";

let registerValidation = Joi.object()
  .keys({
    userName: Joi.string().required().min(3).max(10).messages({
      "any.required": "userName is required",
      "string.base": "userName filed must ne string",
      "string.min": "userName must be at least 3 character",
      "string.max": "userName must be at least 10 character",
    }),
    email: Joi.string()
      .required()
      .custom((value, msg) => {
        let validEmail = value.match(
          /^[a-z0-9._%+-]{1,25}@[a-z0-9.-]+\.[a-z]{2,}$/
        );
        if (validEmail) {
          return true;
        } else {
          return msg.message("email is not valid.");
        }
      }),
    phoneNumber: Joi.number().required().min(1000000000).max(9999999999),
    password: Joi.string()
      .required()
      .custom((value, msg) => {
        let validPassword = value.match(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/
        );
        if (validPassword) {
          return true;
        } else {
          return msg.message(
            "password mush have at least one uppercase, one lowercase,one special symbol,one number,min 8 character and max 15 character"
          );
        }
      }),
    dob: Joi.date().required(),
    address: Joi.string().required(),
    gender: Joi.string().required().valid("male", "female", "other").messages({
      "string.base": "gender must be string",
      "any.only": "gender must be either male , female, other",
    }),
    role: Joi.string().required().valid("admin", "superAdmin"),
    isVerifyEmail: Joi.string(),
  })
  .unknown(false);
export default registerValidation;
