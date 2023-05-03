import React, { useState } from 'react'
import { StaticDetails_Roles } from '../Utils/StaticDetails'
import { InputHelper } from '../helperMethods';


function Register() {
  const [loading, setLoading] = useState(false);
  
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

  return (
    <div className='container text-center'>
      <form method='post'>
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
          <button type='submit' className='btn btn-success'>
            Register
          </button>
        </div>
      </form>
    </div>
  )
}


export default Register