import { useState, useMemo } from "react";
import { useStudentHooks } from "../../../customHooks";
import { DateMonthYear, Icons } from "../../../components";
import { useAppDispatch, useAppSelector } from "../../../redux/ReduxHooks";
import { movePipelineStage } from "../../../redux/reducers/StudentReducer/StudentReducer";
import type {
  PipeLineLeadsTypes,
  ProgressKeysTypes,
  StageMeta,
} from "../../../utilities/types";

import StudentAdmissionHOC from "../StudentAdmissionHOC";
import { ProgressKeys } from "../../../redux/ConstantCommon";

interface SelectedAdvanced {
  lead: PipeLineLeadsTypes;
  stage: StageMeta;
  nextStage: ProgressKeysTypes;
}

const StudentPipeline = () => {
  const dispatch = useAppDispatch();

  const { triggerModal, activeModal, setTriggerModal, setActiveModal } =
    useStudentHooks();

  const [selectedAdvanced, setSelectedAdvanced] =
    useState<SelectedAdvanced | null>(null);

  const { progressPipeLine, pipelineLeads, studentsDirectory } = useAppSelector(
    (state) => state.student,
  );

  // OPTIMIZATION 1: Group leads by stage once instead of filtering inside the map loop
  const leadsByStage = useMemo(() => {
    return pipelineLeads.reduce(
      (acc, lead) => {
        if (!acc[lead.stage]) acc[lead.stage] = [];
        acc[lead.stage].push(lead);
        return acc;
      },
      {} as Record<string, PipeLineLeadsTypes[]>,
    );
  }, [pipelineLeads]);

  const openModal = (type: string) => {
    setTriggerModal(type);
    setActiveModal(true);
  };

  const closeModal = () => {
    setTriggerModal("");
    setActiveModal(false);
  };

  const handleAdvanced = () => {
    if (selectedAdvanced?.lead.name && selectedAdvanced?.nextStage) {
      dispatch(
        movePipelineStage({
          leadId: selectedAdvanced.lead.name,
          nextStage: selectedAdvanced.nextStage,
        }),
      );
    }
    closeModal();
  };

  // OPTIMIZATION 2: Extracted the advance logic out of the JSX
  const handleAdvanceStage = (lead: PipeLineLeadsTypes, stage: StageMeta) => {
    const nextIdx = ProgressKeys.findIndex((key) => key === stage.key) + 1;

    if (nextIdx >= ProgressKeys.length) return;

    const nextStage = ProgressKeys[nextIdx];

    const requiresModal =
      stage.key === "doc_verification" ||
      stage.key === "entrance_test" ||
      (stage.key === "fee_paid" && !lead.paymentStatus);

    if (requiresModal) {
      setSelectedAdvanced({ lead, stage, nextStage });
      openModal(stage.key);
    } else {
      dispatch(movePipelineStage({ leadId: lead.name, nextStage }));
    }
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
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 overflow-x-auto pb-4">
        {progressPipeLine.map((stage) => {
          // Use the memoized object here instead of filtering inside the loop
          const stageLeads = leadsByStage[stage.key] || [];

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
                  {stageLeads.map((lead, index) => (
                    <div
                      key={index}
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
                        {stage.key === "fee_paid" ? (
                          lead.paymentStatus ? (
                            <span className="flex items-center gap-1">
                              <Icons
                                name="CircleCheck"
                                size={18}
                                className="fill-green-500 text-white"
                              />
                              <span className="text-[10px] font-semibold text-green-600">
                                Paid
                              </span>
                            </span>
                          ) : (
                            <span className="flex items-center gap-1">
                              <Icons
                                name="CircleX"
                                size={18}
                                className="text-red-500"
                              />
                              <span className="text-[10px] font-semibold text-red-500">
                                Not paid
                              </span>
                            </span>
                          )
                        ) : (
                          <span className="flex items-center gap-1">
                            <Icons
                              size={stage.icon === "CircleCheck" ? 18 : 15}
                              className={
                                stage.icon === "CircleCheck"
                                  ? "fill-green-500 text-white"
                                  : "text-[10px] text-slate-400"
                              }
                              name={stage.icon}
                            />

                            {stage.key == "enrolled" && (
                              <>
                                <span className="text-[10px] text-slate-400">
                                  Paid on:
                                </span>
                              </>
                            )}
                            <DateMonthYear
                              className="text-[10px] text-slate-400"
                              passingData={lead.date}
                            />
                          </span>
                        )}

                        <div className="flex items-center gap-1">
                          {stage.key === "enrolled" ? (
                            <button
                              onClick={() => {
                                const nextIdx =
                                  ProgressKeys.findIndex(
                                    (key) => key === stage.key,
                                  ) + 1;
                                if (nextIdx < ProgressKeys.length) {
                                  dispatch(
                                    movePipelineStage({
                                      leadId: lead.name,
                                      nextStage: ProgressKeys[nextIdx],
                                    }),
                                  );
                                }
                              }}
                              className="p-1 bg-green-100 pl-2 text-green-600 rounded hover:bg-green-100 text-[10px] font-bold"
                            >
                              Enrolled <span>&#10003;</span>
                            </button>
                          ) : (
                            <button
                              onClick={() => handleAdvanceStage(lead, stage)}
                              className="p-1 cursor-pointer bg-blue-50 text-blue-600 rounded hover:bg-blue-100 text-[10px] font-bold"
                            >
                              {stage.key === "fee_paid" && !lead.paymentStatus
                                ? "Pay Now →"
                                : "Advance →"}
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

      {triggerModal && activeModal && selectedAdvanced && (
        <StudentAdmissionHOC
          studentCount={studentsDirectory.length}
          student={selectedAdvanced.lead}
          studentAdmissionStatus={triggerModal as ProgressKeysTypes}
          onClose={closeModal}
          onNext={handleAdvanced}
        />
      )}
    </div>
  );
};

export default StudentPipeline;
