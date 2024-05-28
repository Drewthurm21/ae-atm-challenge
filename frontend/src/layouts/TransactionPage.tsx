import PageWrapper from "./PageWrapper";
import { standardFormClasses } from "../components/styles";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { usdFormatter } from "../utils";
import useAuth from "../hooks/useAuth";
import StandardInput from "../components/StandardInput";
import StandardButton from "../components/StandardButton";

export default function TransactionPage() {
  const navigateTo = useNavigate();
  const { currentUser } = useAuth();
  const { pathname } = useLocation();
  const transactionType = pathname === "/deposit" ? "deposit" : "withdraw";

  return (
    currentUser && (
      <PageWrapper>
        <form className={standardFormClasses}>
          <StandardInput
            label={`Enter amount to ${transactionType}.`}
            value={usdFormatter.format(100)}
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
