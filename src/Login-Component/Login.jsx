import React, { useEffect, useRef, useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";

const Login = () => {
  //const [Login, setLogin] = useState(false);
  const [error, setError] = useState({});
  const [forgotpass, setForgotpass] = useState(false);
  const [input, setInput] = useState({
    email: '',
    password: '',
  });
const inputRef = useRef(null);

  const handleChange = (e)=> {
    
     if(e.target.name === 'email') {
        setInput({...input, email: e.target.value})
    }  else if(e.target.name === 'password') {
        setInput({...input, password: e.target.value})
    }
   
  }


  const validations = () => {
    let tempErrors = {};
  //  if(!input.name) tempErrors.name = 'enter your name';
    if(input.name.length<2) tempErrors.name = 'name should have more than 2 characters';
   // if(input.phone.length<10 || input.phone.length>11) tempErrors.phone = 'phone number must contain 10 numbers';

    if(input.password.length<8) tempErrors.password = 'password must contain atleast 8 characters';
    // if(input.password !== input.cpassword) tempErrors.cpassword = 'password is not matching';
    
    setError(tempErrors);
  }

//   const handleSignUpClick = () => {
//     setLogin((login)=>!login);
//     setForgotpass(false);
//   }

  const handleForgotPass = () => {
    setForgotpass(true);
    inputRef.current.focus();
  }

  const handleSendOTP = () => {
    alert('OTP has been sent to your email');
  }

//   useEffect(()=>{
//     const storedData = localStorage.getItem('formData');
//     if(storedData) {
//         setInput(JSON.parse(storedData))
//     }
//   }, []);


  const handleSubmit = (e)=> {
    e.preventDefault();
    

    if(validations()) {
        console.log('form submitted');
        setInput({
            name:' ',
            email: '',
            phone: '',
            password: '',
            cpassword:'',
            })
    }
   // alert('form submitted')


   // localStorage.setItem('formData', JSON.stringify(input))
  }

  return (
    <div className="login-container w-100">
      <h2>{forgotpass ? 'Forgot Password!' : 'Login'}</h2>

      <form onSubmit={handleSubmit}>
       
        <div className="input-wp">
          <label> User Name*</label>
          <input
            type="email"
            placeholder="enter your email.."
            className="input-field"
            ref={inputRef}
            name="email"
            value={input.email}
            onChange={handleChange}
            required
          />
        </div>

       
       {!forgotpass &&  <div className="input-wp">
          <label>Password*</label>
          <input
            type="password"
            placeholder="enter a your password.."
            className="input-field"
            name="password"
            value={input.password}
            onChange={handleChange}
            required
          />

          {error.password && <span className="text-danger">{error.password}</span>}
          <span className="text-primary forgot-pass" onClick={handleForgotPass}>Forgot Password? </span>
         
        </div> }

    

         {!forgotpass && <button className="submit-btn btn-dark mt-3" type='submit'>
          Login
        </button>}

        { forgotpass && <button className="submit-btn btn-dark mt-3" onClick={handleSendOTP}> Send OTP </button>}

        
         {!forgotpass && <p>
            Don't have an account?
           <Link className="link" to='/signup'> <strong>SignUp</strong></Link> 
          </p>}
        


        {/* {Login && <span>Feedback</span>} */}
      </form>
    </div>
  );
};

export default Login;
