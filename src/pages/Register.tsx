import React, { useState } from 'react'
import { StaticDetails_Roles } from '../Utils/StaticDetails'
import { InputHelper, toastNotifyHelper } from '../helperMethods';
import { useRegisterUserMutation } from '../APIs/AuthenticationAPI';
import { ApiResponse } from '../interfaces';
import { useNavigate } from 'react-router-dom';
import { BigLoader } from '../components/view/common';


function Register() {
  const [isLoading, setIsLoading] = useState(false);
  // to redirect user to login page once is registered
  const navigate = useNavigate();
  
  // also we need a useState for the input fields to register an user
  const [registerInput, setRegisterInput] = useState({
    userName: '',
    password: '',
    role: '',
    name: ''
  });

  // now we have to use our helper method called InputHandler
  const handleRegisterInput = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const tempData = InputHelper(event, registerInput);
    setRegisterInput(tempData);
  }

  // define mutation to invoke it on form submit
  const [registerUser] = useRegisterUserMutation();

  const handleRegisterUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    const registerResponse: ApiResponse = await registerUser({
      userName: registerInput.userName,
      password: registerInput.password,
      role: registerInput.role,
      name: registerInput.name
      // all of these values will be populated inside the registerInput because we have the control component
    });

    // one we invoke the endpoint, we have to examine the response that result
    if (registerResponse.data) { // if registerResponse.data, if that is populated, let's check what happens 
      // console.log(registerResponse.data);
      toastNotifyHelper('Nuevo usuario registrado correctamente!');
      navigate('/Login');
    }
    else if (registerResponse.error) {
      // console.log(registerResponse.error.data.errorsList[0]);
      toastNotifyHelper(registerResponse.error.data.errorsList[0], 'error')
    }

    setIsLoading(false);
  }

  return (
    <div className='container text-center'>
      {isLoading && (
        <BigLoader />
      )}

      <form onSubmit={handleRegisterUser} method='post'>
        <h1 className='mt-5'>Register</h1>

        <div className='mt-5'>
          <div className='col-sm-6 offset-sm-3 col-xs-12 mt-4'>
            <input
              type='text'
              className='form-control'
              placeholder='Enter Username'
              required
              name='userName'
              value={registerInput.userName}
              onChange={handleRegisterInput}
            />
          </div>
        
          <div className='col-sm-6 offset-sm-3 col-xs-12 mt-4'>
            <input
              type='text'
              className='form-control'
              placeholder='Enter Name'
              required
              name='name'
              value={registerInput.name}
              onChange={handleRegisterInput}
            />
          </div>
        
          <div className='col-sm-6 offset-sm-3 col-xs-12 mt-4'>
            <input
              type='password'
              className='form-control'
              placeholder='Enter Password'
              required
              name='password'
              value={registerInput.password}
              onChange={handleRegisterInput}
            />
          </div>
        
          <div className='col-sm-6 offset-sm-3 col-xs-12 mt-4'>
            <select 
              className='form-control form-select' 
              required
              name='role'
              value={registerInput.role}
              onChange={handleRegisterInput}
            >
              <option value=''>--Select Role--</option>
              <option value={`${StaticDetails_Roles.CUSTOMER}`}>Customer</option>
              <option value={`${StaticDetails_Roles.ADMIN}`}>Admin</option>
            </select>
          </div>
        </div>
        
        <div className='mt-5'>
          <button 
            type='submit' 
            className='btn btn-warning'
            disabled={isLoading}
          >
            Register
          </button>
        </div>
      </form>
    </div>
  )
}


export default Register