import React, { useEffect, useState } from "react";
import "./staked.css";
import Web3 from "web3";
import { CopyToClipboard, onCopy } from "react-copy-to-clipboard";
import { AiOutlineCopy } from "react-icons/ai";
import { toast } from "react-toastify";
import { stakingAbi, stkaingAddress } from "../../utils/staking";
import { HashLink } from "react-router-hash-link";
// const web3Supply = new Web3("https://data-seed-prebsc-1-s1.binance.org:8545/");
const web3Supply = new Web3("https://bsc-dataseed1.binance.org");

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
        toast.info("Not Connected");
      } else if (account == "Wrong Network") {
        toast.info("Wrong Network");
      } else if (account == "Connect") {
        toast.info("Not Connected");
      } else {
        const web3 = window.web3;
        const stakingContract = new web3.eth.Contract(
          stakingAbi,
          stkaingAddress
        );
        let res = await stakingContract.methods
          .withdrawDirectsandROI1(account)
          .call();
        let remainingValue = parseFloat(web3.utils.fromWei(res[1]));
        remainingValue = remainingValue.toFixed(2);

        if (props?.withdrawCapValue >= remainingValue) {
          await stakingContract.methods
            .withdrawDirectsandROI()
            .send({ from: account });
          toast.success("Transaction successful");
          rewardInfo();
          withdrawCapsAndFlushValues();
        } else {
          toast.info("Your withdraw cap balance is low!");
        }
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
        let dirrrr = parseFloat(
          web3.utils.fromWei(res.claimedDirectsandAffiliate)
        ).toFixed(2);
        props?.setDirectAffiliate(dirrrr);
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  const withdrawCapsAndFlushValues = async () => {
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

        const multiply = await stakingContract.methods.multiplier().call();
        let userInfo = await stakingContract.methods.userInfo(account).call();
        userInfo = parseFloat(web3.utils.fromWei(userInfo.totalDepositAmount));
        props?.setWithdrawCapValue(userInfo * multiply);

        let res = await stakingContract.methods.getFlushAmount(account).call();
        let flush = parseFloat(web3.utils.fromWei(res));
        flush = flush.toFixed(2);
        props?.setFlushValue(flush);

        let res1 = await stakingContract.methods.rewardInfo(account).call();
        let total = parseFloat(
          web3.utils.fromWei(res1.claimedDirectsandAffiliate)
        );
        total = total.toFixed(2);
        let rem = userInfo * multiply - total;
        rem = rem.toFixed(2);
        props?.setReaminingCap(rem);

        let dirrrr = parseFloat(
          web3.utils.fromWei(res1.claimedDirectsandAffiliate)
        ).toFixed(2);
        props?.setDirectAffiliate(dirrrr);
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
    withdrawCapsAndFlushValues();
  }, [account]);
  return (
    <>
      <div className="bg-dark staked-container">
        <div className="container pt-4">
          <div className="row box d-flex justify-content-center ">
            <div className="col-md-12 ">
              <span className="d-flex  justify-content-center   text-captilize value-staked ">
                MAXIMUM CAPPING FOR ALL BONUS MARKETING
              </span>
              <span className="d-flex  justify-content-center text-captilize cappingPara mt-3">
                5x will need to renew their package same or bigger to enjoy more
                marketing profits.
              </span>
              <span className="d-flex  justify-content-center text-captilize cappingPara">
                Bonus will be count : Direct commissions & 10 level commissions
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-dark staked-container">
        <div className="container pt-4">
          <div className="row d-flex justify-content-center ">
            <div className="col-md-12 ">
              <div className="row  box mb-5 d-flex justify-content-center">
                <div className="col-sm-12 col-lg-3 staked-column">
                  <span className="d-flex text-captilize staked-heading ">
                    Total Staked
                  </span>
                  <span className="d-flex  staked-subheading">
                    {props?.totalStake} HPG
                  </span>
                </div>
                <div className="col-sm-12 col-lg-3 staked-column">
                  <span className="d-flex text-captilize staked-heading">
                    Your Directs Bonus
                  </span>
                  <span className="d-flex  staked-subheading">
                    {props?.directs}
                  </span>
                </div>
                <div className="col-sm-12 col-lg-3 staked-column">
                  <span className="d-flex text-captilize staked-heading">
                    Your Affiliate Reward
                  </span>
                  <span className="d-flex  staked-subheading">
                    {props?.roiReleased}
                  </span>
                </div>

                <div className="col-sm-12 col-lg-3 staked-column ">
                  <span className="d-flex text-captilize staked-heading">
                    Claimed staking reward
                  </span>
                  <span className="d-flex  staked-subheading">
                    {props?.totalEarned} HPG
                  </span>
                </div>
                <div className="col-sm-12 col-lg-3  staked-column">
                  <span className="d-flex text-captilize staked-heading ">
                    Withdraw Cap
                  </span>
                  <span className="d-flex  staked-subheading">
                    {props?.withdrawCapValue} HPG
                  </span>
                </div>
                <div className="col-sm-12 col-lg-3 staked-column">
                  <span className="d-flex text-captilize staked-heading ">
                    Remaining Cap
                  </span>
                  <span className="d-flex  staked-subheading">
                    {props?.reaminingCap} HPG
                  </span>
                </div>
                <div className="col-sm-12 col-lg-3 staked-column">
                  <span className="d-flex text-captilize staked-heading ">
                    Flush Amount
                  </span>
                  <span className="d-flex  staked-subheading">
                    {props?.flushValue} HPG
                  </span>
                </div>

                <div className="col-sm-12 col-lg-3 staked-column">
                  <span className="d-flex text-captilize staked-heading ">
                    Claimed Directs & Affiliate
                  </span>
                  <span className="d-flex  staked-subheading">
                    {props?.directAffiliate} HPG
                  </span>
                </div>

                <div className="col-12 d-flex justify-content-center align-items-end mt-5 ">
                  <span className="text-captilize staked-heading">
                    Withdraw Directs and Affiliate Reward
                  </span>
                </div>
                <div className="row d-flex justify-content-center mt-1">
                  <div className="col-md-12 d-flex justify-content-around align-items-center mt-2 ">
                    <div className="gap-2">
                      <button
                        className="btnDetails me-1 ms-1"
                        onClick={() => handleWithdrawDirects()}
                      >
                        Withdraw
                      </button>
                      <button className=" btnDetails me-1 ms-1">
                        <HashLink className="btnLInk" to="/level">
                          Level Detail
                        </HashLink>
                      </button>
                      <button className=" btnDetails me-1 ms-1">
                        <HashLink className="btnLInk" to="/directs">
                          Directs Detail
                        </HashLink>
                      </button>
                    </div>
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
          </div>
        </div>
      </div>
    </>
  );
};
export default Staked;
