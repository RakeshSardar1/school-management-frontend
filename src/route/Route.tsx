/* eslint-disable react-hooks/exhaustive-deps */
import { Routes, Route } from "react-router-dom";
import AppPre from "../App-pre";
import {
  Attendances,
  StaffOnboarding,
  StaffsLayout,
  StudentOverview,
} from "../pages";
import StaffsDirectory from "../pages/staffs/StaffsDirectory";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path={"/"} element={<AppPre />} />
      <Route path={"/students"} element={<StudentOverview />} />
      <Route path={"/attendances"} element={<Attendances />} />

      <Route path={"/staffs"} element={<StaffsLayout />}>
        <Route index element={<StaffsDirectory />} />
        <Route path={"employee-onboarding"} element={<StaffOnboarding />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
