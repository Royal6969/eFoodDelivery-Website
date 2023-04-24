import { Route, Routes } from 'react-router-dom';
import { Footer, Header } from '../components/layout';
import { Home, NotFound, ProductDetails } from '../pages';


function App() {
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