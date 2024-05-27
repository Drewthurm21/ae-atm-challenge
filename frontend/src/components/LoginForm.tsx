import { useState } from "react";
import { standardFormClasses } from "./styles";
import { sanitizeAccountIdInput } from "../utils";
import StandardButton from "./StandardButton";
import StandardInput from "./StandardInput";

export default function LoginForm({
  sendLoginRequest,
}: {
  sendLoginRequest: (id: number) => void;
}) {
  const [loginFormData, setLoginFormData] = useState({ account_id: "" });

  const handleUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    let account_id = sanitizeAccountIdInput(e.target.value);
    setLoginFormData({ account_id });
  };

  const handleLogin = () => {
    sendLoginRequest(Number(loginFormData.account_id));
  };

  return (
    <form className={standardFormClasses} onSubmit={(e) => e.preventDefault()}>
      <StandardInput
        name="account_id-input"
        label="Enter account ID to login."
        value={loginFormData.account_id}
        placeholder={"•••••••••"}
        mask={sanitizeAccountIdInput}
        onChange={handleUpdate}
      />
      <StandardButton type="submit" onClick={handleLogin} className="w-64 h-12">
        Sign in
      </StandardButton>
    </form>
  );
}
