import React, { useEffect, useState } from "react";
import "./airDrop.css";
// import { accounts } from "../../utils/airDrop";
import { toast } from "react-toastify";
import {
  airDropAddress,
  airDropAbi,
  airDropTokenAbi,
  airDropTokenAddress,
} from "../../utils/airDropContract";
const AirDrop = ({ props: props }) => {
  const account = props?.account;
  const [staked, setStaked] = useState("0.00");
  const [claimed, setClaimed] = useState("0.00");
  const [withdrawl, setWithdrawl] = useState("0.00");
  const [owner, setOwner] = useState(false);

  const handleGetValues = async () => {
    try {
      if (account == "No Wallet") {
        console.log("Not Connected");
      } else if (account == "Wrong Network") {
        console.log("Wrong Network");
      } else if (account == "Connect") {
        console.log("Not Connected");
      } else {
        const web3 = window.web3;
        const airDropContract = new web3.eth.Contract(
          airDropAbi,
          airDropAddress
        );
        const stakedAmount = await airDropContract.methods
          .userInfo(account)
          .call();
        let res = web3.utils.fromWei(stakedAmount?.claimedReward);
        res = parseFloat(res).toFixed(5);
        setClaimed(res);

        res = web3.utils.fromWei(stakedAmount?.stakedAmount);
        res = parseFloat(res).toFixed(2);
        setStaked(res);

        res = web3.utils.fromWei(stakedAmount?.withdrawlAmount);
        res = parseFloat(res).toFixed(2);
        setWithdrawl(res);
      }
    } catch (err) {
      console.log("error while getting values");
    }
  };
  const handleWithdrawReward = async () => {
    try {
      if (account == "No Wallet") {
        toast.info("Not Connected");
      } else if (account == "Wrong Network") {
        toast.info("Wrong Network");
      } else if (account == "Connect") {
        toast.info("Not Connected");
      } else {
        const web3 = window.web3;
        const airDropContract = new web3.eth.Contract(
          airDropAbi,
          airDropAddress
        );
        const claimAmount = await airDropContract.methods
          .calculateReward(account)
          .call();
        if (claimAmount > 0) {
          await airDropContract.methods.claimReward(account).send({
            from: account,
          });
          toast.success("Transaction Successful");
          handleGetValues();
        } else {
          toast.info("You don't have any Reward yet!");
        }
      }
    } catch (err) {
      console.log("error while claiming Reward");
    }
  };
  const handleUnstake = async () => {
    try {
      if (account == "No Wallet") {
        toast.info("Not Connected");
      } else if (account == "Wrong Network") {
        toast.info("Wrong Network");
      } else if (account == "Connect") {
        toast.info("Not Connected");
      } else {
        const web3 = window.web3;
        const airDropContract = new web3.eth.Contract(
          airDropAbi,
          airDropAddress
        );
        if (staked > 0) {
          await airDropContract.methods.unstake().send({ from: account });
          toast.success("Transaction Successful");
          handleGetValues();
        } else {
          toast.info("You dont have any staked amount");
        }
      }
    } catch (err) {
      console.log("error while claiming Reward");
    }
  };
  const getOwner = async () => {
    try {
      if (account == "No Wallet") {
        console.log("Not Connected");
      } else if (account == "Wrong Network") {
        console.log("Wrong Network");
      } else if (account == "Connect") {
        console.log("Not Connected");
      } else {
        const web3 = window.web3;
        const airDropContract = new web3.eth.Contract(
          airDropAbi,
          airDropAddress
        );
        let ownerAcc = await airDropContract.methods.owner().call();
        if (ownerAcc == account) {
          setOwner(true);
        } else {
          setOwner(false);
        }
      }
    } catch (err) {
      console.log("error while getting Owner");
    }
  };
  useEffect(() => {
    handleGetValues();
    getOwner();
  }, [account]);
  return (
    <div className="container-fluid bg-dark airDrop-contianer d-flex justify-content-center align-items-center flex-column">
      <div className="row">
        <div className="col-12">
          <h1 className="text-light">Air Drop Staking</h1>
        </div>
      </div>

      <div className="row boxStakedDetail1 d-flex justify-content-center my-5">
        <div className="col-12 align-items-center mt-5">
          <div className="row d-flex justify-content-around ">
            <div className="col-sm-12 col-md-4  d-flex flex-column">
              <span className="text-pool">
                <b>Total Staked</b>
              </span>
              <span className="text-pool">{staked}</span>
            </div>
            <div className="col-sm-12 col-md-4 d-flex flex-column">
              <span className="text-pool">
                <b>Total Claimed</b>
              </span>
              <span className="text-pool">{claimed}</span>
            </div>
            <div className="col-sm-12 col-md-4 d-flex flex-column">
              <span className="text-pool">
                <b>Total Withdrawl</b>
              </span>
              <span className="text-pool">{withdrawl}</span>
            </div>
          </div>
        </div>
        <div className="col-12 align-items-center mt-5">
          {/* {owner && (
            <div className="row d-flex justify-content-around ">
              <div className=" col-4 ">
                <input type="text" className="input-field-2"></input>
              </div>
              <div className=" col-4 ">
                <button
                  className="btn-inner-air1"
                  onClick={() => {
                    handleAirDrop();
                  }}
                >
                  AirDrop
                </button>
              </div>
            </div>
          )} */}

          <div className="row d-flex justify-content-around mt-5">
            <div className=" col-4 ">
              <button
                className=" btn-inner-air1"
                onClick={() => {
                  handleWithdrawReward();
                }}
              >
                Withdraw
              </button>
            </div>
            <div className=" col-4 ">
              <button
                className=" btn-inner-air1"
                onClick={() => {
                  handleUnstake();
                }}
              >
                Unstake
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AirDrop;