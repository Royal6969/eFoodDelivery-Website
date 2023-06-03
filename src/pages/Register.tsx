import React, { useState, useEffect } from 'react'
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
    firstPassword: '',
    secondPassword: '',
    role: 'customer',
    name: '',
    phoneNumber: ''
  });

  /********************************************** Password Validation ****************************************************** */
  const [validLength, setValidLength] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);
  const [upperCase, setUpperCase] = useState(false);
  const [lowerCase, setLowerCase] = useState(false);
  const [specialChar, setSpecialChar] = useState(false);
  const [match, setMatch] = useState(false);
  const [requiredLength, setRequiredLength] = useState(8)

  const inputPasswordChange: (event: React.ChangeEvent<HTMLInputElement>) => void = (event) => {
    const { value, name } = event.target;
    setRegisterInput({
      ...registerInput,
      [name]: value
    })
  }

  useEffect(() => {
    setValidLength(registerInput.firstPassword.length >= requiredLength ? true : false);
    setUpperCase(registerInput.firstPassword.toLowerCase() !== registerInput.firstPassword);
    setLowerCase(registerInput.firstPassword.toUpperCase() !== registerInput.firstPassword);
    setHasNumber(/\d/.test(registerInput.firstPassword));
    setMatch(!!registerInput.firstPassword && registerInput.firstPassword === registerInput.secondPassword)
    setSpecialChar(/[ `!@#$%^&*()_+\-=\]{};':"\\|,.<>?~]/.test(registerInput.firstPassword));

  }, [registerInput, requiredLength]);
  
  /************************************************************************************************************************* */

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

    if (!validLength) {
      toastNotifyHelper('La contraseña debe contener 8 caracteres como mínimo', 'error');
      setIsLoading(false);
    }
    else if (!lowerCase) {
      toastNotifyHelper('La contraseña debe contener al menos 1 minúscula', 'error');
      setIsLoading(false);
    }
    else if (!upperCase) {
      toastNotifyHelper('La contraseña debe contener al menos 1 mayúscula', 'error');
      setIsLoading(false);
    }
    else if (!hasNumber) {
      toastNotifyHelper('La contraseña debe contener al menos 1 número', 'error');
      setIsLoading(false);
    }
    else if (!specialChar) {
      toastNotifyHelper('La contraseña debe contener al menos 1 carácter especial', 'error');
      setIsLoading(false);
    }
    else if (!match) {
      toastNotifyHelper('Las contraseñas no coinciden', 'error');
      setIsLoading(false);
    }
    else if (validLength && hasNumber && upperCase && lowerCase && specialChar && match) {
      const registerResponse: ApiResponse = await registerUser({
        userName: registerInput.userName,
        password: registerInput.firstPassword,
        role: registerInput.role,
        name: registerInput.name,
        phoneNumber: registerInput.phoneNumber
        // all of these values will be populated inside the registerInput because we have the control component
      });
  
      // one we invoke the endpoint, we have to examine the response that result
      if (registerResponse.data) { // if registerResponse.data, if that is populated, let's check what happens 
        // console.log(registerResponse.data);
        toastNotifyHelper('Nuevo usuario registrado correctamente. Revise su email para confirmar el registro.');
        navigate('/Login');
      }
      else if (registerResponse.error) {
        // console.log(registerResponse.error.data.errorsList[0]);
        toastNotifyHelper(registerResponse.error.data.errorsList[0], 'error')
      }
    }

    setIsLoading(false);
  }


  return (
    <div className='container text-center'>
      <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/all.css"></link>

      {isLoading && (
        <BigLoader />
      )}

      <form onSubmit={handleRegisterUser} method='post'>
        <h1 className='mt-5'>Register</h1>

        <div className='mt-5'>
          <div className='col-sm-6 offset-sm-3 col-xs-12 mt-4'>
            <input
              type='email'
              className='form-control'
              placeholder='Email'
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
              placeholder='Teléfono'
              required
              name='phoneNumber'
              value={registerInput.phoneNumber}
              onChange={handleRegisterInput}
            />
          </div>

          <div className='col-sm-6 offset-sm-3 col-xs-12 mt-4'>
            <input
              type='text'
              className='form-control'
              placeholder='Nombre'
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
              placeholder='Contraseña'
              required
              name='firstPassword'
              value={registerInput.firstPassword}
              onChange={inputPasswordChange}
            />
          </div>

          <div className='col-sm-6 offset-sm-3 col-xs-12 mt-4'>
            <input
              type='password'
              className='form-control'
              placeholder='Confirmar contraseña'
              required
              name='secondPassword'
              value={registerInput.secondPassword}
              onChange={inputPasswordChange}
            />
          </div>

          <ul style={{listStyle: 'none'}} className='mt-3'>
            <li style={validLength ? {color: 'green'} : {color: 'red'}}>
              <i className="far fa-check-circle"></i> 
              <span>Longitud válida{/*: {validLength ? <span>True</span> : <span>False</span>}*/}</span>
            </li>
            <li style={hasNumber ? {color: 'green'} : {color: 'red'}}>
              <i className="far fa-check-circle"></i> 
              <span>Contiene un número{/*: {hasNumber ? <span>True</span> : <span>False</span>}*/}</span>
            </li>
            <li style={upperCase ? {color: 'green'} : {color: 'red'}}>
              <i className="far fa-check-circle"></i> 
              <span>Contiene una mayúscula{/*: {upperCase ? <span>True</span> : <span>False</span>}*/}</span>
            </li>
            <li style={lowerCase ? {color: 'green'} : {color: 'red'}}>
              <i className="far fa-check-circle"></i> 
              <span>Contiene una minúscula{/*: {lowerCase ? <span>True</span> : <span>False</span>}*/}</span>
            </li>
            <li style={specialChar ? {color: 'green'} : {color: 'red'}}>
              <i className="far fa-check-circle"></i> 
              <span>Contiene un carácter especial{/*: {specialChar ? <span>True</span> : <span>False</span>}*/}</span>
            </li>
            <li style={match ? {color: 'green'} : {color: 'red'}}>
              <i className="far fa-check-circle"></i> 
              <span>Las contraseñas coinciden{/*: {match ? <span>True</span> : <span>False</span>}*/}</span>
            </li>
          </ul>
        </div>

        <div className='mt-3'>
          <button
            type='submit'
            className='btn btn-warning'
            disabled={isLoading}
          >
            Register
          </button>
        </div>
      </form>

      <div className='col-sm-6 offset-sm-3 col-xs-12 mt-3 mb-5'>
        ¿Ya tienes una cuenta?&nbsp;&nbsp;
        <a
          style={{ textDecoration: 'none' }}
          className='btn-primary'
          role='button'
          onClick={() => navigate('/Login')}
        >
          Inicia sesión
        </a>
        &nbsp;para empezar a pedir 🍴
      </div>
    </div>
  )
}


export default Register