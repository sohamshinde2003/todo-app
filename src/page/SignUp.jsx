import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerNewUser } from '../api-firebase/api-config';


export default function SignUp() {
  const navigator = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [isVisible, setIsVisible] = useState(false);
  const [isVisible1, setIsVisible1] = useState(false);

  const handleLoginClick = () => {
    console.log("Sadf");
    navigator('/');
  };

  const handleSubmitEvent = (e) => {
    e.preventDefault();

    // Basic form validation
    if (!name || !email || !password || !confirmPassword) {
      alert('All fields are required');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address');
      return;
    }

    // Password and Confirm Password matching
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    registerNewUser({email: email, password:password, name: name})?alert('Successfully registered'):alert("Error registering");
    navigator('/')
  };

  return (
    <div className="container">
      <div className="form-container">
        <div className="form-title">Sign Up</div>
        <div className="form-title-1">Create a New Account</div>
        <form onSubmit={handleSubmitEvent}>
          <div className="input-box">
            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="input-box">
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="input-box">
            <input
              type={isVisible1 ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <img width="20" src={isVisible1 ? './img/eye-open.svg' : './img/eye-close.svg'} alt="" onClick={() => setIsVisible1(!isVisible1)} />
          </div>
          <div className="input-box">
            <input
              type={isVisible ? 'text' : 'password'}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <img width="20" src={isVisible ? './img/eye-open.svg' : './img/eye-close.svg'} alt="" onClick={() => setIsVisible(!isVisible)} />
          </div>

          <button className="btn">Register</button>
        </form>

        <div className="b-line">
          Already have an account? <span onClick={handleLoginClick}> Login</span>
        </div>
      </div>
    </div>
  );
}
