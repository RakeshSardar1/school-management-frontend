import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Building2,
  Users,
  GraduationCap,
  CalendarCheck,
  BookMarked,
  FileText,
  UserCheck,
  MessageSquare,
  CreditCard,
  Search,
  X,
  ChevronRight,
  Sparkles,
  Wallet,
  Download,
  Zap,
  Briefcase,
  Book,
  type LucideIcon,
} from "lucide-react";

// --- TYPES ---
type StudentStatus = "Present" | "Late" | "Absent" | "Half Day" | "On Leave";
type StaffStatus = "Present" | "Late" | "Absent" | "On Leave";
type PeriodStatus = "P" | "L" | "A";
type LeaveStatus = "Approved" | "Pending" | "Rejected";
type SubTabId =
  | "student-roster"
  | "staff-roster"
  | "period-roster"
  | "monthly-analytics"
  | "leave-approvals"
  | "biometric-log"
  | "defaulter-list";

interface SidebarSubItem {
  id: string;
  label: string;
}

interface SidebarItem {
  id: string;
  label: string;
  icon: LucideIcon;
  badge?: string;
  subItems?: SidebarSubItem[];
}

interface Student {
  id: string;
  roll: string;
  name: string;
  avatar: string;
  class: string;
  overallAttendance: string;
  status: StudentStatus;
  note: string;
  lastTap: string;
}

interface Staff {
  id: string;
  empCode: string;
  name: string;
  dept: string;
  role: string;
  avatar: string;
  status: StaffStatus;
  clockIn: string;
  clockOut: string;
  shift: string;
  monthlyRate: string;
}

interface PeriodStudent {
  id: string;
  roll: string;
  name: string;
  period1: PeriodStatus;
  period2: PeriodStatus;
  period3: PeriodStatus;
  period4: PeriodStatus;
  period5: PeriodStatus;
}

interface WeeklyTrendItem {
  day: string;
  students: number;
  staff: number;
}

interface LeaveRequest {
  id: string;
  name: string;
  role: string;
  type: string;
  dates: string;
  days: number;
  reason: string;
  status: LeaveStatus;
}

interface BiometricLog {
  id: string;
  user: string;
  type: "Student" | "Teacher";
  cardNo: string;
  time: string;
  gate: string;
  status: "On Time" | "Late";
}

type PeriodKey = "period1" | "period2" | "period3" | "period4" | "period5";

// --- SIDEBAR NAVIGATION ---
const SIDEBAR_ITEMS: SidebarItem[] = [
  { id: "overview", label: "School Overview", icon: Building2 },
  { id: "front-office", label: "Front Office", icon: Wallet },
  { id: "student-info", label: "Student Info", icon: Users, badge: "54" },
  {
    id: "attendance",
    label: "Attendance Hub",
    icon: CalendarCheck,
    badge: "Live Multi-Role",
    subItems: [
      { id: "student-roster", label: "Student Attendance" },
      { id: "staff-roster", label: "Staff & Teacher Attendance" },
      { id: "period-roster", label: "Subject / Period Attendance" },
      { id: "monthly-analytics", label: "Analytics & Monthly Sheet" },
      { id: "leave-approvals", label: "Leave Requests" },
      { id: "biometric-log", label: "Biometric / RFID Stream" },
      { id: "defaulter-list", label: "Defaulter & Low Attendance" },
    ],
  },
  { id: "academics", label: "Academics", icon: BookMarked },
  { id: "examinations", label: "Examinations", icon: FileText },
  { id: "hr", label: "Human Resource", icon: UserCheck },
  {
    id: "fees-collection",
    label: "Fees Collection",
    icon: CreditCard,
    badge: "216",
  },
  { id: "communicate", label: "Communicate", icon: MessageSquare },
];

// --- MOCK DATA: STUDENTS ROSTER ---
const INITIAL_STUDENT_ROSTER: Student[] = [
  {
    id: "STU-1001",
    roll: "01",
    name: "Sophia Montgomery",
    avatar: "SM",
    class: "Grade 10-A",
    overallAttendance: "96.2%",
    status: "Present",
    note: "",
    lastTap: "07:48 AM",
  },
  {
    id: "STU-1002",
    roll: "02",
    name: "Alexander Wright",
    avatar: "AW",
    class: "Grade 10-A",
    overallAttendance: "88.5%",
    status: "Present",
    note: "",
    lastTap: "07:52 AM",
  },
  {
    id: "STU-1003",
    roll: "03",
    name: "Emma Watson",
    avatar: "EW",
    class: "Grade 10-A",
    overallAttendance: "92.0%",
    status: "Late",
    note: "Traffic delay",
    lastTap: "08:18 AM",
  },
  {
    id: "STU-1004",
    roll: "04",
    name: "Liam Harrison",
    avatar: "LH",
    class: "Grade 10-A",
    overallAttendance: "71.4%",
    status: "Absent",
    note: "Unexcused",
    lastTap: "--",
  },
  {
    id: "STU-1005",
    roll: "05",
    name: "Olivia Bennett",
    avatar: "OB",
    class: "Grade 10-A",
    overallAttendance: "98.1%",
    status: "Present",
    note: "",
    lastTap: "07:42 AM",
  },
  {
    id: "STU-1006",
    roll: "06",
    name: "Noah Miller",
    avatar: "NM",
    class: "Grade 10-A",
    overallAttendance: "64.8%",
    status: "On Leave",
    note: "Approved Medical Leave",
    lastTap: "--",
  },
  {
    id: "STU-1007",
    roll: "07",
    name: "Chloe Davis",
    avatar: "CD",
    class: "Grade 10-A",
    overallAttendance: "94.5%",
    status: "Present",
    note: "",
    lastTap: "07:55 AM",
  },
  {
    id: "STU-1008",
    roll: "08",
    name: "Ethan Vance",
    avatar: "EV",
    class: "Grade 10-A",
    overallAttendance: "82.3%",
    status: "Half Day",
    note: "Dental Appt at 12 PM",
    lastTap: "07:59 AM",
  },
];

