import { BrowserRouter } from "react-router-dom";

// Redux
import { Provider } from "react-redux";
import { store } from "./store";
import { SidebarList } from "./layouts/Sidebar";
import AppRoutes from "./route/Route";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="schoolWorld">
          <div className="min-h-screen bg-[#F8FAFC] text-slate-800 font-sans flex overflow-x-hidden selection:bg-[#3B82F6] selection:text-white">
            {/* ==================== LEFT BRAND SIDEBAR ==================== */}
            <SidebarList />

            {/* ==================== Route AREA ==================== */}
            <AppRoutes />
          </div>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
