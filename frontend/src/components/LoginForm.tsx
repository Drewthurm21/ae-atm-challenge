import { useState } from "react";
import { standardFormClasses } from "./styles";
import StandardButton from "./StandardButton";
import StandardInput from "./StandardInput";

export default function LoginForm({
  sendLoginRequest,
}: {
  sendLoginRequest: (id: number) => void;
}) {
  const [loginFormData, setLoginFormData] = useState({ account_id: "" });

  const handleUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    let account_id = sanitizeNumberInput(e.target.value);
    setLoginFormData({ account_id });
  };

  const handleLogin = () => {
    sendLoginRequest(Number(loginFormData.account_id));
  };

  return (
    <form className={standardFormClasses} onSubmit={(e) => e.preventDefault()}>
      <StandardInput
        name="account_id-input"
        label="Account ID"
        value={loginFormData.account_id}
        placeholder={"•••••••••"}
        onChange={handleUpdate}
      />
      <StandardButton type="submit" onClick={handleLogin} className="w-64 h-12">
        Sign in
      </StandardButton>
    </form>
  );
}
