import { useState } from 'react';
import { useNavigate } from 'react-router';
import TextLogo from './uniMartTextLogo';
import UniMartLogo from '../assets/UniMart Logo.svg';
import ProfileIcon from '../assets/Profile.svg';
import NotificationsIcon from '../assets/Notifications.svg';
import MessagesIcon from '../assets/Messages.svg';
import './css/Navbar.css';

function Navbar() {
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();

  const handleRedirect = (event) => {
    event.preventDefault();
    const element = event.currentTarget;
    if (element && element.dataset && element.dataset.redirect) {
      navigate(element.dataset.redirect);
    }
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <div className='navBar'>
      <div className='left'>
        <div
          className='logo-wrapper breathing-animation'
          data-redirect="/products"
          onClick={handleRedirect}
        >
          <TextLogo />
          <img src={UniMartLogo} alt='UniMart Logo' className="uniMart-logo" />
        </div>
      </div>
      <div className='right'>
        <div className='relative'>
          <div
            className='icon-wrapper hover:scale-110 transition-transform duration-300'
            onClick={toggleNotifications}
          >
            <img src={NotificationsIcon} alt='Notifications Icon' />
          </div>

          {/* Dropdown for notifications */}
          {showNotifications && (
            <div className='absolute right-0 mt-2 w-80 bg-white shadow-lg rounded-lg p-4 z-50'>
              <h3 className='text-lg font-bold mb-2'>Notifications</h3>
              <div className='flex flex-col space-y-2'>
                <div className='notification-item'>
                  <p className='text-sm font-semibold'>New message from Alice</p>
                  <p className='text-xs text-gray-500'>5 mins ago</p>
                </div>
                <div className='notification-item'>
                  <p className='text-sm font-semibold'>Your listing was viewed 10 times</p>
                  <p className='text-xs text-gray-500'>30 mins ago</p>
                </div>
                <div className='notification-item'>
                  <p className='text-sm font-semibold'>Update: New features added!</p>
                  <p className='text-xs text-gray-500'>1 hour ago</p>
                </div>
                <div className='notification-item'>
                  <p className='text-sm font-semibold'>Reminder: Verify your account</p>
                  <p className='text-xs text-gray-500'>2 hours ago</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div
          className='icon-wrapper hover:scale-110 transition-transform duration-300'
          data-redirect="/messages"
          onClick={handleRedirect}
        >
          <img src={MessagesIcon} alt='Messages Icon' />
        </div>

        <div
          className='icon-wrapper hover:scale-110 transition-transform duration-300'
          data-redirect="/profile"
          onClick={handleRedirect}
        >
          <img src={ProfileIcon} alt='Profile Icon' />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
