import React from "react";
import "./userdetail.scss";
import Image from "next/image";
import img from "../../../image/girl2.jpg";
import { fetchUsersId } from "@/libs/data";
import { updateUser } from "@/libs/action";
const UsersDetails = async ({ params }) => {
  const { id } = params;

  const user = await fetchUsersId(id);
  return (
    <div className={"userDetails"}>
      <div className={"imageContainer"}>
        <div className={"imageDetail"}>
          <Image src={user.img || img} alt="image" className=" object-cover" />
        </div>
        {user.username}
      </div>
      <div className={"formContainer"}>
        <form action={updateUser} className={"formdetail"}>
          <input type="hidden" name="id" value={user._id} />
          <label>Username</label>
          <input type="text" name="username" placeholder={user.username} />
          <label>Email</label>
          <input type="email" name="email" placeholder={user.email} />
          <label>Password</label>
          <input type="password" name="password" placeholder="password" />
          <label>Phone</label>
          <input type="text" name="phone" placeholder={user.phone} />
          <label>Address</label>
          <textarea type="text" name="address" placeholder={user.address} />
          <label>Is Admin?</label>
          <select name="isAdmin" id="isAdmin">
            <option value={true} selected={user.isAdmin}>
              Yes
            </option>
            <option value={false} selected={!user.isAdmin}>
              No
            </option>
          </select>
          <label>Is Active?</label>
          <select name="isActive" id="isActive">
            <option value={true} selected={user.isActive}>
              Yes
            </option>
            <option value={false} selected={!user.isActive}>
              No
            </option>
          </select>
          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
};

export default UsersDetails;
