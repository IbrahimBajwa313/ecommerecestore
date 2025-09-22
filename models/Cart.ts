import mongoose, { type Document, Schema } from "mongoose"

export interface ICart extends Document {
  user: string // Can be user ID or session ID for guests
  items: {
    product: mongoose.Types.ObjectId
    quantity: number
    addedAt: Date
  }[]
  createdAt: Date
  updatedAt: Date
}

const CartItemSchema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, required: true, min: 1 },
  addedAt: { type: Date, default: Date.now },
})

const CartSchema = new Schema<ICart>(
  {
    user: { type: String, required: true }, // Can be ObjectId for logged users or session ID for guests
    items: [CartItemSchema],
  },
  {
    timestamps: true,
  },
)

// Index for faster queries
CartSchema.index({ user: 1 })

export default mongoose.models.Cart || mongoose.model<ICart>("Cart", CartSchema)
