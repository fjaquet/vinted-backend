const z = require("zod");

const payloadValidator = (schema, payloadType, parseType) => {
  return (req, res, next) => {
    try {
      if (!["body", "query", "params"].includes(payloadType)) {
        throw new Error(
          `Validation error: payloadType: '${payloadType}' is not handled. Use 'body', 'query' or 'params'`,
        );
      }
      if (parseType === "safeParse") {
        const result = schema.safeParse(req[payloadType]);
        if (result.success) {
          req.queryValidated = true;
          next();
        } else {
          req.queryValidated = false;
          next();
        }
      } else {
        schema.parse(req[payloadType]);
        next();
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          message: "Parameter validation failed",
          details: z.treeifyError(error),
        });
      }
      next(error);
    }
  };
};

module.exports = payloadValidator;
