import { useState } from "react";
import useSignup from "../hooks/useSignup";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, error, isLoading } = useSignup();

  const submitHandler = async (e) => {
    e.preventDefault();

    await signup(email, password);
  };

  const emailHandler = function (e) {
    setEmail(e.target.value);
  };

  const passwordHandler = function (e) {
    setPassword(e.target.value);
  };

  return (
    <form className="signup" onSubmit={submitHandler}>
      <h3>Sign up</h3>

      <label>Email:</label>
      <input type="email" onChange={emailHandler} value={email} />

      <label>Password:</label>
      <input type="password" onChange={passwordHandler} value={password} />

      <button disabled={isLoading}>Sign up</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
}
