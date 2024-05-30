import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../hooks/reduxHooks";
import { standardFormClasses } from "../styles/styles";
import { selectCurrentAccount } from "../store/accounts/accountSelectors";
import CountUp from "react-countup";
import PageWrapper from "./PageWrapper";
import useAuth from "../hooks/useAuth";
import StandardButton from "../components/StandardButton";

export default function BalancePage() {
  const navigateTo = useNavigate();
  const { currentUser } = useAuth();
  const currentAccount = useAppSelector(selectCurrentAccount);

  useEffect(() => {
    if (!currentUser || !currentAccount) navigateTo("/login");
  }, [currentUser, navigateTo, currentAccount]);
  if (!currentUser || !currentAccount) return null;

  const [dollars, cents] = currentAccount.balance.split(".");

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
            ${currentAccount.balance && <CountUp end={+dollars} duration={3} />}
            .
            {cents
              ? currentAccount.balance && <CountUp end={+cents} duration={3} />
              : "00"}
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
