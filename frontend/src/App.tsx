import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { LoginPage, Dashboard, BalancePage, TransactionPage } from "./layouts";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<Dashboard />} />
        <Route path="/balance" element={<BalancePage />} />
        <Route path="/deposit" element={<TransactionPage />} />
        <Route path="/withdrawal" element={<TransactionPage />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}
