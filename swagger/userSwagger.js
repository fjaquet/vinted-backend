const { OpenAPIRegistry } = require("@asteasolutions/zod-to-openapi");
const { loginSchema, signupSchema } = require("../validations/userValidation");

const userRegistry = new OpenAPIRegistry();

userRegistry.registerPath({
  method: "post",
  path: "/user/login",
  summary: "login",
  request: {
    body: {
      content: {
        "application/json": { schema: loginSchema },
      },
    },
  },
  responses: {
    200: {
      description: "Login succeed, returns token ",
    },
    400: {
      description: "Parameter validation failed",
    },
    401: {
      description: "Unauthorized",
    },
    500: {
      description: "Internal server error",
    },
  },
});

userRegistry.registerPath({
  method: "post",
  path: "/user/signup",
  summary: "Signup",
  request: {
    body: {
      content: {
        "application/json": { schema: signupSchema },
      },
    },
  },
  responses: {
    201: {
      description: "User created",
    },
    400: {
      description: "Parameter validation failed",
    },
    500: {
      description: "Internal server error",
    },
  },
});

module.exports = userRegistry;
