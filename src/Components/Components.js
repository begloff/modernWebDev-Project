import SpendingHistory from "./SpendingHistory/SpendingHistory";
import Home from "./Home/Home";
import Header from "./Header/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Highest level component: routes and imports all child components
export default function Components() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/SpendingHistory" element={<SpendingHistory />} />
      </Routes>
    </Router>
  );
}
