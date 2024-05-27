import { useState } from "react";
import StandardButton from "./StandardButton";

export default function LoginForm({
  sendLoginRequest,
}: {
  sendLoginRequest: (id: number) => void;
}) {
  const [loginFormData, setLoginFormData] = useState({ account_id: "" });

  const handleFormUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginFormData({ ...loginFormData, [name]: value });
  };

  const handleLogin = () => {
    sendLoginRequest(Number(loginFormData.account_id));
  };

  return (
    <form
      className="flex flex-col h-[40vh] w-[55vw] rounded-md shadow-md border-zinc-700 bg-gradient-to-br from-indigo-400 to-indigo-600 items-center justify-center"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="mb-12">
        <div className="mb-1.5 flex items-end justify-between">
          <label htmlFor="account_id-input" className="block text-zinc-400">
            Enter account number to log in
          </label>
        </div>
        <input
          id="account_id-input"
          type="text"
          name="account_id"
          onChange={handleFormUpdate}
          min={0}
          placeholder="••••••••••••"
          className="w-full md:w-96 md:h-12 rounded-md border border-zinc-700 bg-white px-3 text-center py-2 placeholder-zinc-500 ring-1 ring-transparent transition-shadow focus:outline-0 focus:ring-blue-700"
        />
      </div>
      <StandardButton type="submit" onClick={handleLogin} className="w-64 h-12">
        Sign in
      </StandardButton>
    </form>
  );
}