// --- MOCK DATA: STAFF & TEACHERS ROSTER ---
const INITIAL_STAFF_ROSTER: Staff[] = [
  {
    id: "STF-301",
    empCode: "TCH-001",
    name: "Dr. Sarah Jenkins",
    dept: "Science (Senior)",
    role: "Head Teacher",
    avatar: "SJ",
    status: "Present",
    clockIn: "07:30 AM",
    clockOut: "Pending",
    shift: "Morning (07:30 - 15:30)",
    monthlyRate: "98.5%",
  },
  {
    id: "STF-302",
    empCode: "TCH-002",
    name: "Prof. Mark Gable",
    dept: "Mathematics",
    role: "Sr. Lecturer",
    avatar: "MG",
    status: "Present",
    clockIn: "07:35 AM",
    clockOut: "Pending",
    shift: "Morning (07:30 - 15:30)",
    monthlyRate: "95.0%",
  },
  {
    id: "STF-303",
    empCode: "TCH-003",
    name: "Ms. Claire Vance",
    dept: "English Literature",
    role: "Class Teacher",
    avatar: "CV",
    status: "Late",
    clockIn: "08:05 AM",
    clockOut: "Pending",
    shift: "Morning (07:30 - 15:30)",
    monthlyRate: "89.2%",
  },
  {
    id: "STF-304",
    empCode: "ADM-101",
    name: "Robert Sterling",
    dept: "Administration",
    role: "Front Office Exec",
    avatar: "RS",
    status: "Present",
    clockIn: "07:22 AM",
    clockOut: "Pending",
    shift: "General (07:30 - 16:30)",
    monthlyRate: "99.0%",
  },
  {
    id: "STF-305",
    empCode: "TCH-004",
    name: "David Ross",
    dept: "Physical Education",
    role: "Sports Director",
    avatar: "DR",
    status: "On Leave",
    clockIn: "--",
    clockOut: "--",
    shift: "Morning (07:30 - 15:30)",
    monthlyRate: "84.0%",
  },
  {
    id: "STF-306",
    empCode: "SUP-012",
    name: "Michael Chang",
    dept: "IT & Systems",
    role: "System Admin",
    avatar: "MC",
    status: "Present",
    clockIn: "07:40 AM",
    clockOut: "Pending",
    shift: "General (07:30 - 16:30)",
    monthlyRate: "96.8%",
  },
  {
    id: "STF-307",
    empCode: "TCH-005",
    name: "Elena Rostova",
    dept: "Arts & Music",
    role: "Faculty",
    avatar: "ER",
    status: "Absent",
    clockIn: "--",
    clockOut: "--",
    shift: "Morning (07:30 - 15:30)",
    monthlyRate: "79.5%",
  },
];

// --- MOCK DATA: SUBJECT / PERIOD WISE ROSTER ---
const INITIAL_PERIOD_ROSTER: PeriodStudent[] = [
  {
    id: "STU-1001",
    roll: "01",
    name: "Sophia Montgomery",
    period1: "P",
    period2: "P",
    period3: "P",
    period4: "P",
    period5: "P",
  },
  {
    id: "STU-1002",
    roll: "02",
    name: "Alexander Wright",
    period1: "P",
    period2: "P",
    period3: "L",
    period4: "P",
    period5: "P",
  },
  {
    id: "STU-1003",
    roll: "03",
    name: "Emma Watson",
    period1: "L",
    period2: "P",
    period3: "P",
    period4: "P",
    period5: "P",
  },
  {
    id: "STU-1004",
    roll: "04",
    name: "Liam Harrison",
    period1: "A",
    period2: "A",
    period3: "A",
    period4: "A",
    period5: "A",
  },
  {
    id: "STU-1005",
    roll: "05",
    name: "Olivia Bennett",
    period1: "P",
    period2: "P",
    period3: "P",
    period4: "P",
    period5: "P",
  },
];

