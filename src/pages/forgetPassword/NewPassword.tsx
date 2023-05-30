import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { InputHelper, toastNotifyHelper } from '../../helperMethods';
import { useChangeUserPasswordMutation } from '../../APIs/AuthenticationAPI';
import { ApiResponse } from '../../interfaces';
import { BigLoader } from '../../components/view/common';


function NewPassword() {
  // we are looking for the apiDataResult and deliveryInput, and from where we want that, we want to extract that from useLocation() hook
  // that will make sure that whatever we're passing in the state when we navigate it's extracted and automatically populated
  const {
    state: {
      responseInput
    }
  } = useLocation();

  const [loading, setLoading] = useState(false);
  // define useNavigate() hook to redirect user to Home page when user is logged
  const navigate = useNavigate();

  // also we need a useState for the input field to write an email address
  const [newPasswordInput, setNewPasswordInput] = useState({
    password: '',
    confirmPassword: ''
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
    setNewPasswordInput({
      ...newPasswordInput,
      [name]: value
    })
  }

  useEffect(() => {
    setValidLength(newPasswordInput.password.length >= requiredLength ? true : false);
    setUpperCase(newPasswordInput.password.toLowerCase() !== newPasswordInput.password);
    setLowerCase(newPasswordInput.password.toUpperCase() !== newPasswordInput.password);
    setHasNumber(/\d/.test(newPasswordInput.password));
    setMatch(!!newPasswordInput.password && newPasswordInput.password === newPasswordInput.confirmPassword)
    setSpecialChar(/[ `!@#$%^&*()_+\-=\]{};':"\\|,.<>?~]/.test(newPasswordInput.password));

  }, [newPasswordInput, requiredLength]);
  
  /************************************************************************************************************************* */

  // now we have to use our helper method called InputHandler
  const handleNewPasswordInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const tempData = InputHelper(event, newPasswordInput);
    setNewPasswordInput(tempData);
  }

  // define mutation to invoke it on form submit
  const [changePassword] = useChangeUserPasswordMutation();

  const handleNewPasswordCode = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    //console.log(responseInput);

    if (!validLength) {
      toastNotifyHelper('La contraseña debe contener 8 caracteres como mínimo', 'error');
      setLoading(false);
    }
    else if (!lowerCase) {
      toastNotifyHelper('La contraseña debe contener al menos 1 minúscula', 'error');
      setLoading(false);
    }
    else if (!upperCase) {
      toastNotifyHelper('La contraseña debe contener al menos 1 mayúscula', 'error');
      setLoading(false);
    }
    else if (!hasNumber) {
      toastNotifyHelper('La contraseña debe contener al menos 1 número', 'error');
      setLoading(false);
    }
    else if (!specialChar) {
      toastNotifyHelper('La contraseña debe contener al menos 1 carácter especial', 'error');
      setLoading(false);
    }
    else if (!match) {
      toastNotifyHelper('Las contraseñas no coinciden', 'error');
      setLoading(false);
    }
    else if (validLength && hasNumber && upperCase && lowerCase && specialChar && match) {
      const newPasswordResponse: ApiResponse = await changePassword({
        email: responseInput.email,
        code: responseInput.code,
        password: newPasswordInput.password
        // all of these values will be populated inside the loginInput because we have the control component
      });
  
      // one we invoke the endpoint, we have to examine the response that result
      if (newPasswordResponse.data?.statusCode == 200) { // if loginResponse.data, if that is populated, let's check what happens 
        // console.log(loginResponse.data);
        
        toastNotifyHelper('Contraseña cambiada correctamente.');
  
        // redirect user to Home page
        navigate('/Login');
      }
      else if (newPasswordResponse.error) {
        // console.log(loginResponse.error.data.errorsList[0]);
        // setErrorMessage(loginResponse.error.data.errorsList[0]);
        toastNotifyHelper(newPasswordResponse.error.data.errorsList[0], 'error');
      }
    }

    setLoading(false);
  }


  return (
    <div className="container container-fp">
      <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/all.css"></link>

      {loading && (
        <BigLoader />
      )}

      <div className="row">
        <div className="col-md-4 offset-md-4 form">

          <form onSubmit={handleNewPasswordCode} method="POST">
            <h2 className="text-center">Nueva contraseña</h2>

            <div className="form-group">
              <input 
                type='password'
                className='form-control'
                placeholder='Contraseña'
                required
                name='password'
                value={newPasswordInput.password}
                // onChange={handleNewPasswordInput}
                onChange={inputPasswordChange}
              />
            </div>

            <div className="form-group mt-1">
              <input 
                type='password'
                className='form-control'
                placeholder='Confirmar contraseña'
                required
                name='confirmPassword'
                value={newPasswordInput.confirmPassword}
                // onChange={handleNewPasswordInput}
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


export default NewPassword