import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { InputHelper, toastNotifyHelper } from '../../helperMethods';
import { BigLoader } from '../../components/view/common';
import { ApiResponse } from '../../interfaces';
import { useSendEmailToRecoverPasswordMutation } from '../../APIs/AuthenticationAPI';


function ForgetPassword() {
  const [loading, setLoading] = useState(false);
  // define useNavigate() hook to redirect user to Home page when user is logged
  const navigate = useNavigate();

  // also we need a useState for the input field to write an email address
  const [emailInput, setEmailInput] = useState({
    email: ''
  });

  // now we have to use our helper method called InputHandler
  const handleEmailInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const tempData = InputHelper(event, emailInput);
    setEmailInput(tempData);
  }

  // define mutation to invoke it on form submit
  const [sendEmail] = useSendEmailToRecoverPasswordMutation();

  const handleSendEmail = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const sendEmailResponse: ApiResponse = await sendEmail(
       emailInput.email
      // all of these values will be populated inside the loginInput because we have the control component
    );

    // one we invoke the endpoint, we have to examine the response that result
    if (sendEmailResponse.data?.statusCode == 200) { // if loginResponse.data, if that is populated, let's check what happens 
      // console.log(loginResponse.data);
      
      toastNotifyHelper('Email con código de recuperación enviado correctamente. Revise su correo electrónico.');

      // redirect user to Home page
      navigate('/forgetPassword/ResetCode', {
        state: { // here we're passing to the different components some values, but we're using a state which will be on navigate itself
          // sendEmailResponse: emailInput.email,
          emailInput
        }
      });
    }
    else if (sendEmailResponse.error) {
      // console.log(loginResponse.error.data.errorsList[0]);
      // setErrorMessage(loginResponse.error.data.errorsList[0]);
      toastNotifyHelper(sendEmailResponse.error.data.errorsList[0], 'error');
    }

    setLoading(false);
  }


  return (
    <div className="container container-fp">

      {loading && (
        <BigLoader />
      )} 

      <div className="row">
        <div className="col-md-4 offset-md-4 form">

          <form onSubmit={handleSendEmail} method="post">
            <h2 className="text-center">Recuperar contraseña</h2>
            <p className="text-center">Introduzca su dirección de correo electrónico</p>

            <div className="form-group">
              <input 
                type='email'
                className='form-control'
                placeholder='Email'
                required
                name='email'
                value={emailInput.email}
                onChange={handleEmailInput}
              />
            </div>
            
            <div className="form-group mt-3">
              <input 
                className="form-control button" 
                type="submit" 
              />
            </div>
          </form>
        
        </div>
      </div>
    </div>
  )
}


export default ForgetPassword