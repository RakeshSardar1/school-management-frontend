import { useContext } from "react";
import { StudentsContext } from "../../context";

export default function useStudentHooks() {
  const context = useContext(StudentsContext);

  if (!context) {
    throw new Error(
      "useStudentHooks must be used within a StudentSearchProvider",
    );
  }

  return context;
}
