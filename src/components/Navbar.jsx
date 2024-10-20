import { useNavigate } from 'react-router'
import TextLogo from './uniMartTextLogo'
import UniMartLogo from '../assets/UniMart Logo.svg'
import ProfileIcon from '../assets/Profile.svg'
import NotificationsIcon from '../assets/Notifications.svg'
import MessagesIcon from '../assets/Messages.svg'
import './css/Navbar.css';



function Navbar() {
  const navigate = useNavigate();
  const handleRedirect = (event) => {
    event.preventDefault();
    const element = event.currentTarget;
    if (element && element.dataset && element.dataset.redirect) {
      navigate(element.dataset.redirect);
    }
  }
  return (
    <div className='navBar'>
      <div className='left'>
        <div className='logo-wrapper' data-redirect="/products" onClick={handleRedirect}>
          <TextLogo />
          <img src={UniMartLogo} alt='UniMart Logo' />
        </div>
      </div>
      <div className='right'>
        <a href='/notifications'>
          <img src={NotificationsIcon} alt='Notifications Icon' />
        </a>
        
        <a href='/messages'>
          <img src={MessagesIcon} alt='Messages Icon' />
        </a>

        <a href='/profile'>
          <img src={ProfileIcon} alt='Profile Icon' />
        </a>
      </div>
    </div>
  );
}

export default Navbar;