const z = require("zod");

const publishOfferSchema = z.object({
  product_name: z.string().max(50),
  product_description: z.string().max(500),
  product_price: z.coerce.number().lt(100000),
  brand: z.string(),
  size: z.string(),
  condition: z.string(),
  color: z.string(),
  city: z.string(),
});

module.exports = publishOfferSchema;
