import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom';
import { Footer, Header } from '../components/layout';
import { useDispatch, useSelector } from 'react-redux';
import { useGetCartQuery } from '../APIs/CartAPI';
import { setCart } from '../store/redux/CartSlice';
import { useEffect } from 'react';
import jwt_decode from "jwt-decode";
import { UserInterface } from '../interfaces';
import { setUserLogged } from '../store/redux/AuthenticationSlice';
import { RootState } from '../store/redux/ReduxStorage';
import { 
  AccessRefused, 
  AuthAdminTest, 
  AuthCustomerTest, 
  Cart, 
  Home, 
  Login, 
  NotFound, 
  OrderConfirmed, 
  UserOrders, 
  PaymentDetails, 
  ProductDetails, 
  Register, 
  OrderDetails,
  AllUsersOrders,
  AdminProductsList,
  ProductForm,
  DeleteProduct,
  AdminUsersList,
  DeleteUser,
  ForgetPassword,
  NewPassword,
  PasswordChanged,
  ResetCode
} from '../pages';


function App() {
  // we habe to load the cart when the app is loaded
  const dispatch = useDispatch();

  // at this point, it's time to replace the static user id for the dynamic user id wich belong to the user who is logged in
  // so for that we will have to extract the authenticationStore with the useSelector() hook
  const userDataFromAuthenticationStore: UserInterface = useSelector((state: RootState) => state.authenticationStore);

  // define a local state for skip the re-call request to the cart endpoint like I said below
  const [skipGetCart, setSkipGetCart] = useState(true);
  // now, based on the skip state, we can tell the query on when it should skip making a request

  // next we need to get the cart first with the cartAPI and its query
  // in the begining, our userId was hardcoded as the parameter
  // but at this point, it's time to replace the static user id for the dynamic user id wich belong to the user who is logged in
  const { data, isLoading } = useGetCartQuery(
    userDataFromAuthenticationStore.userId, 
    { skip: skipGetCart } // by default the value is true, but when the value is false, then it will go and fetch the query
  );
  // but if we check the network section from inspect, we notice we're calling twice to cart endpoint 
  // initially when the userId is empty, it's going to fetch a query with empty userId, 
  // but we don't want that, and because we have that using query here, we cannot add it inside if condition, because then things won't work
  // it has to be at the root level... and to fix that we have to add a local state to skip setting the cart
  
  // to avoid losing the Redux store content for the token decoded we have to repopulate with useEffect()
  // this useEffect() should be execute when the app is rendered
  useEffect(() => {
    // first we have to get the token from localStorage
    const userTokenFromLocalStorage = localStorage.getItem('token');

    // if the local token is populated then we have to extract that using jwt-decode
    if (userTokenFromLocalStorage) {
      const { fullName, userId, email, role }: UserInterface = jwt_decode(userTokenFromLocalStorage);
      // once we get all the values here, if we go to login, we have to dispatch and setUserLogged
      // call the authenticationSlice to populate the values inside the token decoded
      dispatch(setUserLogged({
        fullName,
        userId,
        email,
        role
      }));
    }
  }, []);

  // then we can hve the useEffect() once the loading is complete
  useEffect(() => {
    if (!isLoading && data) {
      // if the loading is complete, then we want to dispatch and set our shopping cart
      dispatch(setCart(data.result?.cartItemsList));
      // console.log(data.result);
    }
  // and then when should they useEffect() be triggered, we can do that on isLoading or we can even say whenever the data is toggled
  }, [data]);
  // that way, when we update the cart, it automatically dispatches and sets the new cart

  // we have to define another useEffect() to set true the setSkipGetCart
  useEffect(() => {
    if (userDataFromAuthenticationStore.userId) {
      setSkipGetCart(false);
    }
  }, [userDataFromAuthenticationStore]);

  return (
    <div>
      <Header />
        
        <div className="pb-5">
          <Routes>
            {/* Routes for Home and NotFound */}
            <Route path='/' element={<Home />}></Route>
            <Route path='*' element={<NotFound />}></Route>
            
            {/* Routes for Login and Register */}
            <Route path='/Register' element={<Register />}></Route>
            <Route path='/Login' element={<Login />}></Route>
          
            {/* Routes for ProductCard, the Cart and the PaymentDetails */}
            <Route path='/ProductDetails/:productId' element={<ProductDetails />}></Route>
            <Route path='/Cart' element={<Cart />}></Route>
            <Route path='/PaymentDetails' element={<PaymentDetails />}></Route>
            
            {/* Routes for Order pages */}
            <Route path='/order/OrderConfirmed/:orderId' element={<OrderConfirmed />}></Route>
            <Route path='/order/UserOrders' element={<UserOrders />}></Route>
            <Route path='/order/AllUsersOrders' element={<AllUsersOrders />}></Route>
            <Route path='/order/OrderDetails/:orderId' element={<OrderDetails />}></Route>
            
            {/* Routes for Product pages (for admin) */}
            <Route path='/product/AdminProductsList' element={<AdminProductsList />}></Route>
            <Route path='/product/ProductForm' element={<ProductForm />}></Route>
            <Route path='/product/ProductForm/:productId' element={<ProductForm />}></Route>
            <Route path='/product/DeleteProduct/:productId' element={<DeleteProduct />}></Route>
            
            {/* Routes for User pages (for admin) */}
            <Route path='/user/AdminUsersList' element={<AdminUsersList />}></Route>
            <Route path='/user/DeleteUser/:userId' element={<DeleteUser />}></Route>
            
            {/* Routes for reset password proccess */}
            <Route path='/forgetPassword/ForgetPassword' element={<ForgetPassword />}></Route>
            <Route path='/forgetPassword/NewPassword' element={<NewPassword />}></Route>
            <Route path='/forgetPassword/PasswordChanged' element={<PasswordChanged />}></Route>
            <Route path='/forgetPassword/ResetCode' element={<ResetCode />}></Route>

            {/* Routes for testing authentication and authorization and the AccessDenied */}
            <Route path='/AuthCustomerTest' element={<AuthCustomerTest />}></Route>
            <Route path='/AuthAdminTest' element={<AuthAdminTest />}></Route>
            <Route path='/AccessRefused' element={<AccessRefused />}></Route>
          </Routes>
        </div>
        
      <Footer />
    </div>
  );
}


export default App;