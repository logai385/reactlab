import Main from "./templates/main/Main";
import { Routes, Route, useNavigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";

import PrivateRoute from "./routes/PrivateRoute";
import { Login } from "./pages/Auth/Login";
import PublicRoute from "./routes/PublicRoute";
import Line from "./pages/Line/Line";
import Transporter from "./pages/ManagementBus/Transporter";
import SignDocument from "./pages/SignDocument/SignDocument";
import SignDocumentAdd from "./pages/SignDocument/SignDocumentAdd";
import User from "./pages/User/User";
import { useDispatch, } from "react-redux";
import Unit from "./pages/Unit/Unit";
// import LoadingPage from "./component/loading/LoadingPage";

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  dispatch({ type: "SET_HITORY", payload: navigate });

  return (
    <>
      <Routes>
        <Route path="/login" element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
        </Route>

        <Route path="/" element={<PrivateRoute />}>
          <Route path="/" element={<Main />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/transporter" element={<Transporter />} />
            <Route path="/line" element={<Line />} />
            <Route path="/document/add" element={<SignDocumentAdd />} />
            <Route path="/document" element={<SignDocument />} />
            <Route path="/user" element={<User />} />
            <Route path="/unit" element={<Unit />} />
          </Route>
        </Route>
      </Routes>
      {/* <LoadingPage /> */}
    </>
  );
}

export default App;
