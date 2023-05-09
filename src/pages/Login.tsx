import React, { useState } from 'react'
import { InputHelper, toastNotifyHelper } from '../helperMethods';
import { ApiResponse, UserInterface } from '../interfaces';
import { useLoginUserMutation } from '../APIs/AuthenticationAPI';
import jwt_decode from "jwt-decode";
import { useDispatch } from 'react-redux';
import { setUserLogged } from '../store/redux/AuthenticationSlice';
import { useNavigate } from 'react-router-dom';
import { BigLoader } from '../components/view/common';


function Login() {
  const [loading, setLoading] = useState(false);
  // if we have any error message while login, let's set that in a local state for now
  const [errorMessage, setErrorMessage] = useState('');
  // to call the authenticationSlice we need the useDispatch() hook
  const dispatch = useDispatch();
  // define useNavigate() hook to redirect user to Home page when user is logged
  const navigate = useNavigate();
  
  // also we need a useState for the input fields to login an user
  const [loginInput, setLoginInput] = useState({
    userName: '',
    password: '',
  });

  // now we have to use our helper method called InputHandler
  const handleLoginInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const tempData = InputHelper(event, loginInput);
    setLoginInput(tempData);
  }

  // define mutation to invoke it on form submit
  const [loginUser] = useLoginUserMutation();

  const handleLoginUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const loginResponse: ApiResponse = await loginUser({
      userName: loginInput.userName,
      password: loginInput.password,
      // all of these values will be populated inside the loginInput because we have the control component
    });

    // one we invoke the endpoint, we have to examine the response that result
    if (loginResponse.data) { // if loginResponse.data, if that is populated, let's check what happens 
      // console.log(loginResponse.data);
      
      // we have to fetch the user token from the loginResponse and save it in the localStorage
      const { token } = loginResponse.data.result;
      // and after that we have to decode the token to get its information inside
      // if we copy/paste the user token in JWT website, we can see what fields we need to decode
      const { fullName, userId, email, role }: UserInterface = jwt_decode(token);
      // save the token in localStorage
      localStorage.setItem('token', token);
      // call the authenticationSlice to populate the values inside the token decoded
      dispatch(setUserLogged({
        fullName,
        userId,
        email,
        role
      }));
      toastNotifyHelper('Login realizado correctamente.');

      // redirect user to Home page
      navigate('/');
    }
    else if (loginResponse.error) {
      // console.log(loginResponse.error.data.errorsList[0]);
      // setErrorMessage(loginResponse.error.data.errorsList[0]);
      toastNotifyHelper(loginResponse.error.data.errorsList[0], 'error');
      setLoading(false);
    }

    setLoading(true);
  }


  return (
    <div className='container text-center'>
    {/* 
      {loading && (
        <BigLoader />
      )} 
    */}
      <form onSubmit={handleLoginUser} method='post'>
        <h1 className='mt-5'>Login</h1>
        
        <div className='mt-5'>
          <div className='col-sm-6 offset-sm-3 col-xs-12 mt-4'>
            <input
              type='text'
              className='form-control'
              placeholder='Email'
              required
              name='userName'
              value={loginInput.userName}
              onChange={handleLoginInput}
            />
          </div>

          <div className='col-sm-6 offset-sm-3 col-xs-12 mt-4'>
            <input
              type='password'
              className='form-control'
              placeholder='Contraseña'
              required
              name='password'
              value={loginInput.password}
              onChange={handleLoginInput}
            />
          </div>
        </div>

        <div className='mt-2'>
          {errorMessage && (
            <p className='text-danger'>
              {errorMessage}
            </p>
          )}

          <button
            type='submit'
            style={{ width: '200px' }}
            className='btn btn-warning'
          >
            Login
          </button>
        </div>
      </form>
    </div>
  )
}

export default Login