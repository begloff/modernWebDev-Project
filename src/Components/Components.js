import SpendingHistory from "./SpendingHistory/SpendingHistory";
import Home from "./Home/Home";
import Footer from "./Footer/Footer";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

export default function Components() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/SpendingHistory" element={<SpendingHistory />} />
      </Routes>
      <Footer />
    </Router>
  );
}
