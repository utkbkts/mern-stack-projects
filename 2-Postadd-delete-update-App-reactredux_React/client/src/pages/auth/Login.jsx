import React, { useState } from "react";
import { LoginActions, RegisterActions } from "../../redux/actions/auth";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const Login = () => {
  const [signUp, setSignUp] = useState(true);
  const [authData, setAuthData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const dispatch = useDispatch();

  const onchangeFunc = (e) => {
    setAuthData({ ...authData, [e.target.name]: e.target.value });
  };

  const authFunch = () => {
    if (signUp) {
      dispatch(RegisterActions(authData));
    } else {
      dispatch(LoginActions(authData));
    }
  };
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="">
        <div>
          <h1 className="text-center text-4xl mb-4">Sign In</h1>
          <div className="flex flex-col items-center gap-2 w-[400px] border p-2">
            <input
              onChange={onchangeFunc}
              type="text"
              placeholder="Username"
              name="username"
              value={authData.username}
              className="border bg-transparent text-black py-2 px-4  w-full outline-none focus:border-b-blue-700"
            />
            <input
              onChange={onchangeFunc}
              value={authData.email}
              type="email"
              placeholder="Email"
              name="email"
              className="border bg-transparent text-black py-2 px-4  w-full outline-none focus:border-b-blue-700"
            />
            <input
              value={authData.password}
              onChange={onchangeFunc}
              type="password"
              placeholder="password"
              name="password"
              className="border bg-transparent text-black py-2 px-4  w-full outline-none focus:border-b-blue-700"
            />

            <button
              type="button"
              onClick={authFunch}
              className="bg-blue-700 text-white w-full py-2 px-4 rounded-md"
            >
              Sign In
            </button>
            <Link to={"/register"} className="cursor-pointer">
              Do you haven't an account ?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
