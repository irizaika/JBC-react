import { ColorModeContext, useMode } from "./theme";  
import { CssBaseline, ThemeProvider } from "@mui/material";
import Topbar from "./scenes/global/Topbar";
import Dashboard from "./scenes/dashboard";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./scenes/global/Sidebar";

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

function App() {

  const [theme, colorMode] = useMode();
  
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar/>
          <main className="content">
            <Topbar />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/van" element={<Vans />} />
              <Route path="/partner" element={<Partners />} />
              <Route path="/contractor" element={<Contractors />} />
              <Route path="/role" element={<Roles />} />
              <Route path="/jobType" element={<JobTypes />} />
              <Route path="/job" element={<Job />} />
              <Route path="/jobCategory" element={<JobCategories />} />
              <Route path="/roleRate" element={<RoleRates />} />
              <Route path="/contractorRate" element={<ContractorRates />} />
              <Route path="/partnerReport" element={<PartnersJobReport />} />
              <Route path="/contractorReport" element={<ContractorReport />} />
              <Route path="/jobReport" element={<JobReport />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}


export default App;
