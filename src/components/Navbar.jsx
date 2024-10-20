import { useNavigate } from 'react-router';
import TextLogo from './uniMartTextLogo';
import UniMartLogo from '../assets/UniMart Logo.svg';
import ProfileIcon from '../assets/Profile.svg';
import NotificationsIcon from '../assets/Notifications.svg';
import MessagesIcon from '../assets/Messages.svg';
import './css/Navbar.css';

function Navbar() {
  const navigate = useNavigate();

  const handleRedirect = (event) => {
    event.preventDefault();
    const element = event.currentTarget;
    if (element && element.dataset && element.dataset.redirect) {
      navigate(element.dataset.redirect);
    }
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
        <div
          className='icon-wrapper hover:scale-110 transition-transform duration-300'
          data-redirect="/notifications"
          onClick={handleRedirect}
        >
          <img src={NotificationsIcon} alt='Notifications Icon' />
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
