import type { CardItemRowOverviewTypes } from "../../utilities/types";

interface CardItemRowOverviewPropsTypes {
  card: CardItemRowOverviewTypes;
}
const CardRow: React.FC<CardItemRowOverviewPropsTypes> = ({ card }) => {
  const Icon = card.icon;
  return (
    <>
      <div
        key={card.id}
        className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex items-center justify-between gap-3"
      >
        <div className="flex items-center gap-4 min-w-0">
          <div
            className={`w-12 h-12 rounded-2xl ${card.iconBg} ${card.iconColor} flex items-center justify-center shrink-0`}
          >
            <Icon className="w-6 h-6" />
          </div>

          <div className="min-w-0">
            <p className="text-xs text-slate-500 font-semibold">{card.title}</p>
            <p className="text-2xl font-black text-[#142B4A] mt-0.5">
              {card.value}
            </p>
          </div>
        </div>

        <span
          className={`text-xs font-bold ${card.badgeColor} ${card.badgeBg} px-3 py-1 rounded-xl shrink-0`}
        >
          {card.badge}
        </span>
      </div>
    </>
  );
};

export default CardRow;
