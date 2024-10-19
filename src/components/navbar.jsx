import React from 'react'
import TextLogo from './uniMartTextLogo.jsx'
import UniMartLogo from '../assets/UniMart Logo.svg'
import './css/navbar.css'



function navbar() {
  return (
    <div className='navBar'>
        <div className='left'>
            <TextLogo />
            <img src={UniMartLogo} alt='UniMart Logo' />
        </div>
        <p>test</p>
        <p>Home</p>
        <p>settings</p>
        <p>logout</p>

    </div>
  )
}

export default navbar