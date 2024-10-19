import React from 'react'
import './Landing.css'
import UniMartLogo from '../../assets/UniMart Logo.svg'
import { useNavigate } from 'react-router'

function Landing() {
  const navigate = useNavigate();

  return (
    <div className='Container Landing'>

      <div className='left'>
        <img src={UniMartLogo} alt='UniMart Logo' />
        <div className='landingUniMartHeader'><span className='uni'>Uni</span>Mart</div>
      </div>

      <div className='right'>
        <div className='landingCard'>
          <h2>JOIN TODAY</h2>
          <button className='createAccount' onClick={() => { navigate("register") }}>Create an Account</button>

          <h4>ALREADY HAVE AN ACCOUNT?</h4>
          <button className='signIn' onClick={() => { navigate("login") }}>SIGN IN</button>

        </div>
      </div>
    </div>
  )
}

export default Landing;