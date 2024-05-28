import { useEffect, useRef } from "react";
import PageWrapper from "./PageWrapper";
import LoginForm from "../components/LoginForm";
import useAuth from "../hooks/useAuth";
import useAccounts from "../hooks/useAccount";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigateTo = useNavigate();
  const { loginUser, logoutUser } = useAuth();
  const { clearAccounts } = useAccounts();
  const hasClearedStore = useRef(false);

  useEffect(() => {
    if (!hasClearedStore.current) {
      logoutUser();
      clearAccounts();
      hasClearedStore.current = true;
    }
  }, [logoutUser, clearAccounts]);

  const sendLoginRequest = async (id: number) => {
    const user = await loginUser(id);
    if (user) navigateTo("/home");
  };

  return (
    <PageWrapper>
      <LoginForm sendLoginRequest={sendLoginRequest} />
    </PageWrapper>
  );
}
