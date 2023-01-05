import React from 'react'
import { FiArrowRight } from "react-icons/fi";

import { FiArrowLeft } from "react-icons/fi";


function level() {
  return (
    <div className='container-fluid'>
        <div className='row'>
        <div className='col-md-12 mt-5'>
        <div className='row d-flex justify-content-center'>
        <div className='col-md-6  mb-5'>
        <h3 className='text-level'>level</h3>
        <div className='d-flex justify-content-center gap-2'>
        
<button className='btn-arrow'>
<FiArrowLeft/>
</button>
<input className='level-input' >

</input>
<button className='btn-arrow'>
<FiArrowRight/>
    </button>
        </div>
        </div>
        </div>

        </div>
            
        </div>
    </div>
  )
}

export default level