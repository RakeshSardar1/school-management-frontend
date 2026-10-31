import { Icons } from "../icons";

interface NewButtonTypes {
  btnName: string;
  icon: string;
  onClick: () => void;
}

const CommonActionButton: React.FC<NewButtonTypes> = ({
  onClick,
  btnName,
  icon,
}) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 px-4 py-2.5 bg-[#3B82F6] hover:bg-blue-600 text-white rounded-xl font-medium text-sm shadow-md transition-all active:scale-95"
    >
      <Icons name={icon} className="w-4 h-4" />
      {btnName}
    </button>
  );
};

export default CommonActionButton;
