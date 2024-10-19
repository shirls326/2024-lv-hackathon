import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { db } from '../../firebase/config';
import { ref, set } from 'firebase/database';
import GradientSVG from '/login_gradient.svg?url';


// eslint-disable-next-line react/prop-types
const InputTitle = ({ children }) => {
 return <h2 className='mb-[0.2rem] mt-[1rem] font-thin'>{children}</h2>
}

function SignUp() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [uni, setUni] = useState('');
  const [theme, setTheme] = useState('light');
  const navigate = useNavigate();

  // Handlers
  const handleFirstNameChange = (event) => {
    event.preventDefault();
    const val = event.target.value;
    if (val) {
      setFirstName(val);
    }
  }
  const handleLastNameChange = (event) => {
    event.preventDefault();
    const val = event.target.value;
    if (val) {
      setLastName(val);
    }
  }
  const handleEmailChange = (event) => {
    event.preventDefault();
    const val = event.target.value;
    if (val) {
      setEmail(val);
    }
  }
  const handleUserNameChange = (event) => {
    event.preventDefault();
    const val = event.target.value;
    if (val) {
      setUserName(val);
    }
  }
  const handlePasswordChange = (event) => {
    event.preventDefault();
    const val = event.target.value;
    if (val) {
      setPassword(val);
    }
  }
  const handleUniChange = (event) => {
    event.preventDefault();
    const val = event.target.value;
    if (val) {
      setUni(val);
    }
  }

  const handleSignUp = async (e) => {
    e.preventDefault();
    
    // ensure all fields have been filled
    if (!(firstName && lastName && email && userName && password && uni)) {
      console.error('Invalid input');
      return;
    }

    try {
      // user is signed up
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // save info in RTDB
      const user = userCredential.user;
      const usersRef = ref(db, 'users/' + user.uid);
      await set(usersRef, {
        email: user.email,
        firstName,
        lastName
      });

      navigate('/login');

    } catch (error) {
      console.error(error);

      // switch on error code
      switch (error.code) {
        case 'auth/invalid-email':
          console.error('Invalid email format.');
          break;
        case 'auth/weak-password':
          console.error('Password is too weak. Please use at least 6 characters.');
          break;
        case 'auth/email-already-in-use':
          console.error('Email is already in use. Please use a different email.');
          break;
        default:
          console.error('Signup failed. Please try again later.');
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

          <div>
            <InputTitle>Last Name</InputTitle>
            <label className="input input-bordered flex items-center gap-2 border-2 border-[#717171] bg-[#f8f8f8]">
              <input type="text" className="grow" onChange={handleLastNameChange} />
            </label>
          </div>
        </div>

        <div>
          <InputTitle>Email</InputTitle>
          <label className="input input-bordered flex items-center gap-2 border-2 border-[#717171] bg-[#f8f8f8]">
            <input type="text" className="grow" onChange={handleEmailChange} />
          </label>
        </div>

        <div>
          <InputTitle>Username</InputTitle>
          <label className="input input-bordered flex items-center gap-2 border-2 border-[#717171] bg-[#f8f8f8]">
            <input type="text" className="grow" onChange={handleUserNameChange} />
          </label>
        </div>

        <div>
          <InputTitle>Password</InputTitle>
          <label className="input input-bordered flex items-center gap-2 border-2 border-[#717171] bg-[#f8f8f8]">
            <input type="text" className="grow" onChange={handlePasswordChange} />
          </label>
        </div>

        <div>
          <InputTitle>University</InputTitle>
          <label className="input input-bordered flex items-center gap-2 border-2 border-[#717171] bg-[#f8f8f8]">
            <input type="text" className="grow" onChange={handleUniChange} />
          </label>
        </div>

        <button onClick={handleSignUp} className='btn btn-success mt-3'>Sign Up</button>
      </div>
    </div>
  );
}

export default SignUp;