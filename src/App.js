import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route, useLocation } from "react-router-dom";

import Sidebar from "./scenes/global/Sidebar";
import Topbar from "./scenes/global/Topbar";

import Dashboard from "./scenes/dashboard";
import Vans from "./scenes/van";
import Partners from "./scenes/partner";
import Contractors from "./scenes/contractor";
import Roles from "./scenes/role";
import JobTypes from "./scenes/jobType";
import Job from "./scenes/job";
import JobCategories from "./scenes/jobCategory";
import RoleRates from "./scenes/roleRate";
import ContractorRates from "./scenes/contractorRate";
import PartnersJobReport from "./scenes/reports/partnerReports";
import ContractorReport from "./scenes/reports/contractorReport";
import JobReport from "./scenes/reports/jobReport";

import Login from "./scenes/login/Login";
import Register from "./scenes/register/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";

function App() {
  const [theme, colorMode] = useMode();
  const location = useLocation();
  const isLoginPage = location.pathname === "/login" || location.pathname === "/register";

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <AuthProvider>
          <div className="app">
            {!isLoginPage && <Sidebar />}

            <main className="content">
              {!isLoginPage && <Topbar />}

              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path="/van" element={<ProtectedRoute><Vans /></ProtectedRoute>} />
                <Route path="/partner" element={<ProtectedRoute><Partners /></ProtectedRoute>} />
                <Route path="/contractor" element={<ProtectedRoute><Contractors /></ProtectedRoute>} />
                <Route path="/role" element={<ProtectedRoute><Roles /></ProtectedRoute>} />
                <Route path="/jobType" element={<ProtectedRoute><JobTypes /></ProtectedRoute>} />
                <Route path="/job" element={<ProtectedRoute><Job /></ProtectedRoute>} />
                <Route path="/jobCategory" element={<ProtectedRoute><JobCategories /></ProtectedRoute>} />
                <Route path="/roleRate" element={<ProtectedRoute><RoleRates /></ProtectedRoute>} />
                <Route path="/contractorRate" element={<ProtectedRoute><ContractorRates /></ProtectedRoute>} />
                <Route path="/partnerReport" element={<ProtectedRoute><PartnersJobReport /></ProtectedRoute>} />
                <Route path="/contractorReport" element={<ProtectedRoute><ContractorReport /></ProtectedRoute>} />
                <Route path="/jobReport" element={<ProtectedRoute><JobReport /></ProtectedRoute>} />
              </Routes>
            </main>
          </div>
        </AuthProvider>

      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}


export default App;
