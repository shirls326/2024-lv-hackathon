import React from 'react'
import './Landing.css'
import UniMartLogo from '../../assets/UniMart Logo.svg'

function Landing() {
  return (
    <div className='Container Landing'>

      <div className='left'>
        <img src={UniMartLogo} alt='UniMart Logo' />

        <div className='landingUniMartHeader'><span className='uni'>Uni</span>Mart</div>

      </div>

      <div className='right'>
        <div className='landingCard'>
          <h2>JOIN TODAY</h2>
          <button className='createAccount'>Create an Account</button>

          <h4>ALREADY HAVE AN ACCOUNT?</h4>
          <button className='signIn'>SIGN IN</button>





        </div>
        

      </div>

      

    </div>
  )
}

export default Landing;