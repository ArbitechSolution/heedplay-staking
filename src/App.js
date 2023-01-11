import { useState } from "react";
import "./App.css";
import CustomNavbar from "./components/navbar/navbar";
import Staking from "./pages/staking";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CommingPage from "./pages/comming-soon";
import AirDrop from "./pages/AirDrop";
import Level from "./pages/level";
import DirectIncome from "./pages/directIncome";
function App() {
  const [account, setAccount] = useState("Connect");
  const [totalStake, setTotalStaked] = useState("0.00");
  const [totalEarned, setTotalEarned] = useState("0.00");
  const [roiReleased, setRoireleased] = useState("0.00");
  const [directs, setdirects] = useState("0.00");
  const [balance, setBalance] = useState("0.00");
  const [contractBalance, setContractBalance] = useState("0.00");

  return (
    <div className="App">
      <ToastContainer />
      <CustomNavbar setAccount={setAccount} account={account} />
      <Routes>
        <Route path="/bond" element={<CommingPage />} />
        <Route path="/nft" element={<CommingPage />} />
        <Route path="/market" element={<CommingPage />} />
        <Route path="/game" element={<CommingPage />} />
        <Route path="/level" element={<Level account={account} />} />
        <Route
          path="/airdrop"
          element={<AirDrop account={account} balance={balance} />}
        />
        <Route path="/directs" element={<DirectIncome account={account} />} />
        {/* <Route
          path="/staking"
          element={
            <Staking
              directs={directs}
              account={account}
              balance={balance}
              totalStake={totalStake}
              totalEarned={totalEarned}
              roiReleased={roiReleased}
              contractBalance={contractBalance}
              setAccount={setAccount}
              setBalance={setBalance}
              setdirects={setdirects}
              setTotalEarned={setTotalEarned}
              setTotalStaked={setTotalStaked}
              setRoireleased={setRoireleased}
              setContractBalance={setContractBalance}
            />
          }
        /> */}
        <Route path="/staking" element={<CommingPage />} />
        <Route path="/" element={<CommingPage />} />

        {/* <Route
          path="/"
          element={
            <Staking
              directs={directs}
              account={account}
              balance={balance}
              totalStake={totalStake}
              totalEarned={totalEarned}
              roiReleased={roiReleased}
              contractBalance={contractBalance}
              setAccount={setAccount}
              setBalance={setBalance}
              setdirects={setdirects}
              setTotalEarned={setTotalEarned}
              setTotalStaked={setTotalStaked}
              setRoireleased={setRoireleased}
              setContractBalance={setContractBalance}
            />
          }
        /> */}
      </Routes>
    </div>
  );
}

export default App;
