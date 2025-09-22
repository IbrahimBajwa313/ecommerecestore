import mongoose, { type Document, Schema } from "mongoose"

export interface IProduct extends Document {
  name: string
  description: string
  price: number
  originalPrice?: number
  category: mongoose.Types.ObjectId
  images: string[]
  stock: number
  sku: string
  status: "active" | "inactive" | "out_of_stock"
  features: string[]
  specifications: { [key: string]: string }
  rating: number
  reviewCount: number
  tags: string[]
  seoTitle?: string
  seoDescription?: string
  createdAt: Date
  updatedAt: Date
}

const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    originalPrice: { type: Number },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    images: [{ type: String }],
    stock: { type: Number, required: true, default: 0 },
    sku: { type: String, required: true, unique: true },
    status: {
      type: String,
      enum: ["active", "inactive", "out_of_stock"],
      default: "active",
    },
    features: [{ type: String }],
    specifications: { type: Map, of: String },
    rating: { type: Number, default: 0 },
    reviewCount: { type: Number, default: 0 },
    tags: [{ type: String }],
    seoTitle: { type: String },
    seoDescription: { type: String },
  },
  {
    timestamps: true,
  },
)

// Index for search functionality
ProductSchema.index({ name: "text", description: "text", tags: "text" })

export default mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema)
