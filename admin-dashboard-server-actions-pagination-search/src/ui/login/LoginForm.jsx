"use client";

import { authenticate } from "@/libs/action";
import { useFormState } from "react-dom";

const LoginForm = () => {
  const [state, formAction] = useFormState(authenticate, undefined);

  return (
    <form action={formAction} className={"formlogin"}>
      <h1>Login</h1>
      <input type="text" placeholder="username" name="username" />
      <input type="password" placeholder="password" name="password" />
      <button type="submit">Login</button>
      {state && state}
    </form>
  );
};

export default LoginForm;
