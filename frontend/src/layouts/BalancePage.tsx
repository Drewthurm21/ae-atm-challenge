import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../hooks/reduxHooks";
import { standardFormClasses } from "../styles/styles";
import { selectCurrentAccount } from "../store/accounts/accountSelectors";
import { motion } from "framer-motion";
import MessagingHeaders from "../components/MessagingHeader";
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

  const [dollars, cents] = currentAccount.balance!.split(".");

  return (
    currentAccount && (
      <PageWrapper>
        <div className={standardFormClasses}>
          <MessagingHeaders />
          <p className="mt-14">Your current balance is...</p>
          <div className="text-4xl font-bold text-primary-500 my-4">
            <motion.div
              initial={{ color: "#000000" }}
              animate={{ color: "#10ba68" }}
              transition={{ duration: 3 }}
            >
              $
              {currentAccount.balance && (
                <CountUp end={+dollars} duration={4} />
              )}
              .
              {cents
                ? currentAccount.balance && (
                    <CountUp end={+cents} duration={4} />
                  )
                : "00"}
            </motion.div>
          </div>
          <div className="grid gap-4 grid-cols-2 mt-12">
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
