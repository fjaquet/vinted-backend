const z = require("zod");

const signupSchema = z.object({
  username: z.string().min(1),
  email: z.email(),
  password: z.string().min(6),
  newsletter: z.boolean(),
});

const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(1),
});

module.exports = { signupSchema, loginSchema };
