import type { LucideIcon } from "lucide-react";
import { Award, GraduationCap, ShieldCheck, Users } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface GenderChartData {
  grade: string;
  Male: number;
  Female: number;
}

interface CategoryChartData {
  name: string;
  value: number;
  color: string;
}

interface SummaryCard {
  label: string;
  value: string;
  icon: LucideIcon;
  color: string;
  bg: string;
}

const GENDER_CHART_DATA: GenderChartData[] = [
  { grade: "Grade 9", Male: 120, Female: 110 },
  { grade: "Grade 10", Male: 145, Female: 135 },
  { grade: "Grade 11", Male: 130, Female: 140 },
  { grade: "Grade 12", Male: 115, Female: 125 },
];

const CATEGORY_CHART_DATA: CategoryChartData[] = [
  { name: "General", value: 480, color: "#142B4A" },
  { name: "OBC", value: 310, color: "#3B82F6" },
  { name: "SC/ST", value: 190, color: "#D6B36A" },
  { name: "International", value: 85, color: "#10B981" },
  { name: "Sports Quota", value: 65, color: "#8B5CF6" },
];

const SUMMARY_CARDS: SummaryCard[] = [
  {
    label: "Total Enrolled Students",
    value: "1,130",
    icon: Users,
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    label: "General Category",
    value: "480 (42%)",
    icon: ShieldCheck,
    color: "text-indigo-600",
    bg: "bg-indigo-50",
  },
  {
    label: "Reserved / Quota Categories",
    value: "565 (50%)",
    icon: Award,
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
  {
    label: "International Scholars",
    value: "85 (8%)",
    icon: GraduationCap,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
];

const StudentCategory = () => {
  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        {SUMMARY_CARDS.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.label}
              className="flex items-center gap-4 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs"
            >
              <div className={`rounded-xl p-4 ${card.bg} ${card.color}`}>
                <Icon className="h-6 w-6" />
              </div>

              <div>
                <p className="text-xs font-semibold text-slate-400">
                  {card.label}
                </p>
                <h3 className="mt-1 text-2xl font-bold text-[#142B4A]">
                  {card.value}
                </h3>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Category Distribution */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs">
          <h3 className="mb-2 text-base font-bold text-[#142B4A]">
            Category Distribution Breakdown
          </h3>
          <p className="mb-6 text-xs text-slate-400">
            Distribution based on official enrollment records
          </p>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={CATEGORY_CHART_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                  nameKey="name"
                >
                  {CATEGORY_CHART_DATA.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Gender Demographics */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs">
          <h3 className="mb-2 text-base font-bold text-[#142B4A]">
            Gender Demographics per Grade
          </h3>
          <p className="mb-6 text-xs text-slate-400">
            Comparison of male vs female enrollment numbers
          </p>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={GENDER_CHART_DATA}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#E2E8F0"
                />
                <XAxis dataKey="grade" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Male" fill="#142B4A" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Female" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentCategory;
