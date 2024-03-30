import React from "react";
import "../users/users.scss";
import Search from "@/ui/dashboard/search/Search";
import Link from "next/link";
import Image from "next/image";
import img from "../../image/girl2.jpg";
import Pagination from "@/ui/dashboard/pagination/Pagination";
import { fetchProducts } from "@/libs/data";
import { DeleteProducts } from "@/libs/action";
const ProductPage = async ({ searchParams }) => {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  const { countProducts, products } = await fetchProducts(q, page);

  const count = countProducts;
  return (
    <div className="containerUsers">
      <div className="top">
        <Search placeholder={"search Form"} />
        <Link href={"/products/addproduct"}>
          <button className="addButton">Add New</button>
        </Link>
      </div>
      <table className="table">
        <thead>
          <tr>
            <td>Title</td>
            <td>Description</td>
            <td>Created At</td>
            <td>Price</td>
            <td>Stock</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <>
              <tr>
                <td>
                  <div className="user">
                    <Image
                      src={img}
                      alt="image"
                      width={40}
                      height={40}
                      className="userImage"
                    />
                    {product.title}
                  </div>
                </td>
                <td>{product.desc}</td>
                <td>{product.createdAt?.toString().slice(4, 15)}</td>
                <td>{product.price}$</td>
                <td>{product.stock}</td>
                <td>
                  <div className={"buttons"}>
                    <Link href={`/products/${product._id}`}>
                      <button className={`button view`}>View</button>
                    </Link>
                    <form action={DeleteProducts}>
                      <input value={product._id} type="hidden" name="id" />
                      <button className={`button delete`}>Delete</button>
                    </form>
                  </div>
                </td>
              </tr>
            </>
          ))}
        </tbody>
      </table>
      <Pagination count={count} />
    </div>
  );
};

export default ProductPage;
