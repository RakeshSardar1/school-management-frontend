import { Plus } from "lucide-react";
import { useState } from "react";

interface AdmissionLead {
  id: string;
  name: string;
  grade: string;
  parent: string;
  phone: string;
  stage: string;
  date: string;
}
type ToastType = "success" | "error" | "warning" | "info";

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}
const INITIAL_ADMISSIONS_PIPELINE = [
  {
    id: "ADM-LEAD-01",
    name: "Lucas Scott",
    grade: "Grade 9",
    parent: "Karen Scott",
    phone: "+1 555-0192",
    stage: "applied",
    date: "2026-10-20",
  },
  {
    id: "ADM-LEAD-02",
    name: "Maya Lin",
    grade: "Grade 10",
    parent: "Kevin Lin",
    phone: "+1 555-0193",
    stage: "doc_verification",
    date: "2026-10-21",
  },
  {
    id: "ADM-LEAD-03",
    name: "Ethan Harper",
    grade: "Grade 11",
    parent: "Sarah Harper",
    phone: "+1 555-0194",
    stage: "entrance_test",
    date: "2026-10-18",
  },
  {
    id: "ADM-LEAD-04",
    name: "Isabella Rossi",
    grade: "Grade 9",
    parent: "Marco Rossi",
    phone: "+1 555-0195",
    stage: "fee_paid",
    date: "2026-10-22",
  },
  {
    id: "ADM-LEAD-05",
    name: "Gabriel Santos",
    grade: "Grade 12",
    parent: "Maria Santos",
    phone: "+1 555-0196",
    stage: "enrolled",
    date: "2026-10-15",
  },
];
const StudentPipeline = () => {
  // Admission Pipeline State
  const [pipelineLeads, setPipelineLeads] = useState<AdmissionLead[]>(
    INITIAL_ADMISSIONS_PIPELINE,
  );
  const [isAdmissionModalOpen, setIsAdmissionModalOpen] = useState(false);
  // Toast Notifications
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (message: string, type: ToastType = "success") => {
    const id = crypto.randomUUID();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  // Handle Drag / Pipeline Stage Change
  const movePipelineStage = (leadId: string, nextStage: string): void => {
    setPipelineLeads((prev) =>
      prev.map((l) => (l.id === leadId ? { ...l, stage: nextStage } : l)),
    );
    addToast(
      `Applicant stage updated to ${nextStage.replace("_", " ").toUpperCase()}`,
      "info",
    );
  };
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <h2 className="text-lg font-bold text-[#142B4A]">
            Admissions Workflow & Pipeline
          </h2>
          <p className="text-xs text-slate-500">
            Track standard prospective lead stages for new enrollment applicants
          </p>
        </div>
        <button
          onClick={() => setIsAdmissionModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#3B82F6] hover:bg-blue-600 text-white rounded-xl font-medium text-sm shadow-md transition-all"
        >
          <Plus className="w-4 h-4" /> Add Prospective Lead
        </button>
      </div>

      {/* KANBAN BOARD STAGES */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 overflow-x-auto pb-4">
        {[
          {
            key: "applied",
            label: "1. Applied",
            color: "border-t-slate-400",
          },
          {
            key: "doc_verification",
            label: "2. Doc Verification",
            color: "border-t-blue-500",
          },
          {
            key: "entrance_test",
            label: "3. Entrance Test",
            color: "border-t-amber-500",
          },
          {
            key: "fee_paid",
            label: "4. Fee Paid",
            color: "border-t-purple-500",
          },
          {
            key: "enrolled",
            label: "5. Fully Enrolled",
            color: "border-t-emerald-500",
          },
        ].map((stage) => {
          const stageLeads = pipelineLeads.filter((l) => l.stage === stage.key);
          return (
            <div
              key={stage.key}
              className={`bg-slate-100/70 p-4 rounded-2xl border-t-4 ${stage.color} min-w-[220px] flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-slate-700 text-sm">
                    {stage.label}
                  </h3>
                  <span className="w-6 h-6 rounded-full bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center">
                    {stageLeads.length}
                  </span>
                </div>

                <div className="space-y-3">
                  {stageLeads.map((lead) => (
                    <div
                      key={lead.id}
                      className="bg-white p-4 rounded-xl shadow-xs border border-slate-200 space-y-2 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between">
                        <h4 className="font-bold text-[#142B4A] text-sm">
                          {lead.name}
                        </h4>
                        <span className="text-[10px] font-mono bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded">
                          {lead.grade}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500">
                        Parent: {lead.parent}
                      </p>
                      <p className="text-[11px] font-mono text-slate-400">
                        {lead.phone}
                      </p>

                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                        <span className="text-[10px] text-slate-400">
                          {lead.date}
                        </span>
                        <div className="flex items-center gap-1">
                          {stage.key !== "enrolled" && (
                            <button
                              onClick={() => {
                                const stages = [
                                  "applied",
                                  "doc_verification",
                                  "entrance_test",
                                  "fee_paid",
                                  "enrolled",
                                ];
                                const nextIdx = stages.indexOf(stage.key) + 1;
                                if (nextIdx < stages.length) {
                                  movePipelineStage(lead.id, stages[nextIdx]);
                                }
                              }}
                              className="p-1 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 text-[10px] font-bold"
                            >
                              Advance &rarr;
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}

                  {stageLeads.length === 0 && (
                    <div className="text-center py-8 text-xs text-slate-400 border border-dashed border-slate-300 rounded-xl">
                      No applicants
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StudentPipeline;
