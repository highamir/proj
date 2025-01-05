import mongoose from "mongoose";
const cartSchema = new mongoose.Schema({
  totalPrice: {
    type: Number,
    default: 0,
  },
  items: {
    type: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Productsss",
        },
        categoryId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Category",
        },
        productVariantId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "ProductVariant",
        },
        quantity:{
          type:Number,
          default:1
        }
      },
    ],
    default: [],
  },
});

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
  },
  idCard:{
    type:String,
    unique: [true, "idCard is exist"],
    match:[/^[0-9]{10}$/g,'idCard incorrect']
  }
  ,
  phone: {
    type: String,
    match: [
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/g,
      "phone number incorrect",
    ],
    required: [true, "phone number is required"],
    unique: [true, "phone number is exist"],
  },
  email: {
    type: String,
    match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, "email incorrect"],
    unique: [true, "email is exist"],
  },
  role: {
    type: String,
    enum: ["superAdmin", "admin", "user"],
    default: "user",
  },
  useDiscountCode: {
    type: Array,
    default: [],
  },
  favoriteProductIds: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    default: [],
  },
  recentlyProductIds: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    default: [],
  },

  cart:{
    type:cartSchema,
    default:{
        totalPrice:0,
        items:[]
    }
  },
  isActive:{
    type: Boolean,
    default: false,
  },
  boughtProduct: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    default: [],
  }
},{timestamps:true});

const User=mongoose.model('User',userSchema)
export default User