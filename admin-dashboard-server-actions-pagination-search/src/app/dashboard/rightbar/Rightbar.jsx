import React from "react";
import "./rightbar.scss";
import Image from "next/image";
import img from "../../../image/girl2.jpg";
const Rightbar = () => {
  return (
    <div className="RightBarcontainer">
      <div className="item">
        <div className="bgContainer">
          <Image src={img} alt="image" fill className="bg" />
        </div>
        <div className="texts">
          <span className="notification">Lorem, ipsum.</span>
          <h1 className="title">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi,
            saepe.
          </h1>
          <span className="subtitle">Lorem ipsum dolor sit.</span>
          <p className="desc">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis,
            facilis assumenda corporis impedit beatae magnam?
          </p>
          <div>
            <button className="button">Watch</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rightbar;