// --- WEEKLY TREND DATA ---
const WEEKLY_TREND: WeeklyTrendItem[] = [
  { day: "Mon", students: 95.2, staff: 98.0 },
  { day: "Tue", students: 96.5, staff: 97.5 },
  { day: "Wed", students: 92.1, staff: 95.0 },
  { day: "Thu", students: 95.8, staff: 96.8 },
  { day: "Fri", students: 89.4, staff: 94.2 },
  { day: "Sat", students: 91.0, staff: 92.0 },
];

// --- LEAVE REQUESTS ---
const LEAVE_REQUESTS: LeaveRequest[] = [
  {
    id: "LV-801",
    name: "Noah Miller",
    role: "Student (Grade 10-A)",
    type: "Medical Leave",
    dates: "Oct 28 - Oct 30, 2026",
    days: 3,
    reason: "High fever and viral flu.",
    status: "Approved",
  },
  {
    id: "LV-802",
    name: "David Ross",
    role: "Staff (Sports Director)",
    type: "Casual Leave",
    dates: "Oct 28, 2026",
    days: 1,
    reason: "Personal family matter.",
    status: "Approved",
  },
  {
    id: "LV-803",
    name: "Isabella Garcia",
    role: "Student (Grade 11-B)",
    type: "Casual Leave",
    dates: "Nov 02 - Nov 03, 2026",
    days: 2,
    reason: "Family wedding ceremony.",
    status: "Pending",
  },
  {
    id: "LV-804",
    name: "Elena Rostova",
    role: "Staff (Teacher - Arts)",
    type: "Sick Leave",
    dates: "Oct 28, 2026",
    days: 1,
    reason: "Severe migraine.",
    status: "Pending",
  },
];

// --- BIOMETRIC REAL-TIME FEEDS ---
const BIOMETRIC_LOGS: BiometricLog[] = [
  {
    id: "LOG-9941",
    user: "Olivia Bennett",
    type: "Student",
    cardNo: "RFID-98124",
    time: "07:42:12 AM",
    gate: "Gate #1 (Main)",
    status: "On Time",
  },
  {
    id: "LOG-9942",
    user: "Dr. Sarah Jenkins",
    type: "Teacher",
    cardNo: "RFID-10001",
    time: "07:30:05 AM",
    gate: "Gate #1 (Main)",
    status: "On Time",
  },
  {
    id: "LOG-9943",
    user: "Sophia Montgomery",
    type: "Student",
    cardNo: "RFID-98101",
    time: "07:48:05 AM",
    gate: "Gate #1 (Main)",
    status: "On Time",
  },
  {
    id: "LOG-9944",
    user: "Ms. Claire Vance",
    type: "Teacher",
    cardNo: "RFID-10003",
    time: "08:05:14 AM",
    gate: "Gate #2 (East)",
    status: "Late",
  },
  {
    id: "LOG-9945",
    user: "Emma Watson",
    type: "Student",
    cardNo: "RFID-98103",
    time: "08:18:22 AM",
    gate: "Gate #1 (Main)",
    status: "Late",
  },
];

