"use server";
import { User } from "@/models/userModels";
import { ConnectionDb } from "./db";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { Product } from "@/models/productModels";
import { revalidatePath } from "next/cache";
import { auth, signIn } from "@/auth";
export const AddUser = async (formData) => {
  "use server";
  const { username, email, password, phone, address, isAdmin, isActive } =
    Object.fromEntries(formData);
  try {
    await ConnectionDb();
    const hash = await bcrypt.hash(password, 12);
    const newUser = new User({
      username,
      email,
      password: hash,
      phone,
      address,
      isAdmin,
      isActive,
    });
    await newUser.save();
  } catch (error) {
    console.log(error);
  }
  revalidatePath("/users");
  redirect("/users");
};

export const updateUser = async (formData) => {
  "use server";
  const { id, username, email, password, phone, address, isAdmin, isActive } =
    Object.fromEntries(formData);
  try {
    await ConnectionDb();

    const updateFields = {};
    if (username) updateFields.username = username;
    if (email) updateFields.email = email;
    if (password) updateFields.password = password;
    if (phone) updateFields.phone = phone;
    if (address) updateFields.address = address;
    if (isAdmin !== undefined) updateFields.isAdmin = isAdmin;
    if (isActive !== undefined) updateFields.isActive = isActive;
    Object.keys(updateFields).forEach(
      (key) =>
        updateFields[key] === "" || (undefined && delete updateFields[key])
    );
    await User.findByIdAndUpdate(id, updateFields);
  } catch (error) {
    console.log(error);
  }
  revalidatePath("/users");
  redirect("/users");
};

export const AddProductS = async (formData) => {
  "use server";
  const { title, desc, price, stock, color, size, cat } =
    Object.fromEntries(formData);
  try {
    await ConnectionDb();
    const newProduct = new Product({
      title,
      desc,
      price,
      stock,
      cat,
      color,
      size,
    });
    await newProduct.save();
  } catch (error) {
    console.log(error);
  }
  revalidatePath("/products");
  redirect("/products");
};

export const updateProduct = async (formData) => {
  const { id, title, desc, price, stock, color, size } =
    Object.fromEntries(formData);

  try {
    ConnectionDb();

    const updateFields = {
      title,
      desc,
      price,
      stock,
      color,
      size,
    };

    Object.keys(updateFields).forEach(
      (key) =>
        (updateFields[key] === "" || undefined) && delete updateFields[key]
    );

    await Product.findByIdAndUpdate(id, updateFields);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to update product!");
  }

  revalidatePath("/products");
  redirect("/products");
};

export const DeleteProducts = async (formData) => {
  "use server";
  const { id } = Object.fromEntries(formData);
  try {
    await ConnectionDb();
    await Product.findByIdAndDelete(id);
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
  revalidatePath("/products");
  redirect("/products");
};

export const DeleteUsers = async (formData) => {
  "use server";
  const { id } = Object.fromEntries(formData);
  try {
    await ConnectionDb();
    await User.findByIdAndDelete(id);
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
  revalidatePath("/users");
  redirect("/users");
};

export const authenticate = async (prevState, formData) => {
  const { username, password } = Object.fromEntries(formData);

  try {
    await signIn("credentials", { username, password });
  } catch (err) {
    if (err.message.includes("CredentialsSignin")) {
      return "Wrong Credentials";
    }
    throw err;
  }
};
