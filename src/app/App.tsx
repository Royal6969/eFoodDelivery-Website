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
  AllUsersOrders
} from '../pages';


function App() {
  // we habe to load the cart when the app is loaded
  const dispatch = useDispatch();

  // at this point, it's time to replace the static user id for the dynamic user id wich belong to the user who is logged in
  // so for that we will have to extract the authenticationStore with the useSelector() hook
  const userDataFromAuthenticationStore: UserInterface = useSelector((state: RootState) => state.authenticationStore);

  // next we need to get the cart first with the cartAPI and its query
  // in the begining, our userId was hardcoded as the parameter
  // but at this point, it's time to replace the static user id for the dynamic user id wich belong to the user who is logged in
  const { data, isLoading } = useGetCartQuery(userDataFromAuthenticationStore.userId);
  
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
    if (!isLoading) {
      // if the loading is complete, then we want to dispatch and set our shopping cart
      dispatch(setCart(data.result?.cartItemsList));
      console.log(data.result);
    }
  // and then when should they useEffect() be triggered, we can do that on isLoading or we can even say whenever the data is toggled
  }, [data]);
  // that way, when we update the cart, it automatically dispatches and sets the new cart


  return (
    <div>
      <Header />
        
        <div className="pb-5">
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='*' element={<NotFound />}></Route>
            
            <Route path='/Register' element={<Register />}></Route>
            <Route path='/Login' element={<Login />}></Route>
          
            <Route path='/ProductDetails/:productId' element={<ProductDetails />}></Route>
            <Route path='/Cart' element={<Cart />}></Route>
            <Route path='/PaymentDetails' element={<PaymentDetails />}></Route>
            <Route path='/order/OrderConfirmed/:orderId' element={<OrderConfirmed />}></Route>
            <Route path='/order/UserOrders' element={<UserOrders />}></Route>
            <Route path='/order/AllUsersOrders' element={<AllUsersOrders />}></Route>
            <Route path='/order/OrderDetails/:orderId' element={<OrderDetails />}></Route>

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