import { UserPlus } from "lucide-react";
import React from "react";

const NewAdmissionButton = () => {
  return (
    <button
      //   onClick={() => setIsAdmissionModalOpen(true)}
      className="flex items-center gap-2 px-4 py-2.5 bg-[#3B82F6] hover:bg-blue-600 text-white rounded-xl font-medium text-sm shadow-md transition-all active:scale-95"
    >
      <UserPlus className="w-4 h-4" />
      New Admission
    </button>
  );
};

export default NewAdmissionButton;
