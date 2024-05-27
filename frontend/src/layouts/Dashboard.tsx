import PageWrapper from "./PageWrapper";
import { standardFormClasses } from "../components/styles";

export default function Dashboard() {
  return (
    <PageWrapper>
      <div className={standardFormClasses}>
        <div className="grid gap-44 grid-cols-1 lg:grid-cols-3">
          <p className="text-xl self-start font-semibold mb-2">
            Select an option
          </p>
        </div>
        <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
          {dashboardCardData.map((card) => (
            <DashboardCard key={card.title} {...card} />
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}

interface CardProps {
  title: string;
  subtitle: string;
  href: string;
}

const DashboardCard = ({ title, subtitle, href }: CardProps) => {
  return (
    <a
      href={href}
      className="relative w-64 h-40 p-4 rounded border-[1px] border-slate-300 overflow-hidden group bg-white"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary-100 to-primary-200 translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-300" />
      <h3 className="relative z-10 font-medium text-lg text-slate-950 group-hover:text-white duration-300">
        {title}
      </h3>
      <p className="relative z-10 text-slate-400 group-hover:text-violet-200 duration-300">
        {subtitle}
      </p>
    </a>
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
