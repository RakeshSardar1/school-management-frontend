/* eslint-disable react-hooks/exhaustive-deps */
import { Routes, Route } from "react-router-dom";
import AppPre from "../App-pre";
import { StudentOverview } from "../pages";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path={"/"} element={<AppPre />} />
      <Route path={"/students"} element={<StudentOverview />} />
    </Routes>
  );
};

export default AppRoutes;
