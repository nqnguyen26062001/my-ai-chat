import React, { useState, useRef, useEffect } from 'react';
import "./index.css"
import Chat from '../Chat';

const Login: React.FC = () => {
    const [UserNameorEmail, setUserNameorEmail] = useState('');
      const [Password, setPassword] = useState('');

 
  const Login = async () => {

    try {
      const res = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ UserNameorEmail: UserNameorEmail, Password: Password  }),
      });
      const data = await res.json();
      console.log(data);
    } catch {
    }
  }

  return (
    <div className='wrapper'>
      <div className='sceen'>
        <p className='label'>Login</p>
          <div className='input-path'>
              <p>UserName or Email</p>
              <input type='text' placeholder='input your username or email' onChange={(e) => setUserNameorEmail(e.target.value)} value={UserNameorEmail} />
          </div>
          <div className='input-path'>
              <p>Password</p>
              <input type='password' placeholder='input your password' onChange={(e) => setPassword(e.target.value)} value={Password}/>
          </div>
          <button onClick={()=>Login()}>Login</button>
      </div>
    </div>
    
  );
};

export default Login;