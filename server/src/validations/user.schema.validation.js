import Joi from "joi";

const userSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(8)
    .regex(/[A-Z]/, "one uppercase letter") // Al menos una letra mayúscula
    .regex(/[a-z]/, "one lowercase letter") // Al menos una letra minúscula
    .regex(
      /[!@#\$%\^&\*\(\)\-_+=\[\]{};':"\\|,.<>\/?]+/,
      "one special character"
    ) // Al menos un carácter especial
    .required(),
});

export default userSchema;
