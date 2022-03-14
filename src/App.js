import Main from "./templates/main/Main";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";

import  PrivateRoute  from "./routes/PrivateRoute";
import { Login } from "./pages/Auth/Login";
import  PublicRoute from "./routes/PublicRoute";
import Line from "./pages/Line/Line";
import Transporters from "./pages/ManagementBus/Transporters";
import SignDocument from "./pages/SignDocument/SignDocument";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
        </Route>
      

        <Route path="/" element={<PrivateRoute />}>
          <Route path="/" element={<Main />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/transporter" element={<Transporters />} />
            <Route path="/line" element={<Line />} />
            <Route path="/document" element={<SignDocument />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
