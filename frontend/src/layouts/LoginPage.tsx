import { useState } from "react";
import useAuth from "../hooks/useAuth";

export default function LoginPage() {
  const { loginUser, logoutUser } = useAuth();
  const [loginFormData, setLoginFormData] = useState({ account_id: "" });

  const handleFormUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginFormData({ ...loginFormData, [name]: value });
  };

  const sendLoginRequest = async () => {
    await loginUser(+loginFormData.account_id);
  };

  return (
    <div>
      <h1>Login Page</h1>
      <input
        type="text"
        name="account_id"
        placeholder="Account ID"
        value={loginFormData.account_id}
        onChange={handleFormUpdate}
      />
      <button onClick={sendLoginRequest}>Login</button>
      <button onClick={logoutUser}>logout</button>
    </div>
  );
}
