import React, { useEffect, useState } from "react";
import "./staked.css";
import Web3 from "web3";
import { CopyToClipboard, onCopy } from "react-copy-to-clipboard";
import { AiOutlineCopy } from "react-icons/ai";
import { toast } from "react-toastify";
import { stakingAbi, stkaingAddress } from "../../utils/staking";
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
      console.log(address);
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
  useEffect(() => {
    copyTest ? toast.success("Copied") : <></>;
    setTimeout(() => {
      setcopyTest(false);
    }, 10);
  }, [copyTest]);
  useEffect(() => {
    handleReferralAddress();
  }, [account]);
  console.log("referal", referralAddress);
  return (
    <div className="container-fluid bg-dark staked-container pt-5 pb-5">
      <div className="row box mb-5">
        <div className="col-sm-12 col-lg-3 staked-column">
          <span className="d-flex text-captilize staked-heading">
            Total Staked
          </span>
          <span className="d-flex  staked-subheading">
            $ {props?.totalStake}
          </span>
        </div>
        <div className="col-sm-12 col-lg-3 staked-column">
          <span className="d-flex text-captilize staked-heading">Directs</span>
          <span className="d-flex  staked-subheading">{props?.directs}</span>
        </div>
        <div className="col-sm-12 col-lg-3 staked-column">
          <span className="d-flex text-captilize staked-heading">
            ROIReleased
          </span>
          <span className="d-flex  staked-subheading">
            {props?.roiReleased}
          </span>
        </div>

        <div className="col-sm-12 col-lg-3 staked-column">
          <span className="d-flex text-captilize staked-heading">
            You Earned
          </span>
          <span className="d-flex  staked-subheading">
            $ {props?.totalEarned}
          </span>
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
