import { UserCheck } from "lucide-react";
import { findFraction } from "../../utilities/Helpers/converter";
import CardStatusRing from "./CardStatusRing";

interface CardRowMetricsProps {
  headText: string;
  fraction: [number, number, string];
  statusRing: boolean;
  ringColor?: string;
}

const CardRowMetrics: React.FC<CardRowMetricsProps> = ({
  headText = "",
  fraction = [0, 1, ""],
  statusRing = false,
  ringColor = "#3B82F6",
}) => {
  return (
    <>
      <div className="space-y-2">
        <div className="w-10 h-10 rounded-xl bg-slate-100 text-[#142B4A] border border-slate-200 flex items-center justify-center">
          <UserCheck className="w-5 h-5" />
        </div>
        <div>
          <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
            {headText}
          </p>
          <p className="text-2xl font-black text-[#142B4A] mt-0.5">
            {fraction[0]}{" "}
            <span className="text-slate-400 font-bold text-base">
              / {fraction[1]}
            </span>
          </p>
        </div>
      </div>

      {statusRing ? (
        <CardStatusRing
          ringColor={ringColor}
          total={fraction[1]}
          current={fraction[0]}
        />
      ) : (
        <div className="text-right">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-[#142B4A] text-white">
            {findFraction([10, 80]) || ""}
            {fraction[2]}
          </span>
        </div>
      )}
    </>
  );
};

export default CardRowMetrics;
