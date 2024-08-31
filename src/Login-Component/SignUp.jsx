import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const SignUp = ({showLogin}) => {
    const [input, setInput] = useState({name: '', email:'', phone: '', password: '', cpassword: ''});
    const [error, setError] = useState({});
    const [submit, setSubmit] = useState(false)



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
      //  if(!input.name) tempErrors.name = 'enter your name';
        if(input.name.length<2) tempErrors.name = 'name should have more than 2 characters';
       // if(input.phone.length<10 || input.phone.length>11) tempErrors.phone = 'phone number must contain 10 numbers';
    
        if(input.password.length<8) tempErrors.password = 'password must contain atleast 8 characters';
        if(input.password !== input.cpassword) tempErrors.cpassword = 'password is not matching';
        
        setError(tempErrors);
      }

    const handleSubmit = (e) => {
        e.preventDefault();

        if(validations()) {
            alert('form submitted');
        }

        setSubmit(true);

        setTimeout(() => {
            return <Redirect to={'/'} />
        }, 3000);
        
        
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
            type="password"
            placeholder="enter a your password.."
            className="input-field"
            name="password"
            value={input.password}
            onChange={handleChange}
            required
          />

          {error.password && <span className="text-danger">{error.password}</span>}
          
         
        </div> 

      
          <div className="input-wp">
            <label>Confirm Password*</label>
            <input
              type="password"
              placeholder="confirm your password.."
              className="input-field"
              name="cpassword"
              value={input.cpassword}
              onChange={handleChange}
              required
            />

            {error.cpassword && <span className="text-danger">{error.cpassword}</span>}
          </div>

{/* {submit&& <p className='text-success'> Account Created!</p>} */}
<button className='btn btn-dark submit-btn mt-3' type='submit'>SignUp</button> 
<p>Don't have an account? <Link to='/' className="link"> <strong>Login</strong> </Link> </p>
      </form>
    </div>
  )
}

export default SignUp
