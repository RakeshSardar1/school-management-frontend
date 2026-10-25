import { useState } from "react";
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
  Building2,
  Users,
  BookOpen,
  Tv,
  GitFork,
  Video,
  Smile,
  Receipt,
  FileCheck2,
  CalendarCheck,
  Laptop,
  BookMarked,
  FileText,
  UserCheck,
  MessageSquare,
  DollarSign,
  PanelLeftClose,
  PanelLeftOpen,
  Calendar,
  Wallet,
  CreditCard,
  Bell,
  Search,
  Plus,
  X,
  Send,
  Sparkles,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";
import { MainContent, OverView, Sidebar } from "./layouts";

// --- DATASETS WITH STRICT COLOR INJECTION ---

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

const SIDEBAR_ITEMS = [
  { id: "overview", label: "School Overview", icon: Building2 },
  { id: "front-office", label: "Front Office", icon: Wallet },
  {
    id: "student-info",
    label: "Student Info",
    icon: Users,
    badge: "54",
    subItems: [
      "Student Directory",
      "Admission Process",
      "Student Categories",
      "Promote Students",
    ],
  },
  { id: "online-course", label: "Online Course", icon: Tv, badge: "Live" },
  { id: "multi-branch", label: "Multi Branch", icon: GitFork },
  { id: "live-classes", label: "Live Classes", icon: Video },
  { id: "behavior", label: "Behavior Records", icon: Smile },
  { id: "income-expense", label: "Income & Expense", icon: Receipt },
  { id: "cbse", label: "CBSE Examination", icon: FileCheck2 },
  {
    id: "examinations",
    label: "Examinations",
    icon: FileText,
    badge: "Active",
    subItems: [
      "Exam Schedule",
      "Marks / Report Cards",
      "Admit Cards",
      "Grade Setup",
    ],
  },
  { id: "attendance", label: "Attendance", icon: CalendarCheck },
  { id: "online-exams", label: "Online Examinations", icon: Laptop },
  {
    id: "academics",
    label: "Academics",
    icon: BookMarked,
    subItems: [
      "Class Timetable",
      "Teacher Timetable",
      "Assign Subject",
      "Subjects Master",
    ],
  },
  { id: "lesson-plan", label: "Lesson Plan", icon: BookOpen },
  {
    id: "hr",
    label: "Human Resource",
    icon: UserCheck,
    subItems: [
      "Staff Directory",
      "Staff Attendance",
      "Payroll & Salary",
      "Approve Leave",
    ],
  },
  { id: "communicate", label: "Communicate", icon: MessageSquare },
  {
    id: "fees-collection",
    label: "Fees Collection",
    icon: CreditCard,
    badge: "216",
    subItems: ["Fee Ledger", "Collect Fees", "Fee Structure", "Discount Types"],
  },
];

const STUDENT_FEES_LIST = [
  {
    id: "STU-1029",
    name: "Sophia Montgomery",
    grade: "Grade 10-A",
    amount: "$1,200.00",
    dueDate: "Apr 15, 2026",
    status: "Unpaid",
  },
  {
    id: "STU-1088",
    name: "Alexander Wright",
    grade: "Grade 11-B",
    amount: "$850.00",
    dueDate: "Apr 18, 2026",
    status: "Unpaid",
  },
  {
    id: "STU-1045",
    name: "Emma Watson",
    grade: "Grade 9-C",
    amount: "$450.00",
    dueDate: "Apr 20, 2026",
    status: "Partial",
  },
  {
    id: "STU-1012",
    name: "Liam Harrison",
    grade: "Grade 12-A",
    amount: "$1,200.00",
    dueDate: "Apr 02, 2026",
    status: "Paid",
  },
  {
    id: "STU-1102",
    name: "Olivia Bennett",
    grade: "Grade 8-A",
    amount: "$950.00",
    dueDate: "Apr 25, 2026",
    status: "Unpaid",
  },
];

