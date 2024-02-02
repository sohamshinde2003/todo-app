import React, { useState } from 'react'
import { loginUser, signWithFacebook, signWithGitHub, signWithGoogle } from '../api-firebase/api-config';
import { useNavigate } from 'react-router-dom';

export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isVisible, setIsVisible] = useState(false);
    const navigator = useNavigate();
    const handleLogin = async (e) => {
        e.preventDefault();

        console.log("login.....");
        if (!email || !password) {
            alert('Please enter both email and password');
            return;
        }
        if(await loginUser({ email, password })){
            navigator("/dashboard");
        }
        else{
            alert("Error: Please enter Correct both email and password");
        }
    };

    return (
        <div class="container">
            <div class="form-container">
                <div class="form-title">Login</div>
                <form onSubmit={handleLogin}>
                    <div class="input-box">
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div class="input-box">
                        <input
                            type={isVisible ? 'text' : 'password'}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <img width="20" src={isVisible ? './img/eye-open.svg' : './img/eye-close.svg'} alt="" onClick={() => {
                            setIsVisible(!isVisible);
                        }} />

                    </div>

                    <button class="btn">Login</button>

                </form>
                <div class="text">
                    OR
                </div>
                <div class="login-app-icon">
                    <div class="icon" onClick={async ()=>{
                     await signWithGoogle(()=>{navigator('/dashboard')});
                     
                    }}><img src="/img/google-icon.svg" alt="" /></div>
                    <div class="icon"
                    onClick={async ()=>{
                        await signWithGitHub(()=>{navigator('/dashboard')});
                        
                       }}><img src="/img/github-icon.svg" alt="" /></div>
                    <div class="icon"onClick={async ()=>{
                     await signWithFacebook(()=>{navigator('/dashboard')});
                     
                    }}
                    ><img src="/img/facebook-round-color-icon.svg" alt="" /></div>
                    <div class="icon"><img src="/img/email-icon.svg" alt="" /></div>
                </div>
                <div class="b-line">
                    Don't have an account? <span onClick={()=>{
                        navigator("/signup")
                    }}> Sign Up</span>
                </div>
            </div>
        </div>
    )
}
