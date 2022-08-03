import "./register.css";
import { useRef } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router';
// import { Link, Navigate } from 'react-router-dom';


export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const history = useNavigate();

  const handleClick = async (e) => {
        e.preventDefault();
        if(passwordAgain.current.value !== password.current.value){
            passwordAgain.current.setCustomValidity("Passwords don't match!");
        }else{
            const user = {
                username: username.current.value,
                email: email.current.value,
                password: password.current.value,
            };
            try {
                await axios.post("/auth/register", user);
                history("/login");
            } catch (err) {
                console.log(err);
            }
        }
    }

  return (
    <div className="register">
        <div className="registerWrapper">
            <div className="loginLeft">
                <h3 className="loginLogo">Cutebook</h3>
                <span className="loginDesc">
                    connect with friends and the world around you on Cutebook
                </span>
            </div>
            <div className="registerRight" >
                <form className="registerBox" onSubmit={handleClick}>
                    <input placeholder="Username" required ref={username}  className="registerInput" />
                    <input type="email" placeholder="Email" required ref={email} className="registerInput" />
                    <input type="password" placeholder="Password" required minLength="6" ref={password} className="registerInput" />
                    <input type="password" placeholder="Password Again" required ref={passwordAgain} className="registerInput" />
                    <button className="registerButton" type="submit">Sign Up</button>
                    <button className="registerRegisterButton">Already have an account?</button>
                </form>
            </div>
        </div>
    </div>
  );
}
