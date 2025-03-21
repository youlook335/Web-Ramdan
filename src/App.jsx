import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sehri from "./pages/Sehri";
import Iftar from "./pages/Iftar";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Prayertime from "./pages/Prayertime";
import Zakat from "./pages/Zakat";
import Quran from "./pages/Quran";
import ParaPage from "./pages/ParaPage";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/About" element={<About />} />
        <Route path="/Sehri" element={<Sehri />} />
        <Route path="/Quran" element={<Quran />} />
        <Route path="/para/:paraNumber" element={<ParaPage />} />
        <Route path="/iftar" element={<Iftar />} />
        <Route path="/Prayertime" element={<Prayertime />} />
        <Route path="/Zakat" element={<Zakat />} />
      </Routes>
    </Router>
  );
};

export default App;
