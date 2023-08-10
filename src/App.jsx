import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import PnList from "./pages/PN_list";
import PnSummary from "./pages/PN_summary";
import PnHistory from "./pages/PN_history";
import EventViewer from "./pages/EventViewer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import AuthLayout from "./layouts/AuthLayout";
import GuestLayout from "./layouts/GuestLayout";
import { AuthProvider } from "./context/AuthContext";

export default function App() {
  return (
    <div className="bg-slate-100 min-h-screen w-full m-0 p-0">
      <BrowserRouter basename="/">
        <AuthProvider>
          <Routes>
            <Route element={<AuthLayout />}>
              <Route path="/" element={<Home />}></Route>
              <Route path="/pn-list" element={<PnList />}></Route>
              <Route path="/pn-summary" element={<PnSummary />}></Route>
              <Route path="/pn-history" element={<PnHistory />}></Route>
              <Route path="/event-viewer" element={<EventViewer />}></Route>
            </Route>

            <Route element={<GuestLayout />}>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/register" element={<Register />}></Route>
              <Route
                path="/forgot-password"
                element={<ForgotPassword />}
              ></Route>
              <Route
                path="/password-reset/:token"
                element={<ResetPassword />}
              ></Route>
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}
