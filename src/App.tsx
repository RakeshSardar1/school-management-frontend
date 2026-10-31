import { BrowserRouter } from "react-router-dom";

// Redux
import { Provider } from "react-redux";
import { store } from "./store";
import { SidebarList } from "./layouts/Sidebar";
import AppRoutes from "./route/Route";
import { AccessHOC } from "./HOC";
import { useAppSelector } from "./redux/ReduxHooks";
import type { UserCategory } from "./utilities/types";

function AppLayout() {
  const user = useAppSelector((state) => state.auth.user);

  console.log("user from redux:", user);

  return (
    <div className="schoolWorld">
      <div className="min-h-screen bg-[#F8FAFC] text-slate-800 font-sans flex overflow-x-hidden selection:bg-[#3B82F6] selection:text-white">
        {/* ==================== LEFT BRAND SIDEBAR ==================== */}
        <SidebarList />

        {/* ==================== Route AREA ==================== */}
        <div className="flex-1">
          {/* Wrap ONLY the routes in the HOC, so public routes (like Login) aren't blocked */}
          <AccessHOC role={user as UserCategory}>
            <AppRoutes />
          </AccessHOC>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppLayout />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
