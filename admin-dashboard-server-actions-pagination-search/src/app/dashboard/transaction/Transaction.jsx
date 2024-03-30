import React from "react";
import "./transaction.scss";
import Image from "next/image";
import img from "../../../image/girl2.jpg";
const Transaction = () => {
  return (
    <div className="TransactionContainer">
      <h3 className="title">Latest Transaction</h3>
      <table className="table">
        <thead>
          <tr>
            <td>Name</td>
            <td>Status</td>
            <td>Date</td>
            <td>Amount</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="image-wrapper">
              <Image
                src={img}
                alt="image"
                width={40}
                height={40}
                className="userImage"
              />
              John Doe
            </td>
            <td>
              <span className="status pending">Pending</span>
            </td>
            <td>14.02.24</td>
            <td>53.75</td>
          </tr>
          <tr>
            <td className="image-wrapper">
              <Image
                src={img}
                alt="image"
                width={40}
                height={40}
                className="userImage"
              />
              John Doe
            </td>
            <td>
              <span className="status pending">Pending</span>
            </td>
            <td>14.02.24</td>
            <td>53.75</td>
          </tr>{" "}
          <tr>
            <td className="image-wrapper">
              <Image
                src={img}
                alt="image"
                width={40}
                height={40}
                className="userImage"
              />
              John Doe
            </td>
            <td>
              <span className="status pending">Pending</span>
            </td>
            <td>14.02.24</td>
            <td>53.75</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Transaction;
