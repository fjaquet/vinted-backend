const { OpenAPIRegistry } = require("@asteasolutions/zod-to-openapi");

const authRegistry = new OpenAPIRegistry();

authRegistry.registerComponent("securitySchemes", "bearerAuth", {
  type: "http",
  scheme: "bearer",
  bearerFormat: "uid2",
});

module.exports = { authRegistry, bearerAuthName: "bearerAuth" };
