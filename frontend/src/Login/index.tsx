import React, { useState, useRef, useEffect } from 'react';
import "./index.css"

const Login: React.FC = () => {
 

  return (
    <div className='wrapper'>
      <div className='sceen'>
        <p className='label'>Login</p>
          <div className='input-path'>
              <p>UserName or Email</p>
              <input type='text' placeholder='input your username or email' />
          </div>
          <div className='input-path'>
              <p>Password</p>
              <input type='password' placeholder='input your password' />
          </div>
          <button>Login</button>
      </div>
    </div>
    
  );
};

export default Login;