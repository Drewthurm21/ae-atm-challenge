import PageWrapper from "./PageWrapper";
import { standardFormClasses } from "../styles/styles";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAccounts from "../hooks/useAccount";
import useAuth from "../hooks/useAuth";
import StandardButton from "../components/StandardButton";

export default function Dashboard() {
  const navigateTo = useNavigate();
  const { loadAccount } = useAccounts();
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser) loadAccount(currentUser.id);
    else navigateTo("/login");
  }, [currentUser, navigateTo]);

  return (
    currentUser && (
      <PageWrapper>
        <div className={standardFormClasses}>
          <div className="flex mb-12">
            <p className="text-xl self-start font-semibold mb-2">
              Welcome back{`, ${currentUser.name.split(" ")[0]}`}! Please select
              an option...
            </p>
          </div>
          <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
            {dashboardCardData.map((card) => (
              <DashboardCard key={card.title} {...card} />
            ))}
          </div>
          <StandardButton
            className="mt-12"
            onClick={() => navigateTo("/login")}
          >
            Log out
          </StandardButton>
        </div>
      </PageWrapper>
    )
  );
}

interface CardProps {
  title: string;
  subtitle: string;
  href: string;
}

const DashboardCard = ({ title, subtitle, href }: CardProps) => {
  return (
    <Link
      to={href}
      className="relative w-64 h-40 p-4 rounded border-[1px] border-slate-300 overflow-hidden group bg-white"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary-100 to-primary-200 translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-300" />
      <h3 className="relative z-10 font-medium text-lg text-slate-950 group-hover:text-white duration-300">
        {title}
      </h3>
      <p className="relative z-10 text-slate-400 group-hover:text-violet-200 duration-300">
        {subtitle}
      </p>
    </Link>
  );
};

const dashboardCardData = [
  {
    title: "Withdrawal",
    subtitle: "Withdrawal cash",
    href: "/withdrawal",
  },
  {
    title: "Check Balance",
    subtitle: "Check your balance",
    href: "/balance",
  },
  {
    title: "Deposit",
    subtitle: "Make a deposit",
    href: "/deposit",
  },
];