const Attendances = () => {
  const [activeTab, setActiveTab] = useState<string>("attendance");
  const [activeSubTab, setActiveSubTab] = useState<SubTabId>("student-roster");
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);

  // Filters & State
  const [selectedClass, setSelectedClass] = useState<string>("Grade 10-A");
  const [selectedStaffDept, setSelectedStaffDept] =
    useState<string>("All Departments");
  const [selectedDate, setSelectedDate] = useState<string>("2026-10-28");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Rosters State
  const [studentRoster, setStudentRoster] = useState<Student[]>(
    INITIAL_STUDENT_ROSTER,
  );
  const [staffRoster, setStaffRoster] = useState<Staff[]>(INITIAL_STAFF_ROSTER);
  const [periodRoster, setPeriodRoster] = useState<PeriodStudent[]>(
    INITIAL_PERIOD_ROSTER,
  );
  const [isLocked, setIsLocked] = useState<boolean>(false);

  // Modal / Remarks
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [selectedEntityForNote, setSelectedEntityForNote] =
    useState<Student | null>(null);
  const [noteInput, setNoteInput] = useState<string>("");
  const [isNoteModalOpen, setIsNoteModalOpen] = useState<boolean>(false);

  const showToast = (msg: string): void => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Student Attendance Handlers
  const handleStudentStatusChange = (
    id: string,
    newStatus: StudentStatus,
  ): void => {
    if (isLocked) {
      showToast("Attendance for today is locked by Administrator.");
      return;
    }
    setStudentRoster((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: newStatus } : s)),
    );
  };

  const handleMarkAllStudents = (status: StudentStatus): void => {
    if (isLocked) return;
    setStudentRoster((prev) => prev.map((s) => ({ ...s, status })));
    showToast(`Marked all students as ${status}`);
  };

  // Staff Attendance Handlers
  const handleStaffStatusChange = (
    id: string,
    newStatus: StaffStatus,
  ): void => {
    if (isLocked) {
      showToast("Attendance is locked.");
      return;
    }
    setStaffRoster((prev) =>
      prev.map((st) => (st.id === id ? { ...st, status: newStatus } : st)),
    );
  };

  const handleMarkAllStaff = (status: StaffStatus): void => {
    if (isLocked) return;
    setStaffRoster((prev) => prev.map((st) => ({ ...st, status })));
    showToast(`Marked all staff members as ${status}`);
  };

  // Filtered Roster views
  const filteredStudents: Student[] = studentRoster.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.roll.includes(searchQuery),
  );

  const filteredStaff: Staff[] = staffRoster.filter((st) => {
    const matchesSearch =
      st.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      st.empCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      st.dept.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDept =
      selectedStaffDept === "All Departments" ||
      st.dept.includes(selectedStaffDept);
    return matchesSearch && matchesDept;
  });

  // Aggregates
  const studentStats = {
    total: studentRoster.length,
    present: studentRoster.filter((s) => s.status === "Present").length,
    late: studentRoster.filter((s) => s.status === "Late").length,
    absent: studentRoster.filter((s) => s.status === "Absent").length,
    leave: studentRoster.filter(
      (s) => s.status === "On Leave" || s.status === "Half Day",
    ).length,
  };

  const staffStats = {
    total: staffRoster.length,
    present: staffRoster.filter((s) => s.status === "Present").length,
    late: staffRoster.filter((s) => s.status === "Late").length,
    absent: staffRoster.filter((s) => s.status === "Absent").length,
    leave: staffRoster.filter(
      (s) => s.status === "On Leave" || s.status === "Half Day",
    ).length,
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 font-sans flex overflow-x-hidden selection:bg-[#3B82F6] selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#142B4A] text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-[#D6B36A]/40 flex items-center gap-3.5 animate-in fade-in slide-in-from-bottom-5 duration-300">
          <div className="w-8 h-8 rounded-xl bg-[#D6B36A] text-[#142B4A] flex items-center justify-center shrink-0 font-bold">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs font-bold text-[#D6B36A] tracking-wide">
              Scholix System Notification
            </p>
            <p className="text-[11px] text-slate-200">{toastMessage}</p>
          </div>
        </div>
      )}
      {/* ==================== MAIN CONTENT CANVAS ==================== */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#F8FAFC]">
        {/* Top App Header */}
        <header className="h-16 border-b border-slate-200 bg-white px-8 flex items-center justify-between sticky top-0 z-20 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
              <span>Scholix</span>
              <ChevronRight className="w-3 h-3 text-slate-300" />
              <span className="text-[#142B4A]">Attendance Hub</span>
              <ChevronRight className="w-3 h-3 text-slate-300" />
              <span className="text-[#3B82F6] font-bold uppercase tracking-wider">
                {activeSubTab.replace("-", " ")}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setIsLocked(!isLocked);
                showToast(
                  isLocked
                    ? "Attendance unlocked for edits."
                    : "Attendance locked for today.",
                );
              }}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                isLocked
                  ? "bg-amber-50 text-amber-700 border-amber-200"
                  : "bg-emerald-50 text-emerald-700 border-emerald-200"
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              {isLocked ? "Roster Locked" : "Roster Active (Editable)"}
            </button>

            <button
              onClick={() =>
                showToast("Attendance summary exported as PDF & Excel")
              }
              className="flex items-center gap-1.5 text-xs font-bold bg-[#142B4A] hover:bg-slate-900 text-white px-4 py-2 rounded-xl shadow-md transition-all"
            >
              <Download className="w-3.5 h-3.5 text-[#D6B36A]" /> Export
              Attendance
            </button>
          </div>
        </header>

        {/* Dashboard Content Container */}
        <div className="p-8 space-y-6 max-w-[1700px] mx-auto w-full">
          {/* ==================== ROLE SWITCHER & TOP SUMMARY METRICS ==================== */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
            {/* Role Navigation Tabs */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-lg font-black text-[#142B4A]">
                  School Attendance Management
                </h2>
                <p className="text-xs text-slate-400">
                  Switch between Students, Teachers & Staff, or Period-wise
                  Attendance
                </p>
              </div>

              {/* Mode Switcher Buttons */}
              <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
                <button
                  onClick={() => setActiveSubTab("student-roster")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    activeSubTab === "student-roster"
                      ? "bg-[#3B82F6] text-white shadow-md"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <GraduationCap className="w-4 h-4" /> Student Roster
                </button>

                <button
                  onClick={() => setActiveSubTab("staff-roster")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    activeSubTab === "staff-roster"
                      ? "bg-[#142B4A] text-white shadow-md"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <Briefcase className="w-4 h-4" /> Staff & Teachers
                </button>

                <button
                  onClick={() => setActiveSubTab("period-roster")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    activeSubTab === "period-roster"
                      ? "bg-purple-600 text-white shadow-md"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <Book className="w-4 h-4" /> Period / Subject
                </button>
              </div>
            </div>

            {/* Quick Summary Cards based on active tab */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 pt-1">
              {/* Card 1 */}
              <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200/80">
                <p className="text-[10px] font-extrabold uppercase text-slate-400">
                  Total Tracked
                </p>
                <p className="text-xl font-black text-[#142B4A] mt-0.5">
                  {activeSubTab === "staff-roster"
                    ? staffStats.total
                    : studentStats.total}
                </p>
                <p className="text-[10px] text-slate-500 font-semibold">
                  {activeSubTab === "staff-roster"
                    ? "Teachers & Staff"
                    : "Students Enrolled"}
                </p>
              </div>

              {/* Card 2 */}
              <div className="bg-emerald-50/70 rounded-xl p-3.5 border border-emerald-200/70">
                <p className="text-[10px] font-extrabold uppercase text-emerald-700">
                  Present Today
                </p>
                <p className="text-xl font-black text-emerald-700 mt-0.5">
                  {activeSubTab === "staff-roster"
                    ? staffStats.present
                    : studentStats.present}
                </p>
                <p className="text-[10px] text-emerald-600 font-bold">
                  On Time Arrival
                </p>
              </div>

              {/* Card 3 */}
              <div className="bg-amber-50/70 rounded-xl p-3.5 border border-amber-200/70">
                <p className="text-[10px] font-extrabold uppercase text-amber-700">
                  Late Punch-In
                </p>
                <p className="text-xl font-black text-amber-700 mt-0.5">
                  {activeSubTab === "staff-roster"
                    ? staffStats.late
                    : studentStats.late}
                </p>
                <p className="text-[10px] text-amber-600 font-bold">
                  Late Arrivals
                </p>
              </div>

              {/* Card 4 */}
              <div className="bg-rose-50/70 rounded-xl p-3.5 border border-rose-200/70">
                <p className="text-[10px] font-extrabold uppercase text-rose-700">
                  Absentees
                </p>
                <p className="text-xl font-black text-rose-700 mt-0.5">
                  {activeSubTab === "staff-roster"
                    ? staffStats.absent
                    : studentStats.absent}
                </p>
                <p className="text-[10px] text-rose-600 font-bold">
                  Unexcused Absence
                </p>
              </div>

              {/* Card 5 */}
              <div className="bg-blue-50/70 rounded-xl p-3.5 border border-blue-200/70">
                <p className="text-[10px] font-extrabold uppercase text-blue-700">
                  Approved Leave
                </p>
                <p className="text-xl font-black text-blue-700 mt-0.5">
                  {activeSubTab === "staff-roster"
                    ? staffStats.leave
                    : studentStats.leave}
                </p>
                <p className="text-[10px] text-blue-600 font-bold">
                  Permitted Absences
                </p>
              </div>
            </div>
          </div>

          {/* ==================== SUB-MODULE VIEWS ==================== */}

          {/* MODULE 1: STUDENT DAILY CLASS ROSTER */}
          {activeSubTab === "student-roster" && (
            <div className="space-y-6">
              {/* Filter & Controls */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-3">
                  <div>
                    <label className="text-[10px] font-extrabold uppercase text-slate-400 block mb-1">
                      Select Class & Section
                    </label>
                    <select
                      value={selectedClass}
                      onChange={(e) => setSelectedClass(e.target.value)}
                      className="bg-slate-50 border border-slate-200 font-bold text-xs text-[#142B4A] rounded-xl px-3 py-2 outline-none focus:border-[#3B82F6]"
                    >
                      <option value="Grade 10-A">
                        Grade 10-A (Class Teacher: Dr. Sarah Jenkins)
                      </option>
                      <option value="Grade 10-B">
                        Grade 10-B (Class Teacher: Prof. Mark Gable)
                      </option>
                      <option value="Grade 11-A">
                        Grade 11-A (Class Teacher: Ms. Claire Vance)
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] font-extrabold uppercase text-slate-400 block mb-1">
                      Date
                    </label>
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="bg-slate-50 border border-slate-200 font-bold text-xs text-[#142B4A] rounded-xl px-3 py-2 outline-none focus:border-[#3B82F6]"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-extrabold uppercase text-slate-400 block mb-1">
                      Search Student
                    </label>
                    <div className="relative">
                      <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                      <input
                        type="text"
                        placeholder="Search Roll or Name..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="bg-slate-50 border border-slate-200 font-bold text-xs text-slate-800 rounded-xl pl-9 pr-3 py-2 outline-none focus:border-[#3B82F6]"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase mr-1">
                    Batch Actions:
                  </span>
                  <button
                    onClick={() => handleMarkAllStudents("Present")}
                    className="px-3 py-1.5 bg-emerald-50 text-emerald-700 font-bold text-xs rounded-xl border border-emerald-200"
                  >
                    All Present
                  </button>
                  <button
                    onClick={() => handleMarkAllStudents("Absent")}
                    className="px-3 py-1.5 bg-rose-50 text-rose-700 font-bold text-xs rounded-xl border border-rose-200"
                  >
                    All Absent
                  </button>
                </div>
              </div>

              {/* Roster Table */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-100">
                      <tr>
                        <th className="py-3.5 px-6">Roll</th>
                        <th className="py-3.5 px-6">Student Details</th>
                        <th className="py-3.5 px-6">Gate Tap Time</th>
                        <th className="py-3.5 px-6">Overall Rate</th>
                        <th className="py-3.5 px-6 text-center">
                          Mark Attendance Status
                        </th>
                        <th className="py-3.5 px-6">Teacher Remarks</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                      {filteredStudents.map((std) => (
                        <tr
                          key={std.id}
                          className="hover:bg-slate-50 transition-all"
                        >
                          <td className="py-4 px-6 font-black text-[#142B4A]">
                            #{std.roll}
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-xl bg-[#142B4A] text-[#D6B36A] font-extrabold text-xs flex items-center justify-center shrink-0">
                                {std.avatar}
                              </div>
                              <div>
                                <p className="font-bold text-[#142B4A]">
                                  {std.name}
                                </p>
                                <p className="text-[10px] text-slate-400">
                                  {std.id} • {std.class}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <span className="font-mono text-slate-600 text-[11px] bg-slate-100 px-2 py-1 rounded-md">
                              {std.lastTap}
                            </span>
                          </td>
                          <td className="py-4 px-6">
                            <span
                              className={`font-bold ${parseFloat(std.overallAttendance) < 75 ? "text-rose-600 font-black" : "text-slate-800"}`}
                            >
                              {std.overallAttendance}
                            </span>
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex items-center justify-center gap-1 bg-slate-100/80 p-1 rounded-2xl border border-slate-200/60 max-w-fit mx-auto">
                              {(
                                [
                                  "Present",
                                  "Late",
                                  "Absent",
                                  "Half Day",
                                  "On Leave",
                                ] as StudentStatus[]
                              ).map((st) => (
                                <button
                                  key={st}
                                  onClick={() =>
                                    handleStudentStatusChange(std.id, st)
                                  }
                                  className={`px-2.5 py-1 rounded-xl font-bold text-[11px] transition-all ${
                                    std.status === st
                                      ? st === "Present"
                                        ? "bg-emerald-500 text-white"
                                        : st === "Late"
                                          ? "bg-amber-500 text-white"
                                          : st === "Absent"
                                            ? "bg-rose-500 text-white"
                                            : st === "Half Day"
                                              ? "bg-blue-500 text-white"
                                              : "bg-purple-600 text-white"
                                      : "text-slate-500 hover:text-slate-900"
                                  }`}
                                >
                                  {st}
                                </button>
                              ))}
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <button
                              onClick={() => {
                                setSelectedEntityForNote(std);
                                setNoteInput(std.note || "");
                                setIsNoteModalOpen(true);
                              }}
                              className="text-left text-slate-500 hover:text-[#3B82F6] font-semibold text-[11px] truncate max-w-[160px] block"
                            >
                              {std.note ? std.note : "+ Add Remark"}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* MODULE 2: STAFF & TEACHERS ATTENDANCE ROSTER */}
          {activeSubTab === "staff-roster" && (
            <div className="space-y-6">
              {/* Filter Bar for Staff */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-3">
                  <div>
                    <label className="text-[10px] font-extrabold uppercase text-slate-400 block mb-1">
                      Filter Department
                    </label>
                    <select
                      value={selectedStaffDept}
                      onChange={(e) => setSelectedStaffDept(e.target.value)}
                      className="bg-slate-50 border border-slate-200 font-bold text-xs text-[#142B4A] rounded-xl px-3 py-2 outline-none focus:border-[#3B82F6]"
                    >
                      <option value="All Departments">
                        All Departments & Faculties
                      </option>
                      <option value="Science">Science Faculty</option>
                      <option value="Mathematics">Mathematics</option>
                      <option value="Administration">Administration</option>
                      <option value="IT">IT & Support</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] font-extrabold uppercase text-slate-400 block mb-1">
                      Attendance Date
                    </label>
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="bg-slate-50 border border-slate-200 font-bold text-xs text-[#142B4A] rounded-xl px-3 py-2 outline-none focus:border-[#3B82F6]"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-extrabold uppercase text-slate-400 block mb-1">
                      Search Staff / Employee
                    </label>
                    <div className="relative">
                      <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                      <input
                        type="text"
                        placeholder="Search Code or Name..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="bg-slate-50 border border-slate-200 font-bold text-xs text-slate-800 rounded-xl pl-9 pr-3 py-2 outline-none focus:border-[#3B82F6]"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase mr-1">
                    Quick Mark Staff:
                  </span>
                  <button
                    onClick={() => handleMarkAllStaff("Present")}
                    className="px-3 py-1.5 bg-emerald-50 text-emerald-700 font-bold text-xs rounded-xl border border-emerald-200"
                  >
                    All Staff Present
                  </button>
                </div>
              </div>

              {/* Staff Roster Table */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-100">
                      <tr>
                        <th className="py-3.5 px-6">Emp Code</th>
                        <th className="py-3.5 px-6">Staff Member</th>
                        <th className="py-3.5 px-6">Department & Role</th>
                        <th className="py-3.5 px-6">Biometric Clock-In</th>
                        <th className="py-3.5 px-6">Shift Schedule</th>
                        <th className="py-3.5 px-6 text-center">
                          Status Action
                        </th>
                        <th className="py-3.5 px-6">Monthly Rate</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                      {filteredStaff.map((stf) => (
                        <tr
                          key={stf.id}
                          className="hover:bg-slate-50 transition-all"
                        >
                          <td className="py-4 px-6 font-mono font-bold text-[#142B4A]">
                            {stf.empCode}
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-xl bg-[#142B4A] text-[#D6B36A] font-extrabold text-xs flex items-center justify-center shrink-0">
                                {stf.avatar}
                              </div>
                              <div>
                                <p className="font-bold text-[#142B4A]">
                                  {stf.name}
                                </p>
                                <p className="text-[10px] text-slate-400">
                                  {stf.role}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-6 font-semibold text-slate-600">
                            {stf.dept}
                          </td>
                          <td className="py-4 px-6">
                            <span className="font-mono text-slate-800 text-[11px] bg-slate-100 px-2 py-1 rounded-md font-bold">
                              {stf.clockIn}
                            </span>
                          </td>
                          <td className="py-4 px-6 text-slate-500 text-[11px]">
                            {stf.shift}
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex items-center justify-center gap-1 bg-slate-100/80 p-1 rounded-2xl border border-slate-200/60 max-w-fit mx-auto">
                              {(
                                [
                                  "Present",
                                  "Late",
                                  "Absent",
                                  "On Leave",
                                ] as StaffStatus[]
                              ).map((st) => (
                                <button
                                  key={st}
                                  onClick={() =>
                                    handleStaffStatusChange(stf.id, st)
                                  }
                                  className={`px-2.5 py-1 rounded-xl font-bold text-[11px] transition-all ${
                                    stf.status === st
                                      ? st === "Present"
                                        ? "bg-emerald-500 text-white"
                                        : st === "Late"
                                          ? "bg-amber-500 text-white"
                                          : st === "Absent"
                                            ? "bg-rose-500 text-white"
                                            : "bg-purple-600 text-white"
                                      : "text-slate-500 hover:text-slate-900"
                                  }`}
                                >
                                  {st}
                                </button>
                              ))}
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <span className="font-bold text-emerald-600">
                              {stf.monthlyRate}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* MODULE 3: SUBJECT / PERIOD WISE ATTENDANCE */}
          {activeSubTab === "period-roster" && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h3 className="font-bold text-[#142B4A] text-sm">
                    Subject / Period-Wise Student Roster
                  </h3>
                  <p className="text-xs text-slate-400">
                    Track student presence across each academic period slot
                  </p>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                  <span className="px-2 py-1 bg-emerald-100 text-emerald-800 rounded-md">
                    P = Present
                  </span>
                  <span className="px-2 py-1 bg-amber-100 text-amber-800 rounded-md">
                    L = Late
                  </span>
                  <span className="px-2 py-1 bg-rose-100 text-rose-800 rounded-md">
                    A = Absent
                  </span>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-center text-xs">
                  <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-100">
                    <tr>
                      <th className="py-3 px-4 text-left">Student</th>
                      <th className="py-3 px-2">Period 1 (Math)</th>
                      <th className="py-3 px-2">Period 2 (Physics)</th>
                      <th className="py-3 px-2">Period 3 (English)</th>
                      <th className="py-3 px-2">Period 4 (Chemistry)</th>
                      <th className="py-3 px-2">Period 5 (Sports)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-bold">
                    {periodRoster.map((std) => (
                      <tr key={std.id} className="hover:bg-slate-50">
                        <td className="py-3 px-4 text-left font-bold text-[#142B4A]">
                          {std.name}
                        </td>
                        {(
                          [
                            "period1",
                            "period2",
                            "period3",
                            "period4",
                            "period5",
                          ] as PeriodKey[]
                        ).map((pKey, i) => (
                          <td key={i} className="py-3 px-2">
                            <span
                              className={`inline-block w-8 h-8 rounded-xl leading-8 font-black text-xs text-white ${
                                std[pKey] === "P"
                                  ? "bg-emerald-500"
                                  : std[pKey] === "L"
                                    ? "bg-amber-500"
                                    : "bg-rose-500"
                              }`}
                            >
                              {std[pKey]}
                            </span>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* MODULE 4: ANALYTICS & MONTHLY SHEET */}
          {activeSubTab === "monthly-analytics" && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
                <h3 className="font-bold text-[#142B4A] text-sm">
                  Weekly Comparison: Students vs. Staff Presence %
                </h3>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={WEEKLY_TREND}
                      margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                    >
                      <CartesianGrid
                        strokeDasharray="3 3"
                        vertical={false}
                        stroke="#F1F5F9"
                      />
                      <XAxis
                        dataKey="day"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 11, fill: "#64748B" }}
                      />
                      <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 11, fill: "#64748B" }}
                        domain={[80, 100]}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#142B4A",
                          borderRadius: "12px",
                          color: "#FFF",
                        }}
                      />
                      <Bar
                        dataKey="students"
                        name="Students %"
                        fill="#3B82F6"
                        radius={[4, 4, 0, 0]}
                        barSize={16}
                      />
                      <Bar
                        dataKey="staff"
                        name="Staff %"
                        fill="#142B4A"
                        radius={[4, 4, 0, 0]}
                        barSize={16}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {/* MODULE 5: LEAVE REQUESTS */}
          {activeSubTab === "leave-approvals" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {LEAVE_REQUESTS.map((leave) => (
                <div
                  key={leave.id}
                  className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-bold text-[#142B4A] text-sm">
                        {leave.name}
                      </h4>
                      <p className="text-xs text-slate-400">
                        {leave.role} • ID: {leave.id}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        leave.status === "Approved"
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {leave.status}
                    </span>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl text-xs space-y-1">
                    <p className="font-bold text-slate-700">
                      {leave.type} ({leave.days} Days)
                    </p>
                    <p className="text-slate-500 italic">"{leave.reason}"</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* MODULE 6: BIOMETRIC / RFID REAL TIME LOG */}
          {activeSubTab === "biometric-log" && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-3">
              <h3 className="font-bold text-[#142B4A] text-sm">
                Real-time Biometric & RFID Terminal Feed
              </h3>
              {BIOMETRIC_LOGS.map((log) => (
                <div
                  key={log.id}
                  className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between"
                >
                  <div>
                    <p className="text-xs font-bold text-[#142B4A]">
                      {log.user}{" "}
                      <span className="text-slate-400">({log.type})</span>
                    </p>
                    <p className="text-[10px] text-slate-500">
                      {log.cardNo} • {log.gate}
                    </p>
                  </div>
                  <span className="font-mono text-xs font-bold text-slate-800">
                    {log.time}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* MODULE 7: DEFAULTER & WARNINGS */}
          {activeSubTab === "defaulter-list" && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
              <h3 className="font-bold text-[#142B4A] text-sm">
                Low Attendance Warning List (&lt; 75% Threshold)
              </h3>
              <div className="space-y-3">
                {studentRoster
                  .filter((s) => parseFloat(s.overallAttendance) < 75)
                  .map((def) => (
                    <div
                      key={def.id}
                      className="p-4 bg-rose-50/50 border border-rose-200 rounded-2xl flex items-center justify-between"
                    >
                      <div>
                        <p className="font-bold text-[#142B4A] text-sm">
                          {def.name}
                        </p>
                        <p className="text-xs text-slate-500">
                          {def.class} • Overall:{" "}
                          <strong className="text-rose-600">
                            {def.overallAttendance}
                          </strong>
                        </p>
                      </div>
                      <button
                        onClick={() =>
                          showToast(
                            `Direct SMS alert dispatched to parents of ${def.name}`,
                          )
                        }
                        className="px-3.5 py-2 bg-rose-600 text-white rounded-xl text-xs font-bold hover:bg-rose-700"
                      >
                        Send Parent Warning
                      </button>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </main>
      {/* ==================== REMARKS MODAL ==================== */}
      {isNoteModalOpen && selectedEntityForNote && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-[#142B4A] text-base">Add Remark</h3>
              <button
                onClick={() => setIsNoteModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-slate-500">
              Record note for:{" "}
              <strong className="text-[#142B4A]">
                {selectedEntityForNote.name}
              </strong>
            </p>
            <textarea
              rows={3}
              value={noteInput}
              onChange={(e) => setNoteInput(e.target.value)}
              placeholder="e.g., Medical cause, Principal authorization..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-semibold text-slate-800 outline-none focus:border-[#3B82F6]"
            />
            <div className="flex gap-3">
              <button
                onClick={() => setIsNoteModalOpen(false)}
                className="flex-1 py-2 rounded-xl border text-xs font-bold"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setStudentRoster((prev) =>
                    prev.map((s) =>
                      s.id === selectedEntityForNote.id
                        ? { ...s, note: noteInput }
                        : s,
                    ),
                  );
                  setIsNoteModalOpen(false);
                  showToast(
                    `Remarks updated for ${selectedEntityForNote.name}`,
                  );
                }}
                className="flex-1 py-2 rounded-xl bg-[#3B82F6] text-white text-xs font-bold"
              >
                Save Remarks
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Attendances;
