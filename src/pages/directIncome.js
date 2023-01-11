import React, { useEffect, useState } from "react";
import Footer from "../components/footer/footer";
import { stakingAbi, stkaingAddress } from "../utils/staking";
import PaginatedItems from "../components/level-detail/levelCardDirects";
import "./pages.css";
import { HashLink } from "react-router-hash-link";
import { IoMdArrowBack } from "react-icons/io";

function DirectIncome(props) {
  const account = props?.account;
  const [userCount, setUserCount] = useState(0);
  const [levelDetail, setLevelDetail] = useState([]);
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
        if (countUser > 1) {
          for (let i = 1; i <= countUser; i++) {
            res = await stakingContract.methods.UserAdress(account, i).call();
            totalDepo = await stakingContract.methods.userInfo(res).call();
            totalDepo = web3.utils.fromWei(totalDepo.totalDepositAmount);
            newArray.push({
              address: res,
              totalDeposit: totalDepo,
            });
          }
        } else if (countUser == 1) {
          res = await stakingContract.methods.UserAdress(account, 1).call();
          totalDepo = await stakingContract.methods.userInfo(res).call();
          totalDepo = web3.utils.fromWei(totalDepo.totalDepositAmount);
          newArray.push({
            address: res,
            totalDeposit: totalDepo,
          });
        } else {
          newArray.push();
        }
        setLevelDetail([...newArray]);
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
                <div className="col-sm-12 col-lg-6 staked-column ">
                  <span className="d-flex text-captilize staked-heading sub">
                    Total User
                  </span>
                  {/* <span className="d-flex  staked-subheading">{userCount}</span> */}
                </div>
                <div className="col-sm-12 col-lg-6 staked-column">
                  <span className="d-flex directs-subheading">{userCount}</span>
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
                itemsPerPage={10}
                levelDetail={levelDetail}
                title={"Directs Detail"}
              />
            </div>
            <div className="col-12 col-lg-12 col-sm-12 d-none d-xl-none d-lg-block">
              <PaginatedItems
                itemsPerPage={10}
                levelDetail={levelDetail}
                title={"Directs Detail"}
              />
            </div>
            <div className="col-12 col-lg-12 col-sm-12 d-block d-lg-none d-xl-none">
              <PaginatedItems
                itemsPerPage={5}
                levelDetail={levelDetail}
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
