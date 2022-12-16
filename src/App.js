import { useState } from "react";
import "./App.css";
import CustomNavbar from "./components/navbar/navbar";
import Staking from "./pages/staking";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  const [account, setAccount] = useState("Connect");

  return (
    <div className="App">
      <ToastContainer />
      <CustomNavbar setAccount={setAccount} account={account} />
      <Routes>
        <Route
          path="/staking"
          element={<Staking account={account} setAccount={setAccount} />}
        />
        <Route
          path="/"
          element={<Staking account={account} setAccount={setAccount} />}
        />
      </Routes>
    </div>
  );
}

export default App;
