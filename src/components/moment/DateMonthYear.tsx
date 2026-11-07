import moment from "moment";

interface DateMonthYearProps {
  passingData: Date | string; // The date string in "YYYY-MM-DD" format
  className?: string;
  fallback?: string;
}

const DateMonthYear: React.FC<DateMonthYearProps> = ({
  passingData,
  className,
  fallback = "",
}) => {
  const m = moment(passingData);
  if (!m.isValid()) {
    return <span className={className}>{fallback}</span>;
  }
  return <span className={className}>{m.format("DD MMM YYYY")}</span>;
};

export default DateMonthYear;
