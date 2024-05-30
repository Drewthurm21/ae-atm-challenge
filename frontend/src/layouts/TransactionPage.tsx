import { standardFormClasses } from "../styles/styles";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { usdInputMask } from "../utils";
import { useModal } from "../context/ModalProvider";
import { motion } from "framer-motion";
import useAuth from "../hooks/useAuth";
import PageWrapper from "./PageWrapper";
import useAccounts from "../hooks/useAccount";
import AppearingText from "../components/AppearingText";
import StandardInput from "../components/StandardInput";
import StandardButton from "../components/StandardButton";

export default function TransactionPage() {
  const navigateTo = useNavigate();
  const { openConfirmModal } = useModal();
  const { currentUser } = useAuth();
  const messageRef = useRef<string[]>(messaging[Math.floor(Math.random() * 5)]);

  useEffect(() => {
    if (!currentUser) navigateTo("/login");
  }, [currentUser, navigateTo]);
  if (!currentUser) return null;

  const { pathname } = useLocation();
  const { validateTransaction, submitTransaction } = useAccounts();
  const transactionType = pathname === "/deposit" ? "credit" : "debit";
  const debit = transactionType === "debit";
  const [transactionData, setTransactionData] = useState({
    customer_id: currentUser.id,
    account_id: currentUser.id,
    debit: 0,
    credit: 0,
    amount: 0,
  });

  const handleTransactionUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const amount = parseInt(value.replace(/\D/gi, ""), 10) / 100;
    setTransactionData({ ...transactionData, [name]: amount, amount });
  };

  const handleTransactionSubmission = async () => {
    const pendingTransacton = validateTransaction({
      transactionData,
      pathname,
    });
    if (pendingTransacton.hasErrors) return;

    const transaction = { transactionData, pathname, currentUser };
    openConfirmModal(() => submitTransaction(transaction));
  };

  return (
    <PageWrapper>
      <div className={standardFormClasses}>
        <AppearingText
          words={messageRef.current[0]}
          className="text-3xl bold -translate-y-4 -translate-x-8"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <AppearingText
            words={messageRef.current[1]}
            className="text-2xl bold -translate-y-4 translate-x-8"
          />
        </motion.div>

        <p className="text-lg mt-4">
          {`How much would you like to ${pathname.slice(
            1,
            debit ? -2 : pathname.length
          )}?`}
        </p>
        <StandardInput
          name={transactionType}
          label={""}
          placeholder={"$0.00"}
          mask={usdInputMask}
          maxLength={debit ? 7 : 8}
          onChange={handleTransactionUpdate}
        />
        <div className="flex w-4/5 mt-6 justify-evenly translate-y-12">
          <StandardButton onClick={() => navigateTo("/home")}>
            Back
          </StandardButton>
          <StandardButton onClick={handleTransactionSubmission}>
            Submit
          </StandardButton>
        </div>
      </div>
    </PageWrapper>
  );
}

const messaging = [
  ["Need a loan?", "We're here for you."],
  ["Looking to invest?", "Let us guide you."],
  ["Trying to save?", "Let's make a plan."],
  ["Want financial advice?", "You can count on us."],
  ["Building credit?", "We can support you."],
];
