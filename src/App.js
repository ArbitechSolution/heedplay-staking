import { useState } from "react";
import "./App.css";
import CustomNavbar from "./components/navbar/navbar";
import Staking from "./pages/staking";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  const [account, setAccount] = useState("Connect");
  const [totalStake, setTotalStaked] = useState("0.00");
  const [totalEarned, setTotalEarned] = useState("0.00");
  const [roiReleased, setRoireleased] = useState("0.00");
  const [directs, setdirects] = useState("0.00");
  return (
    <div className="App">
      <ToastContainer />
      <CustomNavbar setAccount={setAccount} account={account} />
      <Routes>
        <Route
          path="/staking"
          element={
            <Staking
              directs={directs}
              account={account}
              totalStake={totalStake}
              totalEarned={totalEarned}
              roiReleased={roiReleased}
              setAccount={setAccount}
              setdirects={setdirects}
              setTotalEarned={setTotalEarned}
              setTotalStaked={setTotalStaked}
              setRoireleased={setRoireleased}
            />
          }
        />
        <Route
          path="/"
          element={
            <Staking
              directs={directs}
              account={account}
              totalStake={totalStake}
              totalEarned={totalEarned}
              roiReleased={roiReleased}
              setAccount={setAccount}
              setdirects={setdirects}
              setTotalEarned={setTotalEarned}
              setTotalStaked={setTotalStaked}
              setRoireleased={setRoireleased}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
