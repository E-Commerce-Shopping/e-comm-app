import React, { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Tick from '../assets/check-mark.png';
import Hidden from '../assets/hidden.png';
import Eye from '../assets/eye.png';

const SignUp = ({showLogin}) => {
    const [input, setInput] = useState({name: '', email:'', phone: '', password: '', cpassword: ''});
    const [error, setError] = useState({});
    const [submit, setSubmit] = useState(false);
    const [showsPass, setShowPass] = useState(false);
    const [cshowsPass, setCshowPass] = useState(false);
    const[exception, setException] = useState(null);
    const navigate = useNavigate();



    const handleChange = (e) => {
        if(e.target.name === 'fname') {
            setInput({...input, name: e.target.value})
        } else if (e.target.name === 'email') {
            setInput({...input, email: e.target.value})
        } else if(e.target.name === 'phone') {
            setInput({...input, phone: e.target.value})
        } else if (e.target.name === 'password') {
            setInput({...input, password: e.target.value})
        }  else if(e.target.name === 'cpassword') {
            setInput({...input, cpassword: e.target.value})
        } 
    }

    const validations = () => {
       let tempErrors = {};
       let isValid = true;
      //  if(!input.name) tempErrors.name = 'enter your name';
        if(input.name.length<2) tempErrors.name = 'name should have more than 2 characters';
       // if(input.phone.length<10 || input.phone.length>11) tempErrors.phone = 'phone number must contain 10 numbers';
    
       else if(input.password.length<8) tempErrors.password = 'password must contain atleast 8 characters';
        
      else  if(input.password !== input.cpassword) tempErrors.cpassword = 'password is not matching';

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


      const showPass = () => {
        setShowPass(!showsPass);
      }

      const CshowPass = () => {
        setCshowPass(!cshowsPass)
      }


      const postData = async () =>{
        try {
          const res = await axios.post('https://localhost:8080/signup', input);
        console.log(res);
        setException(null)
        } catch(err) {
          console.log(err);
          setException(err);
        }
      }

    const handleSubmit = (e) => {
        e.preventDefault();

        if(validations()) {
            alert('form submitted');
            setSubmit(true);
            
            postData();

            setTimeout(() => {
               navigate('/');
            }, 3000);


        }
    }


  return (
    <div className='login-container w-100'>
      <form onSubmit={handleSubmit}>
      <h2>SignUp</h2>
          <div className="input-wp">
            <label>Full Name*</label>
            <input
              type="text"
              placeholder="enter your full name.."
              className="input-field"
              name="fname"
              value={input.name}
              onChange={handleChange}
              required
            />
            {error.name && <span className="text-danger text-bold">{error.name}</span>}
          </div>
        

<div className="input-wp">
          <label>Email*</label>
          <input
            type="email"
            placeholder="enter your email.."
            className="input-field"
            name="email"
            value={input.email}
            onChange={handleChange}
            required
          />
        </div>

        
          <div className="input-wp">
            <label>Phone Number*</label>
            <input
              type="number"
              placeholder="enter your phone number.."
              className="input-field"
              name="phone"
              value={input.phone}
              onChange={handleChange}
              required
            />

            {error.phone && <span className="text-danger">{error.phone}</span>}
          </div>
        

         <div className="input-wp">
          <label>Password*</label>
          <input
            type={showsPass ? "text" : 'password'}
            placeholder="enter a your password.."
            className="input-field"
            name="password"
            value={input.password}
            onChange={handleChange}
            required
          />

{!showsPass && <img src={Hidden} alt='hidden-eye' className='password-icon' onClick={showPass} />}
{showsPass && <img src={Eye} alt='eye' className='password-icon-eye' onClick={showPass} />}

          {error.password && <span className="text-danger">{error.password}</span>}
          {error.Numbers && <span className="text-danger">{error.Numbers}</span>}
          {error.letters && <span className="text-danger">{error.letters}</span>}
          
          {error.specialChars && <span className="text-danger">{error.specialChars}</span>}
          
         
        </div> 

      
          <div className="input-wp">
            <label>Confirm Password*</label>
            <input
              type={cshowsPass ? "text" : 'password'}
              placeholder="confirm your password.."
              className="input-field"
              name="cpassword"
              value={input.cpassword}
              onChange={handleChange}
              required
            />

            {!cshowsPass && <img src={Hidden} alt='hidden-eye' className='password-icon' onClick={CshowPass} />}
           {cshowsPass && <img src={Eye} alt='eye' className='password-icon-eye' onClick={CshowPass} />}

            {error.cpassword && <span className="text-danger">{error.cpassword}</span>}
          </div>
         { !submit && <button className='btn btn-dark submit-btn mt-3' type='submit'>SignUp</button> }
 {submit&& <> <p className='text-success text-bold success-msg'> Account Created!</p>

<img src={Tick} alt='success-message' className='success-tick'/> </>} 
{!submit && <p>Don't have an account? <Link to='/' className="link"> <strong>Login</strong> </Link> </p>}
      </form>
    </div>
  )
}

export default SignUp
