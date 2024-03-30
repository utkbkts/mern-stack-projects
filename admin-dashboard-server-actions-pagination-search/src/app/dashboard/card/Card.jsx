import React from "react";
import "./card.scss";
import { MdSupervisedUserCircle } from "react-icons/md";
const Card = () => {
  return (
    <div className="cardContainer">
      <MdSupervisedUserCircle size={24} />
      <div className="texts">
        <span className="title">Total Users</span>
        <span className="number">10.78</span>
        <span className="detail">
          <span className="positive">12</span>
          more than
        </span>
      </div>
    </div>
  );
};

export default Card;
