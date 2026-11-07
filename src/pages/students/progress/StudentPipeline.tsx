import { useStudentHooks } from "../../../customHooks";
import DateMonthYear from "../../../components/moment/DateMonthYear";
import { Icons } from "../../../components";
import { useAppDispatch, useAppSelector } from "../../../redux/ReduxHooks";
import { movePipelineStage } from "../../../redux/reducers/StudentReducer/StudentReducer";
import { useState } from "react";
import type {
  PipeLineLeadsTypes,
  ProgressKeysTypes,
  StageMeta,
} from "../../../utilities/types";

import StudentAdmissionHOC from "../StudentAdmissionHOC";

interface SelectedAdvanced {
  lead: PipeLineLeadsTypes;
  stage: StageMeta;
  nextStage: string; // or `Stage` enum type if you have one
}

const StudentPipeline = () => {
  const dispatch = useAppDispatch();

  const { triggerModal, activeModal, setTriggerModal, setActiveModal } =
    useStudentHooks();
  const [selectedAdvanced, setSelectedAdvanced] =
    useState<SelectedAdvanced | null>(null);

  const openModal = (type: string) => {
    setTriggerModal(type);
    setActiveModal(true);
  };

  const closeModal = () => {
    setTriggerModal("");
    setActiveModal(false);
  };

  const { progressPipeLine, pipelineLeads, studentsDirectory } = useAppSelector(
    (state) => state.student,
  );

  const handleAdvanced = () => {
    if (selectedAdvanced?.lead.id && selectedAdvanced?.nextStage) {
      dispatch(
        movePipelineStage({
          leadId: selectedAdvanced?.lead.id,
          nextStage: selectedAdvanced?.nextStage,
        }),
      );
    }
    closeModal();
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
                        <div className="flex gap-1 items-center">
                          <Icons
                            size={stage.icon === "CircleCheck" ? 18 : 15}
                            className={
                              stage.icon === "CircleCheck"
                                ? "fill-green-500 text-white"
                                : "text-[10px] text-slate-400"
                            }
                            name={stage.icon}
                          />
                          {stage.key === "fee_paid" ? (
                            <span className="text-[10px] text-slate-400">
                              Paid ₹7000
                            </span>
                          ) : (
                            stage.key !== "enrolled" && (
                              <DateMonthYear
                                className="text-[10px] text-slate-400"
                                passingData={lead.date}
                              />
                            )
                          )}
                        </div>

                        <div className="flex items-center gap-1">
                          {stage.key === "enrolled" ? (
                            <>
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
                                    dispatch(
                                      movePipelineStage({
                                        leadId: lead.id,
                                        nextStage: stages[nextIdx],
                                      }),
                                    );
                                  }
                                }}
                                className="p-1 bg-green-100 pl-2 text-green-600 rounded hover:bg-green-100 text-[10px] font-bold"
                              >
                                Enrolled <span>&#10003;</span>
                              </button>
                            </>
                          ) : (
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
                                  setSelectedAdvanced({
                                    lead,
                                    stage,
                                    nextStage: stages[nextIdx],
                                  });
                                  if (
                                    stage.key === "doc_verification" ||
                                    stage.key === "entrance_test" ||
                                    stage.key === "fee_paid"
                                  ) {
                                    openModal(stage.key);
                                  } else {
                                    dispatch(
                                      movePipelineStage({
                                        leadId: lead.id,
                                        nextStage: stages[nextIdx],
                                      }),
                                    );
                                  }
                                }
                              }}
                              className="p-1 cursor-pointer bg-blue-50 text-blue-600 rounded hover:bg-blue-100 text-[10px] font-bold"
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
