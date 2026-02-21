const z = require("zod");
const mongoose = require("mongoose");

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

const objectIdSchema = z.object({
  id: z.custom((id) => mongoose.isValidObjectId(id), "Invalid Id format"),
});

module.exports = { publishOfferSchema, objectIdSchema };
