import React, { useState } from "react";

export default function LoginPage() {
  const [loginFormData, setLoginFormData] = useState({ account_id: "" });

  const handleFormUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginFormData({
      ...loginFormData,
      [name]: value,
    });
  };

  const sendLoginRequest = () => {
    console.log(loginFormData);
    console.log("Sending login request...");
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
    </div>
  );
}
