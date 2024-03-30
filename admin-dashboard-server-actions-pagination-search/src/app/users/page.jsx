import "./users.scss";
import Search from "@/ui/dashboard/search/Search";
import Link from "next/link";
import Image from "next/image";
import img from "../../image/girl2.jpg";
import Pagination from "@/ui/dashboard/pagination/Pagination";
import { fetchUsers } from "@/libs/data";
import { DeleteUsers } from "@/libs/action";
const UsersPage = async ({ searchParams }) => {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  const { users, countUsers } = await fetchUsers(q, page);

  const count = countUsers;
  return (
    <div className="containerUsers">
      <div className="top">
        <Search placeholder={"search Form"} />
        <Link href={"/users/addusers"}>
          <button className="addButton">Add New</button>
        </Link>
      </div>
      <table className="table">
        <thead>
          <tr>
            <td>Name</td>
            <td>Email</td>
            <td>Created At</td>
            <td>Role</td>
            <td>Status</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {users.map((item) => (
            <>
              <tr>
                <td>
                  <div className="user">
                    <Image
                      src={item.img || img}
                      alt="image"
                      width={40}
                      height={40}
                      className="userImage"
                    />
                    {item.username}
                  </div>
                </td>
                <td>{item.email}</td>
                <td>{item.createdAt?.toString().slice(4, 15)}</td>
                <td>{item.isAdmin ? "Admin" : "Client"}</td>
                <td>{item.isActive ? "Active" : "passive"}</td>
                <td>
                  <div className={"buttons"}>
                    <Link href={`/users/${item._id}`}>
                      <button className={`button view`}>View</button>
                    </Link>
                    <form action={DeleteUsers}>
                      <input value={item._id} type="hidden" name="id" />
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

export default UsersPage;
