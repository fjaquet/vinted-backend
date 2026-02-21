const z = require("zod");

const signupSchema = z.object({
  username: z.string(),
  email: z.email(),
  password: z.string(),
  newsletter: z.boolean(),
});

const loginSchema = z.object({
  email: z.email(),
  password: z.string(),
});

module.exports = { signupSchema, loginSchema };
