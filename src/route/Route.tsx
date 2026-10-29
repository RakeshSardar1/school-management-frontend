/* eslint-disable react-hooks/exhaustive-deps */
import { Routes, Route } from "react-router-dom";
import AppPre from "../App-pre";
import { Attendances, StudentOverview } from "../pages";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path={"/"} element={<AppPre />} />
      <Route path={"/students"} element={<StudentOverview />} />
      <Route path={"/attendances"} element={<Attendances />} />
    </Routes>
  );
};

export default AppRoutes;
