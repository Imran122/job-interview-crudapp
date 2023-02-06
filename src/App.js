import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoute from "./routes/PrivateRoute";
import AuthProvider from "./context/AuthProvider";
import Login from "./pages/Authentication/Login";
import SignUp from "./pages/Authentication/SignUp";
import DashboardHome from "./pages/Dashboard/DashboardHomeComponent/DashboardHome";

import UserList from "./pages/Dashboard/UserList/UserList ";

import HomeDashboardComponent from "./pages/Dashboard/DashboardHomeComponent/HomeDashboardComponent";
import UserPayment from "./pages/Dashboard/UserPayment/UserPayment";
import AgentDashboard from "./pages/Dashboard/AgentDashboard/AgentDashboard";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} exact />
          {/* privet routes */}

          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <DashboardHome />
              </PrivateRoute>
            }
          >
            {/* dashboard nested route */}

            <Route
              path="/dashboard/"
              element={<HomeDashboardComponent />}
            ></Route>
            <Route path="/dashboard/user-list" element={<UserList />}></Route>

            <Route
              path="/dashboard/user-payment"
              element={<UserPayment />}
            ></Route>
            <Route
              path="/dashboard/agent-dashboard"
              element={<AgentDashboard />}
            ></Route>
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
