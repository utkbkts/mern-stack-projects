import React from "react";
import "./addproduct.scss";
import { AddProductS } from "@/libs/action";
const AddProduct = () => {
  return (
    <div className={"addproductContainer"}>
      <form action={AddProductS} className={"form"}>
        <input type="text" placeholder="title" name="title" required />
        <select name="cat" id="cat">
          <option selected hidden disabled>
            Choose a Category
          </option>
          <option value="kitchen">Kitchen</option>
          <option value="mobile">Mobile</option>
          <option value="computer">Computer</option>
        </select>
        <input type="number" placeholder="price" name="price" required />
        <input type="number" placeholder="stock" name="stock" required />
        <input type="text" placeholder="color" name="color" />
        <input type="text" placeholder="size" name="size" />
        <textarea
          required
          name="desc"
          id="desc"
          rows="16"
          placeholder="Description"
        ></textarea>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddProduct;
