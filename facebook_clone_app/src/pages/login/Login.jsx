import "./login.css";
import { useContext, useRef } from 'react';
import { loginCall } from '../../apiCalls';
import { AuthContext } from "../../context/AuthContext";
import Box from '@mui/material/Box';
import CircularProgress, {
  circularProgressClasses,
} from '@mui/material/CircularProgress';

function FacebookCircularProgress(props) {
    return (
      <Box sx={{ position:"relative" }}>
        <CircularProgress
          variant="indeterminate"
          disableShrink
          sx={{
            color: (theme) => (theme.palette.mode === 'light' ? '#FFFFFF' : '#FFFF00'),
            animationDuration: '550ms',
            position: 'absolute',
            [`& .${circularProgressClasses.circle}`]: {
              strokeLinecap: 'round',
            },
          }}
          size={20}
          thickness={4}
          {...props}
        />
      </Box>
    );
  }

export default function Login() {
  const email = useRef();
  const password = useRef();
  const { user, isFetching, dispatch } = useContext(AuthContext); 

  const handleClick = (e) => {
        e.preventDefault();
        loginCall(
            {email:email.current.value, password:password.current.value}, 
            dispatch);
  }
 console.log(user)
  return (
    <div className="login">
        <div className="loginWrapper">
            <div className="loginLeft">
                <h3 className="loginLogo">Cutebook</h3>
                <span className="loginDesc">
                    connect with friends and the world around you on Cutebook
                </span>
            </div>
            <div className="loginRight">
                <form className="loginBox" onSubmit={handleClick}>
                    <input 
                        type="email" 
                        placeholder="Email" 
                        required 
                        className="loginInput" 
                        ref={email} 
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        required 
                        minLength={"6"}
                        className="loginInput" 
                        ref={password} 
                    />
                    <button className="loginButton" type="submit" disabled={isFetching}>
                        {isFetching ? <Box sx={{ flexGrow: 1 }}><FacebookCircularProgress /></Box> : "Sign In"}
                    </button>
                    <span className="loginForgot">Forgot Password</span>
                    <button className="loginRegisterButton">
                        {isFetching ? <Box sx={{ flexGrow: 1 }}><FacebookCircularProgress /></Box> : "Create a New Account"}
                    </button>
                </form>
            </div>
        </div>
    </div>
  );
}
