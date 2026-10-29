import { UserPlus } from "lucide-react";
import { useAppDispatch } from "../../redux/ReduxHooks";
import { STUDENT_ADMISSION } from "../../redux/ConstantCommon";
import { chooseModal } from "../../redux/reducers/ModalReducer/ModalReducer";

const NewAdmissionButton = () => {
  const dispatch = useAppDispatch();
  return (
    <button
      onClick={() => dispatch(chooseModal(STUDENT_ADMISSION))}
      className="flex items-center gap-2 px-4 py-2.5 bg-[#3B82F6] hover:bg-blue-600 text-white rounded-xl font-medium text-sm shadow-md transition-all active:scale-95"
    >
      <UserPlus className="w-4 h-4" />
      New Admission
    </button>
  );
};

export default NewAdmissionButton;
