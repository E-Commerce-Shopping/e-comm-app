import React, { useEffect, useRef, useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import axios from "axios";

const Login = () => {
  //const [Login, setLogin] = useState(false);
  const [error, setError] = useState({});
  const [forgotpass, setForgotpass] = useState(false);
  const [input, setInput] = useState({
    email: '',
    password: '',
  });
const inputRef = useRef(null);
const [exception, setException] = useState(null);

  const handleChange = (e)=> {
    
     if(e.target.name === 'email') {
        setInput({...input, email: e.target.value})
    }  else if(e.target.name === 'password') {
        setInput({...input, password: e.target.value})
    }
  }


  //login input fields validations.

  const validations = () => {
    let tempErrors = {};
  //  if(!input.name) tempErrors.name = 'enter your name';
    //if(input.name.length<2) tempErrors.name = 'name should have more than 2 characters';
   // if(input.phone.length<10 || input.phone.length>11) tempErrors.phone = 'phone number must contain 10 numbers';

    if(input.password.length<8) tempErrors.password = 'password must contain atleast 8 characters';
    // if(input.password !== input.cpassword) tempErrors.cpassword = 'password is not matching';

    const checkNumber = input.password.split('').filter((i) => !isNaN(i) && i !== ' ');

if (checkNumber.length < 4) {
  tempErrors.Numbers = 'Password must contain at least 4 numbers';
}

const checkChars = input.password.split('').filter((i)=> i.match(/[a-zA-Z]/))

if(checkChars.length<2 ) {
  tempErrors.letters = 'Password must contain at least 2 characters';
}

const specialChars = '!@#$%^&*()_+[]{}|;:,.<>?';

const checkSpecialChars = input.password.split('').filter((i) => specialChars.includes(i));

if (checkSpecialChars.length < 1) {
  tempErrors.specialChars = 'Password must contain at least one special character';
}
        
       setError(tempErrors);
       return Object.keys(tempErrors).length === 0;
    
}

//   const handleSignUpClick = () => {
//     setLogin((login)=>!login);
//     setForgotpass(false);
//   }

  const handleForgotPass = () => {
    setForgotpass(true);
    inputRef.current.focus();
  }

//posting forgotpassword verfication email to API
const postEmail = async ()=> {
  try {
    const detail = await axios.post('https://localhost:8080/forgotpassword', input.email);
  console.log(detail);
  setException(null);
  } catch(err) {
    console.log(err);
    setException(err);
  }
}

//handling forgot password
  const handleSendOTP = () => {
    alert('OTP has been sent to your email');
    setInput({email: '', password: ''});
    postEmail();
  }

//   useEffect(()=>{
//     const storedData = localStorage.getItem('formData');
//     if(storedData) {
//         setInput(JSON.parse(storedData))
//     }
//   }, []);



//posting login details to API
const postData = async () => {
  try {
    const details = await axios.post('https://localhost:8080/login', input);
    console.log(details);
    setException(null);
  } catch(err) {
    setException(err);
    console.log(err);
  }
  
}


//handling login submit
  const handleSubmit = async (e)=> {
    e.preventDefault();
    

    if(validations()) {
        alert('form submitted');
        setInput({
            email: '',
            password: '',
            });

           postData();

    }
   // alert('form submitted')


   // localStorage.setItem('formData', JSON.stringify(input))
  }

  return (
    <div className="login-container w-100">
      <h2>{forgotpass ? 'Forgot Password!' : 'Login'}</h2>

      {!forgotpass &&  <form onSubmit={handleSubmit}>
       
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

       
        <div className="input-wp">
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
          {error.Numbers && <span className="text-danger">{error.Numbers}</span>}
          {error.letters && <span className="text-danger">{error.letters}</span>}
          {error.specialChars && <span className="text-danger">{error.specialChars}</span>}
          <span className="text-primary forgot-pass" onClick={handleForgotPass}>Forgot Password? </span>
         
        </div> 

    

         {!forgotpass && <button className="submit-btn btn-dark mt-3" type='submit'>
          Login
        </button>}

        { forgotpass && <button className="submit-btn btn-dark mt-3" onClick={handleSendOTP}> Send OTP </button>}

        
         {!forgotpass && <p>
            Don't have an account?
           <Link className="link" to='/signup'> <strong>SignUp</strong></Link> 
          </p>}
        


        {/* {Login && <span>Feedback</span>} */}
      </form> }

      { forgotpass && <form onSubmit={handleSendOTP}>
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


        <button className="submit-btn btn-dark mt-3"> Send OTP </button>
      </form>

      }


    </div>
  );
};

export default Login;
