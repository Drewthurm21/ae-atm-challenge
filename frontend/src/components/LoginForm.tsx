import { useState } from "react";
import { standardFormClasses } from "../styles/styles";
import { returnDigitsOnly, returnBullets } from "../utils";
import StandardButton from "./StandardButton";
import StandardInput from "./StandardInput";
import FadeWrapper from "./FadeWrapper";
import { motion } from "framer-motion";
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
    <FadeWrapper>
      <form
        className={standardFormClasses}
        onSubmit={(e) => e.preventDefault()}
      >
        <motion.h1
          initial={{ opacity: 0, y: 0, x: 0 }}
          animate={{ opacity: 1, y: -40, x: -60 }}
          transition={{ delay: 1 }}
          className="text-3xl font-bold text-center"
        >
          Welcome to the AE Portal,
        </motion.h1>
        <motion.h2
          initial={{ opacity: 0, y: 0, x: 0 }}
          animate={{ opacity: 1, y: -30, x: -50 }}
          transition={{ delay: 1.2 }}
          className="text-2xl text-center -translate-y-16 -translate-x-8"
        >
          please sign in here...
        </motion.h2>
        <StandardInput
          name="account_id-input"
          label="Enter account ID to login."
          maxLength={8}
          placeholder={"•••••••••"}
          hidePlaceholder
          mask={returnBullets}
          onChange={handleUpdate}
        />
        <div className="flex gap-16 translate-y-12">
          <StandardButton type="submit" onClick={handleLogin}>
            Submit
          </StandardButton>
          <StandardButton
            type="submit"
            onClick={() => sendLoginRequest(Math.floor(Math.random() * 5 + 1))}
          >
            Demo Login
          </StandardButton>
        </div>
      </form>
    </FadeWrapper>
  );
}
