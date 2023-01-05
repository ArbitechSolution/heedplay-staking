import React from 'react'

function LevelPlace() {
  return (
    <div className='container-fluid staked-container pt-5 pb-5'>
     <div className="row  d-flex justify-content-between box mb-5">
        <div className="col-sm-12 col-lg-3 staked-column">
          <span className="d-flex text-captilize staked-heading">
            Total Used
          </span>
          {/* <span className="d-flex  staked-subheading">
            {props?.totalStake} HPG
          </span> */}
        </div>
        

        <div className="col-sm-12 col-lg-3 staked-column">
          <span className="d-flex text-captilize staked-heading">
            Total ROI
          </span>
          {/* <span className="d-flex  staked-subheading">
            {props?.totalEarned} HPG
          </span> */}
        </div>

      </div>

    </div>
  )
}

export default LevelPlace