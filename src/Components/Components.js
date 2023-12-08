import SpendingHistory from "./SpendingHistory/SpendingHistory";
import Home from "./Home/Home";
import Header from "./Header/Header";
import AuthModule from "./Auth/Login/Auth.js";
import AuthRegister from "./Auth/Register/AuthRegister";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute.js";
import UnprotectedRoute from "./UnprotectedRoute/UnprotectedRoute.js";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

// Highest level component: routes and imports all child components
export default function Components() {

  return (
    <Router>
      <Header />
      <Routes>
        {/* Only allow unauthed users to auth pages */}
        <Route
          path="/auth"
          element={<UnprotectedRoute path="/auth" element={AuthModule} />}
        />
        <Route
          path="/auth/register"
          element={<UnprotectedRoute path="/auth" element={AuthRegister} />}
        />

        {/* Only allow authed users to protected pages */}
        <Route
          path="/transactions/:accountId?"
          element={<ProtectedRoute path="/" element={SpendingHistory} />}
        />
        <Route path="/" element={<ProtectedRoute path="/" element={Home} />} />
        <Route path="*" element={<Navigate to="/auth" replace />} />
      </Routes>
    </Router>
  );
}
