import axios from "axios";

export const RegisterActions = (authData) => async (dispatch) => {
  try {
    const { data } = await axios.post(
      "http://localhost:5000/register",
      authData
    );
    dispatch({ type: "REGISTER", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const LoginActions = (authData) => async (dispatch) => {
  try {
    const { data } = await axios.post("http://localhost:5000/login", authData);
    dispatch({ type: "LOGIN", payload: data });
  } catch (error) {
    console.log(error);
  }
};
