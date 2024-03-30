import React from "react";
import Image from "next/image";
import img from "../../../image/girl2.jpg";
import "./user.scss";
import { updateProduct } from "@/libs/action";
import { fetchProductsId } from "@/libs/data";
const ProductDetails = async ({ params }) => {
  const { id } = params;
  const product = await fetchProductsId(id);
  return (
    <div className={"containerDETAİLS"}>
      <div className={"infoContainer"}>
        <div className={"imgContainer"}>
          <Image src={img} alt="" fill />
        </div>
        {product.title}
      </div>
      <div className={"formContainer"}>
        <form action={updateProduct} className={"form"}>
          <input type="hidden" name="id" value={product.id} />
          <label>Title</label>
          <input type="text" name="title" placeholder={product.title} />
          <label>Price</label>
          <input type="number" name="price" placeholder={product.price} />
          <label>Stock</label>
          <input type="number" name="stock" placeholder={product.stock} />
          <label>Color</label>
          <input
            type="text"
            name="color"
            placeholder={product.color || "color"}
          />
          <label>Size</label>
          <textarea
            type="text"
            name="size"
            placeholder={product.size || "size"}
          />
          <label>Cat</label>
          <select name="cat" id="cat">
            <option value="kitchen">Kitchen</option>
            <option value="computers">Computers</option>
          </select>
          <label>Description</label>
          <textarea
            name="desc"
            id="desc"
            rows="10"
            placeholder={product.desc}
          ></textarea>
          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
};

export default ProductDetails;
