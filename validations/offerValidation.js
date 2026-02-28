const z = require("zod");
const mongoose = require("mongoose");
const { extendZodWithOpenApi } = require("@asteasolutions/zod-to-openapi");

extendZodWithOpenApi(z);

const getOffersSchema = z.object({
  title: z.string().optional(),
  priceMin: z.coerce.number().positive().optional(),
  priceMax: z.coerce.number().positive().optional(),
  sort: z.coerce.number().positive().optional(),
  page: z.coerce.number().positive().optional(),
});

const publishOfferSchema = z.object({
  product_name: z.string().max(50),
  product_description: z.string().max(500),
  product_price: z.coerce.number().positive().lt(100000),
  brand: z.string(),
  size: z.string(),
  condition: z.string(),
  color: z.string(),
  city: z.string(),
});

const updateOfferSchema = z.object({
  product_name: z.string().max(50).optional(),
  product_description: z.string().max(500).optional(),
  product_price: z.coerce.number().positive().lt(100000).optional(),
  brand: z.string().optional(),
  size: z.string().optional(),
  condition: z.string().optional(),
  color: z.string().optional(),
  city: z.string().optional(),
});

const objectIdSchema = z.object({
  id: z
    .custom((id) => mongoose.isValidObjectId(id), "Invalid Id format")
    .openapi({ type: "string", description: "ObjectId" }),
});

module.exports = {
  getOffersSchema,
  publishOfferSchema,
  updateOfferSchema,
  objectIdSchema,
};
