import PageWrapper from "./PageWrapper";
import LoginForm from "../components/LoginForm";
import useAuth from "../hooks/useAuth";

export default function LoginPage() {
  const { loginUser } = useAuth();

  const sendLoginRequest = async (id: number) => await loginUser(id);

  return (
    <PageWrapper>
      <LoginForm sendLoginRequest={sendLoginRequest} />
    </PageWrapper>
  );
}
