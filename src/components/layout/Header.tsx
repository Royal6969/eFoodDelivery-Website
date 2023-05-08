import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { RootState } from '../../store/redux/ReduxStorage';
import { useDispatch, useSelector } from 'react-redux';
import { CartItemInterface, UserInterface } from '../../interfaces';
import { initialUserEmptyState, setUserLogged } from '../../store/redux/AuthenticationSlice';

let appLogo = require('../../assets/images/eFoodDeliveryLogo.png');


function Header() {
  // to call the setUserLogged slice and set it empty
  const dispatch = useDispatch();
  // to redirect user to login page
  const navigate = useNavigate();

  // to show the number of items in the cart, we have to retrieve the cartItems from the redux storage like we did in the CartRecap component
  // to access to our redux store, we have a hook called useSelector() that is inside the React Redux library
  // and here, basically we will be extracting that from the store
  const cartFromReduxStorage: CartItemInterface[] = useSelector(
    // then we have to define the state
    (state: RootState) => state.cartStore.cartItemsList ?? [] // and if it's null, return an empty array
  );

  // to alternate between show/hide the logout-register-login buttons
  // in our authenticationSlice we have the user details that are stored in setUserLogged
  // we will retrieve that and we will add it like we're retrieving the cartStore
  // we will also retrieve the userData from authenticationStore
  const userData: UserInterface = useSelector(
    (state: RootState) => state.authenticationStore
  );

  const handleLogoutUser = () => {
    // remove the token in localStorage
    localStorage.removeItem('token');
    // call the setUserLogged slice to set its initial state empty
    dispatch(setUserLogged({ ...initialUserEmptyState })); // distructuring technique
    // redirect user to home page
    navigate('/');
  }


  return (
    <div>
      <nav style={{background:'#ffbd40'}} className='navbar navbar-expand-lg text-black'>
        <div className='container-fluid'>
          <NavLink className='nav-link' aria-current='page' to='/'>
            <img src={appLogo} style={{height:'40px'}} className='m-1' alt='' />
          </NavLink>
          
          <button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbarSupportedContent' aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='Toggle navigation'>
            <span className='navbar-toggler-icon'></span>
          </button>
          
          <div className='collapse navbar-collapse' id='navbarSupportedContent'>
            <ul className='navbar-nav me-auto mb-2 mb-lg-0 w-100'>
              <li className='nav-item'>
                <NavLink className='nav-link' aria-current='page' to='/'>
                  Home
                </NavLink>
              </li>

              <li className='nav-item'>
                <NavLink className='nav-link' aria-current='page' to='/Cart'>
                  <i className='bi bi-cart4' style={{ fontSize: '16.5px' }}>
                    {/* **** conditional rendering to display the counter products badge **** */}
                    {userData.userId && (
                      <span  style={{ fontSize: '10px' }} className='translate-middle badge rounded-circle border border-light bg-danger'>
                        {/* we can check the lenght of cart from redux storage and display items accordingly */}
                        {cartFromReduxStorage?.length
                          ? `${cartFromReduxStorage.length}`
                          : ('')
                        }
                      </span>
                    )}
                  </i>
                </NavLink>
              </li>

            {/* 
              <li className='nav-item'>
                <NavLink className='nav-link' aria-current='page' to='/AuthCustomerTest'>
                  AuthCustomerTest
                </NavLink>
              </li>

              <li className='nav-item'>
                <NavLink className='nav-link' aria-current='page' to='/AuthAdminTest'>
                  AuthAdminTest
                </NavLink>
              </li> 
            */}

              <li className='nav-item dropdown'>
                <a className='nav-link dropdown-toggle' href='#' role='button' data-bs-toggle='dropdown' aria-expanded='false'>
                  Admin
                </a>
                <ul className='dropdown-menu'>
                  <li><a className='dropdown-item' href='#'>Action</a></li>
                  <li><a className='dropdown-item' href='#'>Another action</a></li>
                  <li><a className='dropdown-item' href='#'>Something else here</a></li>
                </ul>
              </li>
              
              <div style={{ marginLeft: 'auto' }} className='d-flex'>
                {userData.userId && (
                  <>
                    <li className='nav-item'>
                      <button style={{ cursor: 'pointer', background: 'transparent', border: '0' }} className='nav-link active'>
                        Hola, {userData.fullName}
                      </button>
                    </li>

                    <li className='nav-item'>
                      <button 
                        style={{ border: 'none', width: '100px', height: '40px' }} 
                        className='btn btn-secondary btn-outlined rounded-pill text-white mx-2'
                        onClick={handleLogoutUser}
                      >
                        Logout
                      </button>
                    </li>
                  </>
                )}

                {!userData.userId && (
                  <>
                    <li className='nav-item text-white'>
                      <NavLink className='nav-link' to='/Register'>
                        Register
                      </NavLink>
                    </li>

                    <li className='nav-item text-white'>
                      <NavLink 
                        style={{ border: 'none', width: '100px', height: '40px' }} 
                        className='btn btn-success btn-outlined rounded-pill text-white mx-2' 
                        to='/Login'
                      >
                        Login
                      </NavLink>
                    </li>
                  </>
                )}
              </div>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}


export default Header