import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LoginPage } from "./layouts";
import { Dashboard } from "./layouts";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}
export default App;
