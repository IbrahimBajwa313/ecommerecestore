import mongoose from "mongoose"

const OrderSchema = new mongoose.Schema(
  {
    orderNumber: { type: String, required: true, unique: true },

    items: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
        name: String,
        price: Number,
        quantity: Number,
        image: String,
      },
    ],

    address: {
      fullName: String,
      phoneNumber: String,
      street: String,
      city: String,
      zipCode: String,
      country: String,
    },

    subtotal: Number,
    tax: Number,
    shipping: Number,
    total: Number,

    notes: String,

    paymentMethod: { type: String, default: "cod" },
    paymentStatus: { type: String, default: "pending" },
    orderStatus: { type: String, default: "pending" },
  },
  { timestamps: true }
)

export default mongoose.models.Order || mongoose.model("Order", OrderSchema)
