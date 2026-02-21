const z = require("zod");

const signupSchema = z.object({
  username: z.string(),
  email: z.email(),
  password: z.string(),
  newsletter: z.boolean(),
});

module.exports = signupSchema;