const AppPre = () => {
  const [activeTab, setActiveTab] = useState("examinations");
  const [activeSubItem, setActiveSubItem] = useState("Exam Schedule");

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeSession, setActiveSession] = useState("2025-2026");

  // Interactive Controls
  const [isAttendanceModalOpen, setIsAttendanceModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Roll-Call Local State
  const [attendanceList, setAttendanceList] = useState([
    { id: 1, name: "Ethan Vance", grade: "Grade 10-A", status: "Present" },
    { id: 2, name: "Chloe Bennett", grade: "Grade 10-A", status: "Present" },
    { id: 3, name: "Lucas Hayes", grade: "Grade 10-A", status: "Absent" },
    { id: 4, name: "Maya Patel", grade: "Grade 10-A", status: "Present" },
    { id: 5, name: "Noah Miller", grade: "Grade 10-A", status: "Present" },
  ]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3800);
  };

  const handleToggleAttendance = (id: number) => {
    setAttendanceList((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            status: item.status === "Present" ? "Absent" : "Present",
          };
        }
        return item;
      }),
    );
  };

  const activeParentItem = SIDEBAR_ITEMS.find((item) => item.id === activeTab);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 font-sans flex overflow-x-hidden selection:bg-[#3B82F6] selection:text-white">
      {/* ==================== SYSTEM TOAST NOTIFICATION ==================== */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#142B4A] text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-[#D6B36A]/40 flex items-center gap-3.5 animate-in fade-in slide-in-from-bottom-5 duration-300">
          <div className="w-8 h-8 rounded-xl bg-[#D6B36A] text-[#142B4A] flex items-center justify-center shrink-0 font-bold shadow-md">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs font-bold text-[#D6B36A] tracking-wide">
              Scholix Notification
            </p>
            <p className="text-[11px] text-slate-200">{toastMessage}</p>
          </div>
        </div>
      )}

      {/* ==================== LEFT BRAND SIDEBAR ==================== */}
      <aside
        className={`${
          sidebarCollapsed ? "w-20" : "w-64"
        } transition-all duration-300 bg-[#142B4A] text-white flex flex-col justify-between shrink-0 sticky top-0 h-screen z-30 shadow-xl`}
      >
        <div className="flex flex-col h-full overflow-hidden">
          {/* Logo Bar */}
          <div className="p-5 flex items-center justify-between border-b border-slate-700/60">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-9 h-9 rounded-xl bg-[#3B82F6] text-white flex items-center justify-center font-black text-lg shadow-md border-2 border-[#D6B36A]">
                  S
                </div>
                {/* Gold Accent Mark */}
                <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[#D6B36A] ring-2 ring-[#142B4A]" />
              </div>
              {!sidebarCollapsed && (
                <div>
                  <span className="font-black text-xl tracking-tight text-white">
                    scholix
                  </span>
                  <span className="block text-[8px] font-bold tracking-widest uppercase text-[#D6B36A] -mt-1">
                    Management Hub
                  </span>
                </div>
              )}
            </div>
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-all"
            >
              {sidebarCollapsed ? (
                <PanelLeftOpen className="w-4 h-4" />
              ) : (
                <PanelLeftClose className="w-4 h-4" />
              )}
            </button>
          </div>

          {/* Main Menu Navigation */}
          <Sidebar active={sidebarCollapsed} />

          {/* User Profile Footer */}
          {!sidebarCollapsed && (
            <div className="p-3 border-t border-slate-700/60 m-3 rounded-2xl bg-slate-800/50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#D6B36A] text-[#142B4A] font-black text-xs flex items-center justify-center shadow-md">
                  SA
                </div>
                <div className="overflow-hidden">
                  <p className="text-xs font-bold text-white truncate">
                    Super Admin
                  </p>
                  <p className="text-[10px] text-slate-300 truncate">
                    scholix.edu
                  </p>
                </div>
              </div>
              <ShieldCheck className="w-4 h-4 text-[#D6B36A]" />
            </div>
          )}
        </div>
      </aside>

      {/* ==================== MAIN CONTENT AREA ==================== */}
      <MainContent />

      {/* ==================== TAKE ATTENDANCE MODAL ==================== */}
      {!isAttendanceModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="font-bold text-[#142B4A] text-base">
                Take Class Attendance
              </h3>
              <button
                onClick={() => setIsAttendanceModalOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
              {attendanceList.map((std) => (
                <div
                  key={std.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200"
                >
                  <div>
                    <span className="text-xs font-bold text-[#142B4A] block">
                      {std.name}
                    </span>
                    <span className="text-[10px] text-slate-500">
                      {std.grade}
                    </span>
                  </div>
                  <button
                    onClick={() => handleToggleAttendance(std.id)}
                    className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                      std.status === "Present"
                        ? "bg-emerald-500 text-white shadow-xs"
                        : "bg-rose-100 text-rose-700"
                    }`}
                  >
                    {std.status}
                  </button>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-100 flex gap-3">
              <button
                onClick={() => setIsAttendanceModalOpen(false)}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setIsAttendanceModalOpen(false);
                  showToast("Class attendance successfully synced to server");
                }}
                className="flex-1 py-2.5 rounded-xl bg-[#3B82F6] text-white text-xs font-bold shadow-md shadow-blue-500/20"
              >
                Save Roster
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================== COLLECT FEE MODAL ==================== */}
      {isPaymentModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="font-bold text-[#142B4A] text-base">
                Collect Fee Payment
              </h3>
              <button
                onClick={() => setIsPaymentModalOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Select Student
                </label>
                <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-semibold text-slate-800 outline-none">
                  <option>Sophia Montgomery (STU-1029) — Due: $1,200</option>
                  <option>Alexander Wright (STU-1088) — Due: $850</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Collection Amount ($)
                </label>
                <input
                  type="number"
                  defaultValue="1200"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-semibold text-slate-800 outline-none"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex gap-3">
              <button
                onClick={() => setIsPaymentModalOpen(false)}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-xs font-bold"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setIsPaymentModalOpen(false);
                  showToast("Fee payment receipt #8819 generated & sent!");
                }}
                className="flex-1 py-2.5 rounded-xl bg-[#142B4A] text-white font-bold text-xs shadow-md"
              >
                Process Payment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================== SLIDE-OUT LEDGER DRAWER ==================== */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex justify-end">
          <div className="bg-white border-l border-slate-200 w-full max-w-md h-full shadow-2xl p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
                <div>
                  <h3 className="font-bold text-[#142B4A] text-base">
                    Fees Ledger Inspector
                  </h3>
                  <p className="text-xs text-slate-400">
                    Detailed Student Account Status
                  </p>
                </div>
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="p-1 rounded-full text-slate-400 hover:bg-slate-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3">
                {STUDENT_FEES_LIST.map((student) => (
                  <div
                    key={student.id}
                    className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between"
                  >
                    <div>
                      <p className="text-xs font-bold text-[#142B4A]">
                        {student.name}
                      </p>
                      <p className="text-[10px] text-slate-400">
                        {student.grade} • Due: {student.dueDate}
                      </p>
                      <p className="text-xs font-black text-[#3B82F6] mt-1">
                        {student.amount}
                      </p>
                    </div>

                    <div className="flex flex-col items-end gap-1.5">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          student.status === "Paid"
                            ? "bg-emerald-100 text-emerald-800"
                            : student.status === "Partial"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-rose-100 text-rose-800"
                        }`}
                      >
                        {student.status}
                      </span>
                      <button
                        onClick={() =>
                          showToast(`Payment reminder sent to ${student.name}`)
                        }
                        className="p-1.5 rounded-lg bg-slate-200 text-slate-700 text-[10px] font-bold flex items-center gap-1 hover:bg-[#142B4A] hover:text-white transition-all"
                      >
                        <Send className="w-3 h-3" /> Remind
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <button
                onClick={() => {
                  showToast(
                    "Automated reminders sent to all 216 unpaid accounts",
                  );
                  setIsDrawerOpen(false);
                }}
                className="w-full py-3 rounded-xl bg-[#142B4A] text-white font-bold text-xs shadow-md flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4 text-[#D6B36A]" /> Remind All Unpaid
                Accounts
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppPre;
