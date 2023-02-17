import { useState } from "react";
import useLogin from "../hooks/useLogin";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();

  const submitHandler = async (e) => {
    e.preventDefault();

    await login(email, password);
  };

  const emailHandler = function (e) {
    setEmail(e.target.value);
  };

  const passwordHandler = function (e) {
    setPassword(e.target.value);
  };

  return (
    <form className="login" onSubmit={submitHandler}>
      <h3>Login</h3>

      <label>Email:</label>
      <input type="email" onChange={emailHandler} value={email} />

      <label>Password:</label>
      <input type="password" onChange={passwordHandler} value={password} />

      <button disabled={isLoading}>Login</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
}
