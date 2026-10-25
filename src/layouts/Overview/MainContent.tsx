import { useState } from "react";
import { useAppSelector } from "../../redux/ReduxHooks";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Users,
  Receipt,
  CalendarCheck,
  DollarSign,
  Calendar,
  CreditCard,
  Bell,
  Search,
  Plus,
  ChevronRight,
} from "lucide-react";
import OverView from "./OverView";
const BAR_CHART_DATA = [
  { month: "Jan", fees: 4200, expenses: 3450 },
  { month: "Feb", fees: 4180, expenses: 3480 },
  { month: "Mar", fees: 4200, expenses: 3460 },
  { month: "Apr", fees: 4190, expenses: 3470 },
  { month: "May", fees: 4200, expenses: 3450 },
  { month: "Jun", fees: 4180, expenses: 3480 },
  { month: "Jul", fees: 4190, expenses: 3460 },
  { month: "Aug", fees: 4200, expenses: 3470 },
  { month: "Sep", fees: 4180, expenses: 3450 },
  { month: "Oct", fees: 4200, expenses: 3460 },
  { month: "Nov", fees: 4190, expenses: 3480 },
  { month: "Dec", fees: 1900, expenses: 2950 },
];

const SESSION_TREND_DATA = [
  { month: "Jan", revenue: 1.6, overhead: 1.2 },
  { month: "Feb", revenue: 1.3, overhead: 1.0 },
  { month: "Mar", revenue: 2.1, overhead: 1.6 },
  { month: "Apr", revenue: 2.4, overhead: 1.1 },
  { month: "May", revenue: 3.9, overhead: 1.9 },
  { month: "Jun", revenue: 3.2, overhead: 1.4 },
];
const INCOME_DONUT_DATA = [
  { name: "Donation", value: 35, color: "#142B4A" },
  { name: "Rent", value: 25, color: "#3B82F6" },
  { name: "Miscellaneous", value: 15, color: "#D6B36A" },
  { name: "Uniform Sale", value: 15, color: "#60A5FA" },
  { name: "Book Sale", value: 10, color: "#94A3B8" },
];

