import "./App.css";
import CustomNavbar from "./components/navbar/navbar";
import Staking from "./pages/staking";
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <CustomNavbar />
      <Routes>
        <Route path="/staking" element={<Staking />} />
        <Route path="/" element={<Staking />} />
      </Routes>
    </div>
  );
}

export default App;
