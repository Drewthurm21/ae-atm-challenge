import { standardFormClasses } from "../styles/styles";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import PageWrapper from "./PageWrapper";
import { usdInputMask } from "../utils";
import { useModal } from "../context/ModalProvider";
import useAuth from "../hooks/useAuth";
import useAccounts from "../hooks/useAccount";
import StandardInput from "../components/StandardInput";
import StandardButton from "../components/StandardButton";

export default function TransactionPage() {
  const navigateTo = useNavigate();
  const { openConfirmModal } = useModal();
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!currentUser) navigateTo("/login");
  }, [currentUser, navigateTo]);

  if (!currentUser) return null;

  const { validateTransaction, submitTransaction } = useAccounts();
  const { pathname } = useLocation();
  const transactionType = pathname === "/deposit" ? "credit" : "debit";

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
    const validatedTransaction = validateTransaction({
      transactionData,
      pathname,
    });
    if (validatedTransaction.hasErrors) return;

    const transaction = { transactionData, pathname, currentUser };
    openConfirmModal(() => submitTransaction(transaction));
  };

  return (
    <PageWrapper>
      <div className={standardFormClasses}>
        <StandardInput
          name={transactionType}
          label={`How much would you like to ${pathname.slice(1)}?`}
          placeholder={"$0.00"}
          mask={usdInputMask}
          maxLength={8}
          onChange={handleTransactionUpdate}
        />
        <div className="w-4/5 my-6 flex justify-evenly ">
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
