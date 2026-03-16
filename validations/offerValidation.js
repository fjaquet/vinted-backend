const z = require("zod");
const mongoose = require("mongoose");
const { extendZodWithOpenApi } = require("@asteasolutions/zod-to-openapi");

extendZodWithOpenApi(z);

const getOffersSchema = z.object({
  title: z.string().optional(),
  priceMin: z.coerce.number().gte(0).optional(),
  priceMax: z.coerce.number().gte(0).optional(),
  sort: z.coerce.string().optional(),
  page: z.coerce.number().positive().optional(),
});

const publishOfferSchema = z.object({
  title: z.string().min(1).max(50),
  description: z.string().min(1).max(500),
  price: z.coerce.number().positive().lt(100000),
  brand: z.string().min(1),
  size: z.string().min(1),
  condition: z.string().min(1),
  color: z.string().min(1),
  city: z.string().min(1),
});

const updateOfferSchema = z.object({
  product_name: z.string().min(1).max(50).optional(),
  product_description: z.string().min(1).max(500).optional(),
  product_price: z.coerce.number().positive().lt(100000).optional(),
  brand: z.string().min(1).optional(),
  size: z.string().min(1).optional(),
  condition: z.string().min(1).optional(),
  color: z.string().min(1).optional(),
  city: z.string().min(1).optional(),
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
