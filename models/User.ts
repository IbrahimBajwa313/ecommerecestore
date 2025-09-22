import mongoose, { type Document, Schema } from "mongoose"

export interface IUser extends Document {
  name: string
  email: string
  password?: string
  role: "customer" | "admin"
  avatar?: string
  phone?: string
  addresses: {
    type: "shipping" | "billing"
    street: string
    city: string
    state: string
    zipCode: string
    country: string
    isDefault: boolean
  }[]
  createdAt: Date
  updatedAt: Date
}

const AddressSchema = new Schema({
  type: {
    type: String,
    enum: ["shipping", "billing"],
    required: true,
  },
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zipCode: { type: String, required: true },
  country: { type: String, required: true },
  isDefault: { type: Boolean, default: false },
})

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    role: { type: String, enum: ["customer", "admin"], default: "customer" },
    avatar: { type: String },
    phone: { type: String },
    addresses: [AddressSchema],
  },
  {
    timestamps: true,
  },
)

export default mongoose.models.User || mongoose.model<IUser>("User", UserSchema)
