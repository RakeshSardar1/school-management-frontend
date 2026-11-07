import { createContext } from "react";

export interface StaffsContextType {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
}

const StaffsContext = createContext<StaffsContextType | undefined>(undefined);
export default StaffsContext;
