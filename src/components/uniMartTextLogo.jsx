import React from 'react'
import './css/uniMartTextLogo.css'

function uniMartTextLogo(props) {
  return (
    <div className={props.className ? props.className + ' uniMartTextLogo' : 'uniMartTextLogo'}><span className='uni'>Uni</span>Mart</div>
  )
}

export default uniMartTextLogo