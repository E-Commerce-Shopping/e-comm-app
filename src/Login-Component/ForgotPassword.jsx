import React from 'react';

const ForgotPassword = ({email}) => {
  return (
    <>
    <form>
        <input type="email"
            placeholder="enter your email.."
            className="input-field"
            name="email"
            value={email}
            required/>

            <button className='btn-dark submit-btn'>Send OTP</button>
    </form>
    </>
  )
}

export default ForgotPassword;
