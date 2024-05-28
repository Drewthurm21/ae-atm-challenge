import PageWrapper from "./PageWrapper";
import { standardFormClasses } from "../components/styles";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { withdrawalMask, usdFormatter, usdInputMask } from "../utils";
import useAuth from "../hooks/useAuth";
import StandardInput from "../components/StandardInput";
import StandardButton from "../components/StandardButton";

interface TransactionData {
  customer_id: number;
  account_id: number;
  debit: number;
  credit: number;
  amount: number;
}

export default function TransactionPage() {
  const navigateTo = useNavigate();
  const { currentUser } = useAuth();
  const { pathname } = useLocation();

  const [transactionData, setTransactionData] = useState({
    customer_id: 0,
    account_id: 0,
    debit: 0,
    credit: 0,
    amount: 0,
  });

  useEffect(() => {
    if (!currentUser) navigateTo("/login");
  }, [currentUser, navigateTo]);

  const handleTransactionUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTransactionData({ ...transactionData, [name]: +value, amount: +value });
  };

  const transactionType = pathname === "/deposit" ? "credit" : "debit";
  const inputMask = pathname === "/deposit" ? usdInputMask : withdrawalMask;

  return (
    currentUser && (
      <PageWrapper>
        <form className={standardFormClasses}>
          <StandardInput
            name={transactionType}
            label={`Enter amount to ${pathname.slice(1)}.`}
            placeholder={"$0.00"}
            mask={inputMask}
            maxLength={8}
            onChange={handleTransactionUpdate}
          />
          <StandardButton onClick={() => navigateTo("/home")}>
            Back
          </StandardButton>
        </form>
      </PageWrapper>
    )
  );
}
