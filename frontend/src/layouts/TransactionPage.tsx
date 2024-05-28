import PageWrapper from "./PageWrapper";
import { standardFormClasses } from "../components/styles";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useAccounts from "../hooks/useAccount";
import useAuth from "../hooks/useAuth";
import StandardInput from "../components/StandardInput";
import StandardButton from "../components/StandardButton";

export default function TransactionPage() {
  const navigateTo = useNavigate();
  const { loadAccount } = useAccounts();
  const { currentUser } = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (!currentUser) {
      navigateTo("/login");
    } else {
      loadAccount(currentUser.id);
    }
  }, [currentUser, navigateTo]);

  return (
    currentUser && (
      <PageWrapper>
        <form className={standardFormClasses}>
          <StandardInput
            label={"Enter amount to deposit."}
            value={location.pathname}
            placeholder={"$0.00"}
            onChange={(s) => s}
          />
          <StandardButton onClick={() => navigateTo("/home")}>
            Back
          </StandardButton>
        </form>
      </PageWrapper>
    )
  );
}

interface CardProps {
  title: string;
  subtitle: string;
  href: string;
}
