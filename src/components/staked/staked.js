import React, { useEffect, useState } from "react";
import "./staked.css";
import Web3 from "web3";
import { CopyToClipboard, onCopy } from "react-copy-to-clipboard";
import { AiOutlineCopy } from "react-icons/ai";
import { toast } from "react-toastify";
import { stakingAbi, stkaingAddress } from "../../utils/staking";
import { HashLink } from "react-router-hash-link";
const web3Supply = new Web3("https://data-seed-prebsc-1-s1.binance.org:8545/");
const Staked = ({ props }) => {
  const [copyTest, setcopyTest] = useState(false);
  const [referralAddress, setReferralAddress] = useState(
    `${window.location.href}`
  );
  const account = props.account;
  const handleRegisterReferral = (e) => {
    setReferralAddress(e.target.value);
  };
  const handleReferralAddress = async () => {
    try {
      const stakingContract = new web3Supply.eth.Contract(
        stakingAbi,
        stkaingAddress
      );
      const address = await stakingContract.methods.userInfo(account).call();
      if (address?.totalDeposit <= 0) {
        setReferralAddress(window.location.href);
      } else {
        setReferralAddress(
          `${window.location.origin}${window.location.pathname}?referrallink=${account}`
        );
      }
    } catch (e) {
      console.log("Error While Referral Fuction Call", e);
    }
  };
  const handleWithdrawDirects = async () => {
    try {
      if (account == "No Wallet") {
        console.log("Not Connected");
      } else if (account == "Wrong Network") {
        console.log("Wrong Network");
      } else if (account == "Connect") {
        console.log("Not Connected");
      } else {
        const web3 = window.web3;
        const stakingContract = new web3.eth.Contract(
          stakingAbi,
          stkaingAddress
        );
        let res = await stakingContract.methods
          .withdrawDirectsandROI()
          .send({ from: account });
        console.log("rse", res);

        await rewardInfo();
      }
    } catch (error) {
      toast.error("Transaction Failed");
      console.log("error", error);
    }
  };
  const rewardInfo = async () => {
    try {
      if (account == "No Wallet") {
        console.log("Not Connected");
      } else if (account == "Wrong Network") {
        console.log("Wrong Network");
      } else if (account == "Connect") {
        console.log("Not Connected");
      } else {
        const web3 = window.web3;
        const stakingContract = new web3.eth.Contract(
          stakingAbi,
          stkaingAddress
        );

        let res = await stakingContract.methods.rewardInfo(account).call();

        props?.setdirects(parseFloat(web3.utils.fromWei(res.directs)));
        let total = parseFloat(web3.utils.fromWei(res.total_Rewards));
        total = total.toFixed(2);
        props?.setTotalEarned(total);
        let affiliate = await stakingContract.methods.UpdateROI(account).call();
        props?.setRoireleased(parseFloat(web3.utils.fromWei(affiliate)));

        toast.success("Transaction successful");
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    copyTest ? toast.success("Copied") : <></>;
    setTimeout(() => {
      setcopyTest(false);
    }, 10);
  }, [copyTest]);
  useEffect(() => {
    handleReferralAddress();
  }, [account]);
  return (
    <div className="container-fluid bg-dark staked-container pt-5">
      <div className="row box mb-5">
        <div className="col-sm-12 col-lg-3 staked-column">
          <span className="d-flex text-captilize staked-heading ">
            Total Staked
          </span>
          <span className="d-flex  staked-subheading">
            {props?.totalStake} HPG
          </span>
        </div>
        <div className="col-sm-12 col-lg-3 staked-column">
          <span className="d-flex text-captilize staked-heading">Directs</span>
          <span className="d-flex  staked-subheading">{props?.directs}</span>
        </div>
        <div className="col-sm-12 col-lg-3 staked-column">
          <span className="d-flex text-captilize staked-heading">
            Affiliate Reward
          </span>
          <span className="d-flex  staked-subheading">
            {props?.roiReleased}
          </span>
        </div>

        <div className="col-sm-12 col-lg-3 staked-column ">
          <span className="d-flex text-captilize staked-heading">
            Total Earned
          </span>
          <span className="d-flex  staked-subheading">
            {props?.totalEarned} HPG
          </span>
        </div>
        <div className="col-12 d-flex justify-content-center align-items-end mt-5 ">
          <span className="text-captilize staked-heading">
            Withdraw Directs and Affiliate Reward
          </span>
        </div>
        <div className="row d-flex justify-content-center mt-1">
          <div className="col-12 d-flex justify-content-center align-items-center mt-2 ">
            <button
              className="btnDetails me-1 ms-1"
              onClick={() => handleWithdrawDirects()}
            >
              Withdraw
            </button>
            <HashLink className=" btnDetails me-1 ms-1" to="/level">
              Level Detail
            </HashLink>
            <HashLink className=" btnDetails  ms-1" to="/directs">
              Directs Detail
            </HashLink>
          </div>
        </div>
        <div className="col-sm-12 col-lg-12 mt-5">
          <div className="row d-flex justify-content-center">
            <div className="col-12 d-flex justify-content-center">
              <span className="value-staked text-captilized ">
                Referral link
              </span>
            </div>
          </div>
          <div className="row d-flex justify-content-center mt-4">
            <div className="col-12 d-flex justify-content-center align-items-center">
              <input
                type="text"
                className="input-field-3 me-5"
                value={referralAddress}
                onChange={(e) => {
                  handleRegisterReferral(e);
                }}
              ></input>
              <CopyToClipboard
                onCopy={() => setcopyTest(true)}
                text={
                  referralAddress ==
                  "0x0000000000000000000000000000000000000000"
                    ? `${window.location.href}`
                    : referralAddress
                }
              >
                <AiOutlineCopy className="text-white fs-4" />
              </CopyToClipboard>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Staked;
