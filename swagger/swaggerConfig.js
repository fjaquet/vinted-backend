const { OpenApiGeneratorV3 } = require("@asteasolutions/zod-to-openapi");

const userRegistry = require("./userSwagger");
const offerRegistry = require("./offerSwagger");
const { authRegistry } = require("./authSwagger");

const allDefinitions = [
  ...authRegistry.definitions,
  ...userRegistry.definitions,
  ...offerRegistry.definitions,
];

const generateSwaggerDoc = () => {
  const generator = new OpenApiGeneratorV3(allDefinitions);
  //   const generator = new OpenApiGeneratorV3(globalRegistry.definitions);

  return generator.generateDocument({
    openapi: "3.0.0",
    info: {
      version: "1.0.0",
      title: "Vinted Backend API",
    },
    servers: [{ url: "http://localhost:3000" }],
  });
};

module.exports = generateSwaggerDoc;
