import Joi from "joi";

let registerValidation = Joi.object()
  .keys({
    userName: Joi.string().required().min(3).max(15),
    dob:Joi.string().required(),
    gender:Joi.string().required().valid("male","female","other").message({
      "string.base":"gender must be string",
      "any.only":"gender must be either male ,female,other"
    }),
    country:Joi.string().required(),
    phoneNO:Joi.number().required(),
    email: Joi.string()
      .required()
      .custom((value, msg) => {
        let ValidEmail = value.match(
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        );
        if (ValidEmail) {
          return true;
        } else {
          return msg.message("email is not valid");
        }
      }),

    password: Joi.string()
      .required()
      .custom((value, msg) => {
        let isValidPassword = value.match(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()-_+=])[A-Za-z\d!@#$%^&*()-_+=]{8,16}$/
        );
        if (isValidPassword) {
          return true;
        } else {
          return msg.message(
            "password must be one caps,one small ,one special symbol,one number,min 8,max 16"
          );
        }
      }),
      conform:Joi.string().required()
  })
  .unknown(false);
export default registerValidation;
