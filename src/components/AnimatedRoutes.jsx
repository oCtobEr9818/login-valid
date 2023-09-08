import { useLocation, Route, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Home from "../pages/Home";
import PnList from "../pages/PN_list";
import PnSummaryFEX0100 from "../pages/pnSummary/PN_summary_FEX0100";
import PnSummaryFEX0101 from "../pages/pnSummary/PN_summary_FEX0101";
import PnSummaryFEX0102 from "../pages/pnSummary/PN_summary_FEX0102";
import PnSummaryTCN01A1 from "../pages/pnSummary/PN_summary_TCN01A1";
import PnSummaryTCN01A2 from "../pages/pnSummary/PN_summary_TCN01A2";
import PnSummaryTCN02A1 from "../pages/pnSummary/PN_summary_TCN02A1";
import PnHistory from "../pages/PN_history";
import EventViewer from "../pages/EventViewer";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import AuthLayout from "../layouts/AuthLayout";
import GuestLayout from "../layouts/GuestLayout";
import { AuthProvider } from "../context/AuthContext";

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <>
      <AnimatePresence mode="wait">
        <AuthProvider>
          <Routes location={location} key={location.pathname}>
            <Route element={<AuthLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/pn-list" element={<PnList />} />
              <Route
                path="/pn-list/pn-summary-FEX0100"
                element={<PnSummaryFEX0100 />}
              />
              <Route
                path="/pn-list/pn-summary-FEX0101"
                element={<PnSummaryFEX0101 />}
              />
              <Route
                path="/pn-list/pn-summary-FEX0102"
                element={<PnSummaryFEX0102 />}
              />
              <Route
                path="/pn-list/pn-summary-TCN01A1"
                element={<PnSummaryTCN01A1 />}
              />
              <Route
                path="/pn-list/pn-summary-TCN01A2"
                element={<PnSummaryTCN01A2 />}
              />
              <Route
                path="/pn-list/pn-summary-TCN02A1"
                element={<PnSummaryTCN02A1 />}
              />

              <Route path="/pn-history" element={<PnHistory />} />
              <Route path="/event-viewer" element={<EventViewer />} />
            </Route>

            <Route element={<GuestLayout />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route
                path="/password-reset/:token"
                element={<ResetPassword />}
              />
            </Route>
          </Routes>
        </AuthProvider>
      </AnimatePresence>
    </>
  );
};

export default AnimatedRoutes;
