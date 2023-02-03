import React, { useEffect, useState } from "react";
import { HashLink } from "react-router-hash-link";
import { IoMdArrowBack } from "react-icons/io";
import { toast } from "react-toastify";
import {
  diamondAbi,
  diamondAddress,
  diamondTokenAbi,
  diamondTokenAddress,
} from "../../utils/diamond";
import Countdown from "react-countdown";
import "./diamond.css";

const Diamonduser = ({ props: props }) => {
  const account = props?.account;
  const [staked, setStaked] = useState("0.00");
  const [time, setTime] = useState(Date.now());
  const [newTime, setNewTime] = useState(false);
  const [dailyReward, setDailyreward] = useState("0.00");
  const [totalWithdrawReward, setTotalWithdrawreward] = useState("0.00");
  const [lockedAmount, setLockedAmount] = useState("0.00");
  const [blackList, setBlackList] = useState(false)
  const getTime = async () => {
    try {
      if (account == "No Wallet") {
        console.log("Not Connected");
      } else if (account == "Wrong Network") {
        console.log("Wrong Network");
      } else if (account == "Connect") {
        // console.log("Not Connected");
      } else {
        const web3 = window.web3;
        const contractOfStaking = new web3.eth.Contract(
          diamondAbi,
          diamondAddress
        );

        let userInfo = await contractOfStaking.methods.userInfo(account).call();
        let endTime = userInfo?.userlockTime;
        if (((parseInt(endTime) > Math.floor(new Date().getTime() / 1000.0)) * 1000)>0){
          setTime(
            (parseInt(endTime) - Math.floor(new Date().getTime() / 1000.0)) * 1000
          );
        }
      else{
         endTime = userInfo?.unstakeTime
        setTime(
          (parseInt(endTime) - Math.floor(new Date().getTime() / 1000.0)) * 1000
        );
      }
        setNewTime(true);
      }
    } catch (error) {
      console.error("error while get time", error);
    }
  };
  const Completionist = () => {
    return (
      <div className="countdown d-flex justify-content-center align-items-center">
        <div>
          <span className="text-white number days btn-inner-countdown ms-1 me-1">
            0
          </span>
          <span className="box_text text-light ms-1 me-1">Days</span>
        </div>
        <div>
          <span className="text-white number hours btn-inner-countdown ms-1 me-1">
            0
          </span>
          <span className="box_text text-light ms-1 me-1">Hours</span>
        </div>
        <div>
          <span className="text-white number minutes btn-inner-countdown ms-1 me-1">
            0
          </span>
          <span className="box_text text-light ms-1 me-1">Minutes</span>
        </div>
        <div>
          <span className="text-white number seconds btn-inner-countdown ms-1 me-1">
            0
          </span>
          <span className="box_text text-light ms-1 me-1">Seconds</span>
        </div>
      </div>
    );
  };

  // Renderer callback with condition
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (newTime == false || completed) {
      // Render a completed state
      return <Completionist />;
    } else {
      return (
        <div className="countdown d-flex justify-content-center align-items-center">
          <div>
            <span className="text-white number days btn-inner-countdown ms-1 me-1">
              {days}
            </span>
            <span className="box_text text-light ms-1 me-1">Days</span>
          </div>
          <div>
            <span className="text-white number hours btn-inner-countdown ms-1 me-1">
              {hours}
            </span>
            <span className="box_text text-light ms-1 me-1">Hours</span>
          </div>
          <div>
            <span className="text-white number minutes btn-inner-countdown ms-1 me-1">
              {minutes}
            </span>
            <span className="box_text text-light ms-1 me-1">Minutes</span>
          </div>
          <div>
            <span className="text-white number seconds btn-inner-countdown ms-1 me-1">
              {seconds}
            </span>
            <span className="box_text text-light ms-1 me-1">Seconds</span>
          </div>
        </div>
      );
    }
  };
  const handleGetValues = async () => {
    try {
      if (account == "No Wallet") {
        console.log("Not Connected");
      } else if (account == "Wrong Network") {
        console.log("Wrong Network");
      } else if (account == "Connect") {
        // console.log("Not Connected");
      } else {

        const web3 = window.web3;
        const diamondContract = new web3.eth.Contract(
          diamondAbi,
          diamondAddress
        );
        const checkBlackList = await diamondContract.methods.blacklist(account).call()
        setBlackList(checkBlackList)
        if (!checkBlackList) {
          const stakedAmount = await diamondContract.methods
            .userInfo(account)
            .call();
          let total = web3.utils.fromWei(stakedAmount?.claimedReward);
          total = parseFloat(total).toFixed(2);
          setTotalWithdrawreward(total)
          let claimAmount = await diamondContract.methods
            .calculateReward(account)
            .call();

          let lockedAmount = web3.utils.fromWei(claimAmount?.lockedAmount);
          lockedAmount = parseFloat(lockedAmount).toFixed(2);
          setLockedAmount(lockedAmount);

          let staked = web3.utils.fromWei(claimAmount?.stakedAmounts);
          staked = parseFloat(staked).toFixed(2);
          setStaked(staked);

          let Daily = web3.utils.fromWei(claimAmount?.rewards);
          staked = parseFloat(Daily).toFixed(2);
          setDailyreward(Daily);
        } else {
          setTotalWithdrawreward(0)
          setLockedAmount(0)
          setStaked(0)
          setDailyreward(0)
        }

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
        const diamondContract = new web3.eth.Contract(
          diamondAbi,
          diamondAddress
        );

        let claimAmount = await diamondContract.methods
          .calculateReward(account)
          .call();
        claimAmount = web3.utils.fromWei(claimAmount?.rewards);
        if (parseFloat(claimAmount) >= 300) {
          await diamondContract.methods.claimReward(account).send({
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
          diamondAbi,
          diamondAddress
        );
        if (newTime) {
          toast.info("Unstake time not reached");
        } else {
          if (staked > 0) {
            await airDropContract.methods.unstake().send({ from: account });
            toast.success("Transaction Successful");
            handleGetValues();
          } else {
            toast.info("You dont have any staked amount");
          }
        }
      }
    } catch (err) {
      console.log("error while claiming Reward");
    }
  };

  useEffect(() => {
    setInterval(() => {
      handleGetValues();
      getTime();
    }, 30000);
    getTime();
    handleGetValues();

  }, [account]);

  return (
    <div className="container-fluid bg-dark airDrop-contianer d-flex justify-content-center align-items-center flex-column">
      <div className="row">
        <div className="col-12">
          <h1 className="text-light">Diamond User</h1>
        </div>
      </div>
      <div className="row d-flex flex-column  g-0">
        <div className="col mt-2 g-0">
          <span className="text-staked text-white">
            Diamond User for 365 Days Staking Reward is 0.25 % per day
          </span>
        </div>
      </div>
      <div className="col-md-10">
        <div className="button-left">
          <HashLink className="arrow-color btn-arrow p-2" to="/">
            <IoMdArrowBack />
          </HashLink>
        </div>
      </div>
      <Countdown date={Date.now() + time} renderer={renderer} />
      <div className="row boxStakedDetail2 d-flex justify-content-center my-5">

        <div className="col-12 align-items-center mt-5">
          <div className="row d-flex justify-content-around ">
            <div className="col-sm-12 col-md-3 d-flex flex-column">
              <span className="text-pool">
                <b>Lock Amount</b>
              </span>
              <span className="text-pool text-white">{lockedAmount}</span>
            </div>

            <div className="col-sm-12 col-md-3 d-flex flex-column">
              <span className="text-pool">
                <b> Total Staked </b>
              </span>
              <span className="text-pool text-white">{staked}</span>
            </div>
            <div className="col-sm-12 col-md-3 d-flex flex-column">
              <span className="text-pool">
                <b>Daily Reward</b>
              </span>
              <span className="text-pool text-white">{dailyReward}</span>
            </div>
            <div className="col-sm-12 col-md-3 d-flex flex-column">
              <span className="text-pool">
                <b> Total Staking WithDraw</b>
              </span>
              <span className="text-pool text-white">
                {totalWithdrawReward}
              </span>
            </div>
          </div>
        </div>
        <div className="col-12 align-items-center mt-5">
          <div className="row d-flex justify-content-center mt-5">
            <div className=" col-4 ">
              <button
                className=" btn-inner-air1"
                onClick={() => {
                  handleWithdrawReward();
                }}
              >
                Withdraw
                {blackList && <b>!</b>}
              </button>
            </div>
            {/* <div className=" col-4 ">
              <button
                className=" btn-inner-air1"
                onClick={() => {
                  handleUnstake();
                }}
              >
                Unstake
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Diamonduser;
