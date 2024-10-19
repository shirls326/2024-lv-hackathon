import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDatabase, ref, set, get} from "firebase/database";
import GradientSVG from '/login_gradient.svg?url';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  return (
    <div className='flex justify-center max-h-screen w-screen bg-white'>
      <img alt="bruh" src={GradientSVG} className='h-screen w-auto'></img>
      <>Hello Login!!</>
    </div>
  );
}

export default Login;