import PageWrapper from "./PageWrapper";
import LoginForm from "../components/LoginForm";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigateTo = useNavigate();
  const { loginUser } = useAuth();

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
