const { z } = require("zod");

const signUpSchema = z.object({
  username: z
    .string({ required_error: "username is required" })
    .trim()
    .min(5, { message: "username must be atleast 5 charecters" })
    .max(15, { message: "username must not be more than 20 charecters" }),
  password: z
    .string({ required_error: "password is required " })
    .trim()
    .min(10, { message: "password must be atleast 10 charecters" })
    .max(20, { message: "password must not be more than 20 charecters" }),
  email: z
    .string({ required_error: "email is required" })
    .trim()
    .email({ message: "invalid email address" })
    .min(12, { message: "email must be atleast 12 charecters" })
    .max(30, { message: "email must not be more than 30 charecters" }),
  phone: z
    .string({ required_error: "phone number is required" })
    .trim()
    .min(10, { message: "phone number must be atleast 10 charecters" })
    .max(20, { message: "phone number must not be more than 20 charecters" }),
});

module.exports = signUpSchema;
