import React from "react";
import { Link, Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/home/Home";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import useToken from "./hooks/useToken";
import Footer from "./components/Footer";
import Header from "./components/Header";

const App = () => {
  const [token] = useToken();

  console.log(token);
  return (
    <div className="h-screen flex flex-col">
      {token.token ? <Navigate to="/" /> : null}
      <Header />
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
