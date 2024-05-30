import { useEffect } from "react";
import PageWrapper from "./PageWrapper";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../hooks/reduxHooks";
import { standardFormClasses } from "../styles/styles";
import { selectCurrentAccount } from "../store/accounts/accountSelectors";
import { usdInputMask } from "../utils";
import useAuth from "../hooks/useAuth";
import StandardButton from "../components/StandardButton";

export default function BalancePage() {
  const navigateTo = useNavigate();
  const { currentUser } = useAuth();
  const currentAccount = useAppSelector(selectCurrentAccount);

  useEffect(() => {
    if (!currentUser || !currentAccount) navigateTo("/login");
  }, [currentUser, navigateTo, currentAccount]);

  return (
    currentAccount && (
      <PageWrapper>
        <div className={standardFormClasses}>
          <div className="flex">
            <p className="text-xl self-start font-semibold mb-2">
              Current account balance...
            </p>
          </div>
          <div className="text-4xl font-bold text-primary-500 my-12">
            {currentAccount.balance && usdInputMask(currentAccount.balance)}
          </div>
          <div className="grid gap-4 grid-cols-2">
            <StandardButton onClick={() => navigateTo("/home")}>
              Back to Dashboard
            </StandardButton>
            <StandardButton onClick={() => navigateTo("/login")}>
              Log out
            </StandardButton>
          </div>
        </div>
      </PageWrapper>
    )
  );
}
