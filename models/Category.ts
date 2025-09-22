import mongoose, { type Document, Schema } from "mongoose"

export interface ICategory extends Document {
  name: string
  slug: string
  description?: string
  image?: string
  parent?: mongoose.Types.ObjectId
  isActive: boolean
  sortOrder: number
  seoTitle?: string
  seoDescription?: string
  createdAt: Date
  updatedAt: Date
}

const CategorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String },
    image: { type: String },
    parent: { type: Schema.Types.ObjectId, ref: "Category" },
    isActive: { type: Boolean, default: true },
    sortOrder: { type: Number, default: 0 },
    seoTitle: { type: String },
    seoDescription: { type: String },
  },
  {
    timestamps: true,
  },
)

export default mongoose.models.Category || mongoose.model<ICategory>("Category", CategorySchema)
