import Main from "./templates/main/Main";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import Transporter from "./pages/Transporter/Transporter";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />}>
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Transporter" element={<Transporter />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
