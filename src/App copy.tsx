import { BrowserRouter } from "react-router-dom";

// Redux
import { Provider } from "react-redux";
import { store } from "./store";
import AppPre from "./App-pre";
import { Sparkles } from "lucide-react";
import { SidebarList } from "./layouts/Sidebar";
import { FeesModel, MainContent, OverviewLedger } from "./layouts";
import { useState } from "react";
import AppRoutes from "./route/Route";

function App() {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="schoolWorld">
          <div className="min-h-screen bg-[#F8FAFC] text-slate-800 font-sans flex overflow-x-hidden selection:bg-[#3B82F6] selection:text-white">
            {/* ==================== SYSTEM TOAST NOTIFICATION ==================== */}
            {toastMessage && (
              <div className="fixed bottom-6 right-6 z-50 bg-[#142B4A] text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-[#D6B36A]/40 flex items-center gap-3.5 animate-in fade-in slide-in-from-bottom-5 duration-300">
                <div className="w-8 h-8 rounded-xl bg-[#D6B36A] text-[#142B4A] flex items-center justify-center shrink-0 font-bold shadow-md">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#D6B36A] tracking-wide">
                    Scholix Notification
                  </p>
                  <p className="text-[11px] text-slate-200">{toastMessage}</p>
                </div>
              </div>
            )}

            {/* ==================== LEFT BRAND SIDEBAR ==================== */}
            <SidebarList />

            {/* ==================== MAIN CONTENT AREA ==================== */}
            <AppRoutes />

            {/* ==================== COLLECT FEE MODAL ==================== */}
            {isPaymentModalOpen && <FeesModel />}

            {/* ==================== SLIDE-OUT LEDGER DRAWER ==================== */}
            {isDrawerOpen && <OverviewLedger />}
          </div>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
