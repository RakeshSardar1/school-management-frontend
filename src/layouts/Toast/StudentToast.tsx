import { CheckCircle2, Sparkles } from "lucide-react";

const StudentToast = () => {
  return (
    <div className="fixed top-5 right-5 z-50 flex flex-col gap-2 pointer-events-none">
      {[
        {
          id: "1",
          type: "success",
          message: "Student admission created successfully",
        },
        {
          id: "2",
          type: "warning",
          message: "Student attendance is below 75%",
        },
        {
          id: "3",
          type: "info",
          message: "New admission application received",
        },
        {
          id: "4",
          type: "error",
          message: "Failed to save student information",
        },
      ].map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl shadow-xl text-white font-medium text-sm transition-all transform translate-y-0 ${
            toast.type === "success"
              ? "bg-emerald-600"
              : toast.type === "warning"
                ? "bg-amber-500"
                : toast.type === "info"
                  ? "bg-[#3B82F6]"
                  : "bg-rose-600"
          }`}
        >
          {toast.type === "success" && (
            <CheckCircle2 className="w-5 h-5 text-emerald-100" />
          )}
          {toast.type === "info" && (
            <Sparkles className="w-5 h-5 text-blue-100" />
          )}
          <span>{toast.message}</span>
        </div>
      ))}
    </div>
  );
};

export default StudentToast;