const EXPENSE_DONUT_DATA = [
  { name: "Stationery Purchase", value: 30, color: "#142B4A" },
  { name: "Electricity Bill", value: 25, color: "#3B82F6" },
  { name: "Telephone Bill", value: 20, color: "#D6B36A" },
  { name: "Miscellaneous", value: 15, color: "#EF4444" },
  { name: "Flower", value: 10, color: "#CBD5E1" },
];
const MainContent = () => {
  const [activeTab] = useState("examinations");

  const [activeSubItem] = useState("Exam Schedule");
  const [activeSession, setActiveSession] = useState("2025-2026");

  const [isAttendanceModalOpen, setIsAttendanceModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const { sidebarItems } = useAppSelector((state) => state.common);
  const activeParentItem = sidebarItems.find((item) => item.id === activeTab);

  return (
    <main className="flex-1 flex flex-col min-w-0 bg-[#F8FAFC]">
      {/* Top Header Bar */}
      <header className="h-16 border-b border-slate-200 bg-white px-8 flex items-center justify-between sticky top-0 z-20 shadow-xs">
        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400 font-semibold">Scholix</span>
          <span className="text-slate-300">/</span>
          <span className="text-[#142B4A] font-black">
            {activeParentItem?.label || "School Overview"}
          </span>

          {activeSubItem && (
            <>
              <span className="text-slate-300">/</span>
              <span className="text-[#3B82F6] font-bold bg-[#3B82F6]/10 px-2.5 py-0.5 rounded-lg border border-[#3B82F6]/20">
                {activeSubItem}
              </span>
            </>
          )}
          <span className="ml-2 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
            Session Live
          </span>
        </div>

        {/* Search & Actions */}
        <div className="flex items-center gap-3.5">
          {/* Search Input */}
          <div className="relative w-60 hidden xl:block">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-2.5" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full bg-slate-100 text-slate-800 text-xs pl-9 pr-12 py-2 rounded-xl border border-slate-200 focus:border-[#3B82F6] focus:outline-none transition-all"
            />
            <span className="absolute right-3 top-2 text-[9px] font-extrabold text-slate-500 bg-white px-1.5 py-0.5 rounded border border-slate-200 shadow-2xs">
              ⌘K
            </span>
          </div>

          {/* Academic Session Selector */}
          <div className="hidden sm:flex items-center gap-2 bg-slate-100 border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-700 font-semibold">
            <Calendar className="w-3.5 h-3.5 text-[#3B82F6]" />
            <select
              value={activeSession}
              onChange={(e) => setActiveSession(e.target.value)}
              className="bg-transparent outline-none cursor-pointer"
            >
              <option value="2025-2026">2025-2026</option>
              <option value="2026-2027">2026-2027</option>
            </select>
          </div>

          {/* Quick Action Buttons */}
          <button
            onClick={() => setIsAttendanceModalOpen(true)}
            className="hidden md:flex items-center gap-1.5 text-xs font-bold bg-slate-100 hover:bg-slate-200 text-[#142B4A] px-3.5 py-2 rounded-xl border border-slate-200 transition-all"
          >
            <CalendarCheck className="w-3.5 h-3.5 text-[#3B82F6]" />+ Take
            Attendance
          </button>

          <button
            onClick={() => setIsPaymentModalOpen(true)}
            className="flex items-center gap-1.5 text-xs font-bold bg-[#3B82F6] hover:bg-blue-600 text-white px-4 py-2 rounded-xl shadow-md shadow-blue-500/20 transition-all"
          >
            <Plus className="w-4 h-4 stroke-[3]" />+ Collect Fee
          </button>

          {/* Notification Bell */}
          <div className="relative">
            <button
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className="p-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 hover:text-[#142B4A] transition-all relative"
            >
              <Bell className="w-4 h-4" />
              <span className="w-2 h-2 rounded-full bg-rose-500 absolute top-1.5 right-1.5 ring-2 ring-white" />
            </button>

            {isNotificationsOpen && (
              <div className="absolute right-0 mt-3 w-80 bg-white border border-slate-200 rounded-2xl shadow-xl p-4 z-50 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <span className="text-xs font-bold text-[#142B4A]">
                    Notifications
                  </span>
                  <span className="text-[10px] text-[#3B82F6] font-semibold cursor-pointer">
                    Clear
                  </span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex gap-2.5">
                    <CreditCard className="w-4 h-4 text-[#D6B36A] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-slate-800">
                        Fee Received
                      </p>
                      <p className="text-[10px] text-slate-500">
                        $1,200 from Sophia Montgomery
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* User Profile Badge */}
          <div className="w-9 h-9 rounded-xl bg-[#142B4A] text-[#D6B36A] font-black text-xs flex items-center justify-center border-2 border-[#D6B36A] shadow-xs">
            AD
          </div>
        </div>
      </header>

      {/* Dashboard Canvas Container */}
      <div className="p-8 space-y-6 max-w-[1700px] mx-auto w-full">
        {/* ==================== 3. TOP METRICS ROW ==================== */}

        <OverView />

        {/* ==================== 4. SUMMARY STATS ROW ==================== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#142B4A] text-white flex items-center justify-center shrink-0">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-semibold">
                  Student Count
                </p>
                <p className="text-2xl font-black text-[#142B4A] mt-0.5">54</p>
              </div>
            </div>
            <span className="text-xs font-bold text-[#142B4A] bg-slate-100 px-3 py-1 rounded-xl">
              Active Enrolled
            </span>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center shrink-0">
                <DollarSign className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-semibold">
                  Monthly Fees Collection
                </p>
                <p className="text-2xl font-black text-[#142B4A] mt-0.5">
                  $19,350.00
                </p>
              </div>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-xl">
              +14.8%
            </span>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 border border-rose-200 flex items-center justify-center shrink-0">
                <Receipt className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-semibold">
                  Monthly Expenses
                </p>
                <p className="text-2xl font-black text-[#142B4A] mt-0.5">
                  $1,250.00
                </p>
              </div>
            </div>
            <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-xl">
              Approved
            </span>
          </div>
        </div>

        {/* ==================== 5. MAIN CHARTS SECTION ==================== */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Dual Bar Chart (Fees vs Expenses) */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-sm font-bold text-[#142B4A]">
                  Fees Collection vs Expenses
                </h3>
                <p className="text-xs text-slate-400">
                  Monthly breakdown for Session 2025-26
                </p>
              </div>
              <div className="flex items-center gap-4 text-xs font-semibold">
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-[#142B4A]" /> Fees
                  Collected
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-[#3B82F6]" />{" "}
                  Expenses
                </span>
              </div>
            </div>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={BAR_CHART_DATA}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#F1F5F9"
                  />
                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 11, fill: "#64748B" }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 11, fill: "#64748B" }}
                    tickFormatter={(v) => `${v / 1000}k`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#142B4A",
                      borderRadius: "12px",
                      color: "#FFF",
                    }}
                  />
                  <Bar
                    dataKey="fees"
                    fill="#142B4A"
                    radius={[4, 4, 0, 0]}
                    barSize={10}
                  />
                  <Bar
                    dataKey="expenses"
                    fill="#3B82F6"
                    radius={[4, 4, 0, 0]}
                    barSize={10}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Session Trend Line Chart */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
            <div className="mb-6">
              <h3 className="text-sm font-bold text-[#142B4A]">
                Session 2025-26 Fees Trend
              </h3>
              <p className="text-xs text-slate-400">
                Revenue projection curves
              </p>
            </div>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={SESSION_TREND_DATA}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#F1F5F9"
                  />
                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 11, fill: "#64748B" }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 11, fill: "#64748B" }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#142B4A",
                      borderRadius: "12px",
                      color: "#FFF",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#3B82F6"
                    strokeWidth={3}
                    dot={{ fill: "#D6B36A", r: 5 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="overhead"
                    stroke="#142B4A"
                    strokeWidth={2}
                    strokeDasharray="4 4"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* ==================== 6. BOTTOM ANALYTICS SECTION ==================== */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Income Donut */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <h3 className="text-sm font-bold text-[#142B4A] mb-4">
              Income Allocation
            </h3>
            <div className="flex items-center gap-4">
              <div className="w-36 h-36 relative shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={INCOME_DONUT_DATA}
                      innerRadius={42}
                      outerRadius={60}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {INCOME_DONUT_DATA.map((entry, idx) => (
                        <Cell key={idx} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-[9px] uppercase font-bold text-slate-400">
                    Income
                  </span>
                  <span className="text-xs font-black text-[#142B4A]">
                    $19.3k
                  </span>
                </div>
              </div>

              <div className="space-y-1.5 text-xs w-full">
                {INCOME_DONUT_DATA.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center">
                    <span className="flex items-center gap-2">
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-slate-600 truncate max-w-[90px]">
                        {item.name}
                      </span>
                    </span>
                    <span className="font-bold text-slate-800">
                      {item.value}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Expense Donut */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <h3 className="text-sm font-bold text-[#142B4A] mb-4">
              Expense Allocation
            </h3>
            <div className="flex items-center gap-4">
              <div className="w-36 h-36 relative shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={EXPENSE_DONUT_DATA}
                      innerRadius={42}
                      outerRadius={60}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {EXPENSE_DONUT_DATA.map((entry, idx) => (
                        <Cell key={idx} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-[9px] uppercase font-bold text-slate-400">
                    Expense
                  </span>
                  <span className="text-xs font-black text-[#142B4A]">
                    $1.25k
                  </span>
                </div>
              </div>

              <div className="space-y-1.5 text-xs w-full">
                {EXPENSE_DONUT_DATA.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center">
                    <span className="flex items-center gap-2">
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-slate-600 truncate max-w-[90px]">
                        {item.name}
                      </span>
                    </span>
                    <span className="font-bold text-slate-800">
                      {item.value}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Fees Overview Progress Bars */}
          <div
            onClick={() => setIsDrawerOpen(true)}
            className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between cursor-pointer hover:border-[#3B82F6] transition-all group"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-[#142B4A] group-hover:text-[#3B82F6]">
                  Fees Overview
                </h3>
                <span className="text-[10px] font-bold text-[#D6B36A] bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  Inspect Ledger
                </span>
              </div>

              <div className="space-y-4">
                {/* 216 UNPAID */}
                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className="text-[#142B4A]">216 UNPAID</span>
                    <span className="text-slate-400">90.7%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-[#142B4A] h-full rounded-full w-[90.7%]" />
                  </div>
                </div>

                {/* 8 PARTIAL */}
                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className="text-[#3B82F6]">8 PARTIAL</span>
                    <span className="text-slate-400">3.4%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-[#3B82F6] h-full rounded-full w-[35%]" />
                  </div>
                </div>

                {/* 14 PAID */}
                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className="text-[#D6B36A]">14 PAID</span>
                    <span className="text-slate-400">5.9%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-[#D6B36A] h-full rounded-full w-[20%]" />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 text-xs font-bold text-[#3B82F6] flex items-center justify-center gap-1">
              Click to inspect drawer ledger{" "}
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MainContent;
