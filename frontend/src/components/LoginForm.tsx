import { useState } from "react";
import { standardFormClasses } from "../styles/styles";
import { returnDigitsOnly } from "../utils";
import StandardButton from "./StandardButton";
import StandardInput from "./StandardInput";

export default function LoginForm({
  sendLoginRequest,
}: {
  sendLoginRequest: (id: number) => void;
}) {
  const [loginFormData, setLoginFormData] = useState({ account_id: "" });

  const handleUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    let account_id = returnDigitsOnly(e.target.value);
    setLoginFormData({ account_id });
  };

  const handleLogin = () => {
    sendLoginRequest(Number(loginFormData.account_id));
  };

  return (
    <div className={standardFormClasses}>
      <StandardInput
        name="account_id-input"
        label="Enter account ID to login."
        maxLength={8}
        placeholder={"•••••••••"}
        hidePlaceholder
        mask={returnDigitsOnly}
        onChange={handleUpdate}
      />
      <StandardButton type="submit" onClick={handleLogin}>
        Sign in
      </StandardButton>
    </div>
  );
}
