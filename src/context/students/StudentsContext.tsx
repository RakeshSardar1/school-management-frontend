import { createContext } from "react";

export interface SearchContextType {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  filterGrade: string;
  setFilterGrade: (value: string) => void;
  filterSection: string;
  setFilterSection: (value: string) => void;
  filterCategory: string;
  setFilterCategory: (value: string) => void;
  filterStatus: string;
  setFilterStatus: (value: string) => void;

  triggerModal: string | null;
  setTriggerModal: (value: string) => void;
  activeModal: boolean;
  setActiveModal: (value: boolean) => void;
}

const StudentsContext = createContext<SearchContextType | undefined>(undefined);
export default StudentsContext;
