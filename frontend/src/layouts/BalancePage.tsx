import PageWrapper from "./PageWrapper";
import { standardFormClasses } from "../components/styles";
import useAccounts from "../hooks/useAccount";

export default function BalancePage() {
  const { currentAccount } = useAccounts();

  return (
    <PageWrapper>
      <div className={standardFormClasses}>
        <div className="grid gap-44 grid-cols-1 lg:grid-cols-3">
          <p className="text-xl self-start font-semibold mb-2">
            Current account balance...
          </p>
        </div>
        <div className="grid gap-4 items-center">
          <div className="text-4xl font-bold text-primary-500">
            {currentAccount.balance || "nope"}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
