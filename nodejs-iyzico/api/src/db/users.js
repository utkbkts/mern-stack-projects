import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import Nanoid from "../utils/nanoid.js";
const { schema } = mongoose;
const { objectId } = Schema.Types;

const randomColorGenerator = () => {
  return Math.floor(Math.random() * 1677215).toString(16);
};

const usersSchema = new Schema(
  {
    uid: {
      type: String,
      default: Nanoid(),
      unique: true,
      required: true,
    },
    locale: {
      type: String,
      required: true,
      default: "tr",
      enum: ["tr", "en"],
    },
    role: {
      type: String,
      required: true,
      default: "user",
      enum: ["user", "admin"],
    },
    name: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    identifyNumber: {
      type: String,
      required: true,
      default: "000000000",
    },
    password: {
      type: String,
      required: true,
    },
    avatarUrl: {
      type: String,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
      default: "Turkey",
    },
    zipCode: {
      type: String,
      required: true,
    },
    ip: {
      type: String,
      required: true,
      default: "85.34.78.112",
    },
    cardUserKey: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

usersSchema.pre("save", async function (next) {
  try {
    this.password = await bcrypt.hash(this.password, 10);
    return next();
  } catch (error) {
    return next(error);
  }
});

const users = mongoose.model("User", usersSchema);
