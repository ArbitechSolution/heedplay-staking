import React, { useEffect, useState } from "react";
import { stakingAbi, stkaingAddress } from "../utils/staking";
import { HashLink } from "react-router-hash-link";
import { IoMdArrowBack } from "react-icons/io";
import Footer from "../components/footer/footer";
import PaginatedItems from "../components/level-detail/levelCardDirects";
import "./pages.css";

function DirectIncome(props) {
  const account = props?.account;
  const [userCount, setUserCount] = useState(0);
  const [totalDirects, setTotalDirects] = useState(0);
  const [totaDeposit, setTotalDeposit] = useState(0);
  const [directsDetail, setDirectsDetail] = useState([]);
  const handleDetails = async () => {
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
        let countUser = await stakingContract.methods
          .countUser1(account)
          .call();
        setUserCount(countUser);
        let newArray = [];
        let res;
        let totalDepo;
        let totalDirectAmount;
        let directs = 0;
        let userTotalDeposit = 0;
        if (countUser > 1) {
          for (let i = 1; i <= countUser; i++) {
            res = await stakingContract.methods.UserAdress(account, i).call();
            totalDepo = await stakingContract.methods.userInfo(res).call();
            totalDepo = web3.utils.fromWei(totalDepo.totalDepositAmount);
            userTotalDeposit =
              parseFloat(totalDepo) + parseFloat(userTotalDeposit);
            setTotalDeposit(userTotalDeposit);
            // totalDirectAmount = await stakingContract.methods
            //   .getDirectsamount(res)
            //   .call();
            totalDirectAmount = 0;
            // totalDirectAmount = web3.utils.fromWei(totalDirectAmount);
            // totalDirectAmount = parseFloat(totalDirectAmount).toFixed(2);
            directs = parseFloat(totalDirectAmount) + parseFloat(directs);
            setTotalDirects(directs);
            newArray.push({
              index: i,
              address: res,
              totalDeposit: totalDepo,
              totalDirectAmount: totalDirectAmount,
            });
          }
        } else if (countUser == 1) {
          res = await stakingContract.methods.UserAdress(account, 1).call();
          totalDepo = await stakingContract.methods.userInfo(res).call();
          totalDepo = web3.utils.fromWei(totalDepo.totalDepositAmount);
          userTotalDeposit =
            parseFloat(totalDepo) + parseFloat(userTotalDeposit);
          setTotalDeposit(userTotalDeposit);
          totalDirectAmount = await stakingContract.methods
            .getDirectsamount(res)
            .call();
          totalDirectAmount = web3.utils.fromWei(totalDirectAmount);
          totalDirectAmount = parseFloat(totalDirectAmount).toFixed(2);
          directs = parseFloat(totalDirectAmount) + parseFloat(directs);
          setTotalDirects(directs);
          newArray.push({
            index: 1,
            address: res,
            totalDeposit: totalDepo,
            totalDirectAmount: totalDirectAmount,
          });
        } else {
          newArray.push();
        }
        setDirectsDetail([...newArray]);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    handleDetails();
  }, [account]);
  return (
    <div style={{ background: "linear-gradient(311deg, #121212, #0c0c0c)" }}>
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-md-12 mt-5 mb-5">
            <div className="row d-flex justify-content-center">
              <div className="row  d-flex justify-content-between boxDirects">
                <div className="col-sm-12 col-lg-4 staked-column ">
                  <span className="d-flex text-captilize staked-heading sub">
                    Total User
                  </span>
                  <span className="d-flex directs-subheading mt-2">
                    {userCount}
                  </span>
                </div>
                <div className="col-sm-12 col-lg-4 staked-column">
                  <span className="d-flex text-captilize staked-heading sub">
                    Total Directs
                  </span>
                  <span className="d-flex directs-subheading mt-2">
                    {totalDirects}
                  </span>
                </div>
                <div className="col-sm-12 col-lg-4 staked-column">
                  <span className="d-flex text-captilize staked-heading sub">
                    Total Deposit
                  </span>
                  <span className="d-flex directs-subheading mt-2">
                    {totaDeposit}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-9">
            <div className="button-left">
              <HashLink className="arrow-color btn-arrow p-2" to="/">
                <IoMdArrowBack />
              </HashLink>
            </div>
          </div>

          <div className="row  mb-5">
            <div className="col-12 col-lg-12 col-sm-12 d-none d-xl-block">
              <PaginatedItems
                itemsPerPage={2}
                directsDetail={directsDetail}
                title={"Directs Detail"}
              />
            </div>
            <div className="col-12 col-lg-12 col-sm-12 d-none d-xl-none d-lg-block">
              <PaginatedItems
                itemsPerPage={10}
                directsDetail={directsDetail}
                title={"Directs Detail"}
              />
            </div>
            <div className="col-12 col-lg-12 col-sm-12 d-block d-lg-none d-xl-none">
              <PaginatedItems
                itemsPerPage={5}
                directsDetail={directsDetail}
                title={"Directs Detail"}
              />
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default DirectIncome;
