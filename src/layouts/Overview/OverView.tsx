import { CardRowMetrics } from "../../components/cards";
import { useAppSelector } from "../../redux/ReduxHooks";

const OverView = () => {
  const { overviewRow } = useAppSelector((state) => state.overView);

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      {overviewRow.map((item, i) => (
        <div
          className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex items-center justify-between relative overflow-hidden"
          key={i}
        >
          <CardRowMetrics
            key={item.id}
            headText={item.headText}
            fraction={item.fraction}
            statusRing={item.statusRing}
            ringColor={item.ringColor}
          />
        </div>
      ))}
    </div>
  );
};

export default OverView;
