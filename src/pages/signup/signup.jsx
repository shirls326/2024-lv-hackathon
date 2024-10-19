import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GradientSVG from '/login_gradient.svg?url';


function SignUp() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [uni, setUni] = useState('');
  const [theme, setTheme] = useState('light');

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



  return (
    <div data-theme={theme} className='flex justify-between items-center max-h-screen w-screen bg-white'>
      <img alt="bruh" src={GradientSVG} className='h-screen w-auto'></img>
      <div className='flex flex-col justify-center w-full h-screen mx-[7rem] gap-[0.5rem]'>
        <h1 className='mx-auto'>Sign Up</h1>
        <div className='flex flex-row justify-between'>
          <div className=''>
            <h3>First Name</h3>
            <label className="input input-bordered flex items-center gap-2">
              <input type="text" className="grow" placeholder="John" onChange={} />
            </label>
          </div>

          <div>
            <h3>Last Name</h3>
            <label className="input input-bordered flex items-center gap-2">
              <input type="text" className="grow" placeholder="Doe" />
            </label>
          </div>
        </div>

        <div>
          <h3>Email</h3>
          <label className="input input-bordered flex items-center gap-2">
            <input type="text" className="grow" placeholder="Email" />
          </label>
        </div>

        <div>
          <h3>Username</h3>
          <label className="input input-bordered flex items-center gap-2">
            <input type="text" className="grow" placeholder="Username" />
          </label>
        </div>

        <div>
          <h3>Password</h3>
          <label className="input input-bordered flex items-center gap-2">
            <input type="text" className="grow" placeholder="Password" />
          </label>
        </div>
        
        <div>
          <h3>University</h3>
          <label className="input input-bordered flex items-center gap-2">
            <input type="password" className="grow" placeholder="University" />
          </label>
        </div>
      </div>
    </div>
  );
}

export default SignUp;