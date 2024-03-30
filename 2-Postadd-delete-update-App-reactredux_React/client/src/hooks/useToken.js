import React, { useEffect, useState } from "react";

const useToken = () => {
  const [token, setToken] = useState("");

  useEffect(() => {
    setToken(JSON.parse(localStorage.getItem("user")));
  }, []);
  return [token];
};

export default useToken;
