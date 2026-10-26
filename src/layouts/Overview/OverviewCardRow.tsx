import { Users, DollarSign, Receipt } from "lucide-react";
import { CardRow } from "../../components";
const cards = [
  {
    id: "student-count",
    title: "Student Count",
    value: "54",
    icon: Users,
    iconBg: "bg-[#142B4A]",
    iconColor: "text-white",
    badge: "Active Enrolled",
    badgeBg: "bg-slate-100",
    badgeColor: "text-[#142B4A]",
  },
  {
    id: "monthly-fees",
    title: "Monthly Fees Collection",
    value: "$19,350.00",
    icon: DollarSign,
    iconBg: "bg-emerald-50 border border-emerald-200",
    iconColor: "text-emerald-600",
    badge: "+14.8%",
    badgeBg: "bg-emerald-50",
    badgeColor: "text-emerald-700",
  },
  {
    id: "monthly-expenses",
    title: "Monthly Expenses",
    value: "$1,250.00",
    icon: Receipt,
    iconBg: "bg-rose-50 border border-rose-200",
    iconColor: "text-rose-600",
    badge: "Approved",
    badgeBg: "bg-slate-100",
    badgeColor: "text-slate-500",
  },
];
const OverviewCardRow = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {cards.map((card) => {
        return <CardRow card={card} />;
      })}
    </div>
  );
};

export default OverviewCardRow;
