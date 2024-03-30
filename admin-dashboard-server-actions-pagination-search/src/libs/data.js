import { User } from "@/models/userModels";
import { ConnectionDb } from "./db";
import { Product } from "@/models/productModels";

export const fetchUsers = async (q, page) => {
  const regex = new RegExp(q, "i");
  const ITEM_PER_PAGE = 4;
  try {
    await ConnectionDb();
    const countUsers = await User.find({ username: { $regex: regex } }).count();
    const users = await User.find({ username: { $regex: regex } })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));
    return { countUsers, users };
  } catch (error) {
    console.log(error);
  }
};

export const fetchProducts = async (q, page) => {
  const regex = new RegExp(q, "i");
  const ITEM_PER_PAGE = 4;
  try {
    await ConnectionDb();
    const countProducts = await Product.find({
      title: { $regex: regex },
    }).count();
    const products = await Product.find({ title: { $regex: regex } })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));
    return { countProducts, products };
  } catch (error) {
    console.log(error);
  }
};

export const fetchProductsId = async (id) => {
  try {
    await ConnectionDb();
    const product = await Product.findById(id);
    return product;
  } catch (error) {
    console.log(error);
  }
};

export const fetchUsersId = async (id) => {
  try {
    await ConnectionDb();
    const user = await User.findById(id);
    return user;
  } catch (error) {
    console.log(error);
  }
};
