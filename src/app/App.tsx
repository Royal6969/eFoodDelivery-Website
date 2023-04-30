import { Route, Routes } from 'react-router-dom';
import { Footer, Header } from '../components/layout';
import { Home, NotFound, ProductDetails } from '../pages';
import { useDispatch } from 'react-redux';
import { useGetCartQuery } from '../APIs/CartAPI';
import { setCart } from '../store/redux/CartSlice';
import { useEffect } from 'react';


function App() {
  // we habe to load the cart when the app is loaded
  const dispatch = useDispatch();
  // next we need to get the cart first with the cartAPI and its query
  const { data, isLoading } = useGetCartQuery('26c2a46a-5fa6-43c1-8765-f96cc07d85bb'); // our userId hardcoded as the parameter
  
  // then we can hve the useEffect() once the loading is complete
  useEffect(() => {
    if (!isLoading) {
      // if the loading is complete, then we want to dispatch and set our shopping cart
      dispatch(setCart(data.result?.cartItems));
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
            <Route path='/ProductDetails/:productId' element={<ProductDetails />}></Route>
          </Routes>
        </div>
        
      <Footer />
    </div>
  );
}


export default App;