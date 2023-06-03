import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { InputHelper, toastNotifyHelper } from '../../helperMethods';
import { ApiResponse } from '../../interfaces';
import { useVerifyCodeMutation } from '../../APIs/AuthenticationAPI';
import { BigLoader } from '../../components/view/common';


function ResetCode() {
  // we are looking for the apiDataResult and deliveryInput, and from where we want that, we want to extract that from useLocation() hook
  // that will make sure that whatever we're passing in the state when we navigate it's extracted and automatically populated
  const {
    state: {
      // sendEmailResponse: verifyCodeResponse,
      emailInput
    }
  } = useLocation();

  const [loading, setLoading] = useState(false);
  // define useNavigate() hook to redirect user to Home page when user is logged
  const navigate = useNavigate();

  // also we need a useState for the input field to write an email address
  const [codeInput, setCodeInput] = useState({
    code: ''
  });

  // now we have to use our helper method called InputHandler
  const handleCodeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const tempData = InputHelper(event, emailInput);
    setCodeInput(tempData);
  }

  // define mutation to invoke it on form submit
  const [verifyCode] = useVerifyCodeMutation();

  const handleVerifyCode = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const verifyCodeResponse: ApiResponse = await verifyCode({
      email: emailInput.email,
      code: codeInput.code
      // all of these values will be populated inside the loginInput because we have the control component
    });

    // one we invoke the endpoint, we have to examine the response that result
    if (verifyCodeResponse.data?.statusCode === 200) { // if loginResponse.data, if that is populated, let's check what happens 
      // console.log(loginResponse.data);
      
      toastNotifyHelper('Codigo validado correctamente.');

      // redirect user to Home page
      navigate('/forgetPassword/NewPassword', {
        state: { // here we're passing to the different components some values, but we're using a state which will be on navigate itself
          responseInput: {
            email: emailInput.email,
            code: codeInput.code 
          }
        }
      });
    }
    else if (verifyCodeResponse.error) {
      // console.log(loginResponse.error.data.errorsList[0]);
      // setErrorMessage(loginResponse.error.data.errorsList[0]);
      toastNotifyHelper(verifyCodeResponse.error.data.errorsList[0], 'error');
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

          <form onSubmit={handleVerifyCode} method="POST">
            <h2 className="text-center">Código de verificación</h2>

            <div className="form-group">
              <input 
                type='text'
                className='form-control'
                placeholder='Código de verificación'
                required
                name='code'
                value={codeInput.code}
                onChange={handleCodeInput}
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


export default ResetCode