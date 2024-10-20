import { useState } from 'react';
import GradientSVG from '/login_gradient.svg?url';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate, useLocation } from 'react-router';
import { auth, db } from '../../firebase/config';
import { get, ref } from 'firebase/database';

// eslint-disable-next-line react/prop-types
const InputTitle = ({ children }) => {
  return <h2 className='mb-[0.2rem] mt-[1rem] font-thin'>{children}</h2>
}

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [theme, setTheme] = useState('light');
  const navigate = useNavigate();
  const location = useLocation();

  // Get the 'from' location from the state or default to '/'
  const from = location.state?.from?.pathname || '/';

  const handleEmailChange = (event) => {
    event.preventDefault();
    const val = event.target.value;
    if (val) {
      setEmail(val);
    }
  }

  const handlePasswordChange = (event) => {
    event.preventDefault();
    const val = event.target.value;
    if (val) {
      setPassword(val);
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);

      // Fetch user data
      const userRef = ref(db, `users/${auth.currentUser.uid}`);
      const snapshot = await get(userRef);
      const data = snapshot.val();
      console.log(data);

      // Check if there is a 'from' path and navigate to it
      if (from && from !== '/') {
        navigate(from, { replace: true });
      } else {
        // Check if user is verified
        if (data.verified) { 
          navigate('/products');
        } else {
          navigate('/qr');
        }
      }

    } catch (error) {
      setError('');
      console.error(error);
      switch (error.code) {
        case 'auth/user-not-found':
          setError('Account not found. Please check your email address.');
          break;
        case 'auth/wrong-password':
          setError('Incorrect password. Please try again.');
          break;
        default:
          setError('Failed to log in. Please try again later.');
          break;
      }
    }
  };

  return (
    <div data-theme={theme} className='flex flex-col lg:flex-row justify-center lg:justify-between items-center max-h-screen w-screen bg-white'>
      <div className='relative hidden lg:flex h-screen w-auto lg:w-3/5'>
        <img alt="bruh" src={GradientSVG} className='h-full w-full object-cover'></img>
        <img alt="corpo" src="/src/assets/corpo.png" className='absolute top-0 left-0 h-full w-full object-contain p-8' />
      </div>
      <div className='flex flex-col justify-center items-center w-full lg:w-2/5 h-screen lg:mx-[7rem] gap-4 p-6'>
        <h1 className='text-3xl font-thin mb-4'>Login</h1>
        <div className='w-full max-w-xs'>
          <InputTitle>Email</InputTitle>
          <label className="input input-bordered w-full flex items-center gap-2 border-2 border-[#717171] bg-[#f8f8f8]">
            <input type="text" className="grow p-2" onChange={handleEmailChange} />
          </label>
        </div>
        <div className='w-full max-w-xs'>
          <InputTitle>Password</InputTitle>
          <label className="input input-bordered w-full flex items-center gap-2 border-2 border-[#717171] bg-[#f8f8f8]">
            <input type="password" className="grow p-2" onChange={handlePasswordChange} />
          </label>
        </div>
        <div className='w-full max-w-xs'>
          <button onClick={handleLogin} className='btn btn-success w-full mt-4'>Login</button>
        </div>
      </div>

      {error && error.length > 0 && 
        <div className="toast toast-start lg:toast-center">
          <div className="alert alert-error">
            <span>{error}</span>
          </div>
        </div>
      }
    </div>
  );
}

export default Login;
