const { OpenAPIRegistry } = require("@asteasolutions/zod-to-openapi");
const {
  getOffersSchema,
  publishOfferSchema,
  updateOfferSchema,
  objectIdSchema,
} = require("../validations/offerValidation");

const { bearerAuthName } = require("./authSwagger");

const offerRegistry = new OpenAPIRegistry();

offerRegistry.registerPath({
  method: "post",
  path: "/offer/publish",
  summary: "result",
  security: [{ [bearerAuthName]: [] }],
  request: {
    query: publishOfferSchema,
  },
  responses: {
    200: {
      description:
        "Returns the number of offers matching query, and the list of all corresponding offers",
    },

    401: {
      description: "Invalid Token or authentication failed.",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: { type: "string" },
            },
          },
          examples: {
            invalidTokenFormat: {
              summary: "Invalid token format",
              value: { message: "Invalid token format" },
            },
            unauthorized: {
              summary: "Unauthorized",
              value: { message: "Unauthorized" },
            },
          },
        },
      },
    },

    500: {
      description: "Internal server error",
    },
  },
});

offerRegistry.registerPath({
  method: "put",
  path: "/offer/{id}",
  summary: "Update specific offer",
  request: {
    params: objectIdSchema,
    query: updateOfferSchema,
  },

  responses: {
    200: {
      description: "Offer deleted",
    },
    400: {
      description: "Invalid Id format",
    },
    500: {
      description: "Internal server error",
    },
  },
});

offerRegistry.registerPath({
  method: "delete",
  path: "/offer/{id}",
  summary: "Delete specific offer",
  request: {
    params: objectIdSchema,
  },

  responses: {
    200: {
      description: "Offer deleted",
    },
    400: {
      description: "Invalid Id format",
    },
    500: {
      description: "Internal server error",
    },
  },
});

offerRegistry.registerPath({
  method: "get",
  path: "/offers/",
  summary: "Get all offers or offers corresponding query",
  request: {
    query: getOffersSchema,
  },

  responses: {
    200: {
      description:
        "Returns the number of offers matching query, and the list of all corresponding offers",
    },
    500: {
      description: "Internal server error",
    },
  },
});

offerRegistry.registerPath({
  method: "get",
  path: "/offers/{id}",
  summary: "Get specific offer",
  request: {
    params: objectIdSchema,
  },

  responses: {
    200: {
      description: "Returns the offer if exists or Offer not found",
    },
    400: {
      description: "Invalid Id format",
    },
    500: {
      description: "Internal server error",
    },
  },
});

module.exports = offerRegistry;
