import { IdCardLanyard } from "lucide-react";
import {
  Building2,
  Wallet,
  Users,
  Receipt,
  FileCheck2,
  FileText,
  CalendarCheck,
  BookMarked,
  BookOpen,
  CreditCard,
  UserPlus,
  PieChart,
  RefreshCw,
  ChevronDown,
  ChevronRight,
  X,
  Calendar,
  CircleCheck,
  User,
  School,
  ShieldCheck,
  CheckCircle2,
  Upload,
  ArrowUpRight,
  Edit3,
  FileCheck,
  IdCard,
  Info,
  CircleX,
  type LucideIcon,
} from "lucide-react";

// 1. Create the map of all available icons
const ICON_MAP: Record<string, LucideIcon> = {
  Building2,
  Wallet,
  Users,
  Receipt,
  FileCheck2,
  FileText,
  CalendarCheck,
  BookMarked,
  BookOpen,
  CreditCard,
  UserPlus,
  PieChart,
  RefreshCw,
  ChevronDown,
  ChevronRight,
  X,
  Calendar,
  CircleCheck,
  User,
  School,
  ShieldCheck,
  CheckCircle2,
  Upload,
  ArrowUpRight,
  Edit3,
  FileCheck,
  IdCard,
  Info,
  CircleX,
};

interface IconProps {
  name: string;
  size?: number;
  className?: string; // Optional Tailwind classes (for color, etc.)
}

const Icons: React.FC<IconProps> = ({ name, size = 20, className = "" }) => {
  const IconComponent = ICON_MAP[name];

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found in ICON_MAP`);
    return null;
  }

  return <IconComponent size={size} className={className} />;
};

export default Icons;
