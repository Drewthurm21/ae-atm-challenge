import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LoginPage, Dashboard, BalancePage } from "./layouts";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<Dashboard />} />
        <Route path="/balance" element={<BalancePage />} />
      </Routes>
    </Router>
  );
}
export default App;
