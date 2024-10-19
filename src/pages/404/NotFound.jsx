import React from 'react'
import bg from '../../assets/Landing Background.svg'

function NotFound() {
  return (
    <>
      <div style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        height: '100vh',
      }}>
        <h1 style={{
          color: 'var(--dark)',
        }}>Error 404: Page Not Found</h1>

      </div>
    </>
  )
}

export default NotFound;