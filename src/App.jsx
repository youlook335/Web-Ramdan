import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sehri from "./pages/Sehri";
import Iftar from "./pages/Iftar";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Prayertime from "./pages/Prayertime";
import Surath from "./pages/Surath";
import Quran from "./pages/Quran";
import ParaPage from "./pages/ParaPage";
import SurahDetail from "./pages/SurahDetail";

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
        <Route path="/Surath" element={<Surath />} />
        <Route path="/surah/:id" element={<SurahDetail/>} />
      </Routes>
    </Router>
  );
};

export default App;
