import { useState } from 'react';
import GradientSVG from '/login_gradient.svg?url';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router';

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


  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/products');
    } catch (error) {
      setError('');
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
    <div data-theme={theme} className='flex justify-between items-center max-h-screen w-screen bg-white'>
      <img alt="bruh" src={GradientSVG} className='h-screen w-auto'></img>
      <div className='flex flex-col justify-center w-full h-screen mx-[7rem] gap-[0.5rem]'>
        <h1 className='mx-auto font-thin'>Sign Up</h1>
        <div className='flex flex-row justify-between'>
          <div className=''>
            <InputTitle>First Name</InputTitle>
            <label className="input input-bordered flex items-center gap-2 border-2 border-[#717171] bg-[#f8f8f8]">
              <input type="text" className="grow" onChange={handleFirstNameChange} />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;