const authReducer = (state = { auth: null }, action) => {
  switch (action.type) {
    case "REGISTER":
      localStorage.setItem("user", JSON.stringify(action.payload));
      return {
        ...state,
        auth: action.payload,
      };
    case "LOGIN":
      localStorage.setItem("user", JSON.stringify(action.payload));
      return {
        ...state,

        auth: action.payload,
      };
    case "LOGOUT":
      localStorage.removeItem("user");
      return {
        ...state,
        auth: null,
      };
    default:
      return state;
  }
};
export default authReducer;
