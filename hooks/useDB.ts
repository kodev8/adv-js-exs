import { useContext } from "react";
import { DBContext } from "@/utils/db";

export const useDB = () => {
  const context = useContext(DBContext);
  if (!context) {
    throw new Error("useDBContext must be used within a DBContextProvider");
  }
  return context;
};
