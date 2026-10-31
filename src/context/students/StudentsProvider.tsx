import { useState, type ReactNode } from "react";
import StudentsContext from "./StudentsContext";

export default function StudentsProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filterGrade, setFilterGrade] = useState<string>("All");
  const [filterSection, setFilterSection] = useState<string>("All");
  const [filterCategory, setFilterCategory] = useState<string>("All");
  const [filterStatus, setFilterStatus] = useState<string>("All");

  const [triggerModal, setTriggerModal] = useState<string | null>(null);
  const [activeModal, setActiveModal] = useState<boolean>(false);

  return (
    <StudentsContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        filterGrade,
        setFilterGrade,
        filterSection,
        setFilterSection,
        filterCategory,
        setFilterCategory,
        filterStatus,
        setFilterStatus,
        triggerModal,
        setTriggerModal,
        activeModal,
        setActiveModal,
      }}
    >
      {children}
    </StudentsContext.Provider>
  );
}
