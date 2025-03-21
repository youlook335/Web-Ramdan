import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Home from "./pages/Home";
import Sehri from "./pages/Sehri";
import Iftar from "./pages/Iftar";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/sehri" element={<Sehri />} />
        <Route path="/iftar" element={<Iftar />} />
      </Routes>
    </Router>
  );
};

export default App;
