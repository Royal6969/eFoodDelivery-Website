import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetProductByIdQuery } from '../APIs/ProductAPI';
import { useUpdateCartMutation } from '../APIs/CartAPI';
import { BigLoader, MiniLoader } from '../components/view/common';
import { ApiResponse, UserInterface } from '../interfaces';
import { toastNotifyHelper } from '../helperMethods';
import { RootState } from '../store/redux/ReduxStorage';
import { useSelector } from 'react-redux';


function ProductDetails() {
  // the fact that we will be using useParams() hook here is because if you examine the product card when we're passing the details,
  // like we're passing the product.id we have to catch it
  // but one thing you should remember is where we have defined the route inside our App, we use the variable with the name :productId
  // so that name must match with the name that we're using here to retrieve the parameters
  const { productId } = useParams();
  // now we have to use our second redux query to fetch the specific product
  const { data, isLoading } = useGetProductByIdQuery(productId);
  // console.log(data);

  const navigate = useNavigate(); // to back to home button functionality
  const [quantity, setQuantity] = useState(1); // to manage the counter and minimal quantity is 1

  // dummy function with useState() hook to handle the items quantity for the product and no count below than minimal 1
  const handleCounterQuantity = (counter: number) => {
    let updatedQuantity = quantity + counter;
    if (updatedQuantity == 0)
      updatedQuantity = 1;

    setQuantity(updatedQuantity);
    return;
  }

  // we can use another useState() hook to show the loader when an item is being added to the cart
  const [isAddedToCart, setIsAddedToCart] = useState<boolean>(false);
  // next thing that we want is the mutation, the function or method that will be returned from the mutation
  // to invoke that I will give that the name of updateCart and it will be equal to the mutation
  const [updateCart] = useUpdateCartMutation();

  // when the user clicks the AddToCart button, we have to check if inside the Redux store, if userId is populated, that means that user is logged in
  // so far that we will have to extract the authenticationStore with the useSelector() hook
  const userDataFromAuthenticationStore: UserInterface = useSelector((state: RootState) => state.authenticationStore);

  
  // so when the AddToCart button will be clicked, we will have to invoke this updateCart method and there we will have to pass the three parameters
  const handleAddToCart =async (productId: number) => { // it's async because we will be calling the mutation and we will have to wait for a response
    // if inside the user data the userId is not populated, we want to navigate to the login page
    if (!userDataFromAuthenticationStore.userId) {
      navigate('/Login');
      return null;
    }

    setIsAddedToCart(true);

    // quantity will be inside the quantity counter local state that we have, so we don't have to pass that as a parameter
    // and the userId we're using the hardcoded string for now --> user ADMIN --> userId: 26c2a46a-5fa6-43c1-8765-f96cc07d85bb
    const cartResponse: ApiResponse = await updateCart({
      productId: productId,
      updateQuantity: quantity,
      userId: '26c2a46a-5fa6-43c1-8765-f96cc07d85bb'
    });
    // console.log(cartResponse);

    // if cartResponse.data is populated and success flag is true, let's invoke a toast notification
    if (cartResponse.data && cartResponse.data.success) {
      toastNotifyHelper('Producto añadido al carrito correctamente');
    }

    setIsAddedToCart(false);
  }

  // to control the isLoading, instead use another flag like we did in ProductList, now we're going to use a conditional rendering
  return (
    <div className="container pt-4 pt-md-5">

      {/* conditional rendering for isLoading */}
      {!isLoading 
        // if it's not loading then we want to display all the product details
        ? (
          <div className="row">
            <div className="col-7">
              <h2 className="text-warning">
                { data.result?.name }
              </h2>
              
              <span>
                <span className="badge text-bg-dark pt-2" style={{ height: "40px", fontSize: "20px" }}>
                  { data.result?.category }
                </span>
              </span>

              <span>
                <span className="badge text-bg-light pt-2" style={{ height: "40px", fontSize: "20px" }}>
                  { data.result?.tag }
                </span>
              </span>
              
              <p style={{ fontSize: "20px" }} className="pt-2">
                { data.result?.description }
              </p>
              
              <span className="h3">
                { data.result?.price }€  
              </span> &nbsp;&nbsp;&nbsp;
              
              <span className="pb-2  p-3" style={{ border: "1px solid #333", borderRadius: "30px" }}>
                <i 
                  className="bi bi-dash p-1" 
                  style={{ fontSize: "25px", cursor: "pointer" }}
                  onClick={() => {
                    handleCounterQuantity(-1); // custom helper method
                  }}
                ></i>
                <span className="h3 mt-3 px-3">
                  { quantity }
                </span>
                <i 
                  className="bi bi-plus p-1" 
                  style={{ fontSize: "25px", cursor: "pointer" }}
                  onClick={() => {
                    handleCounterQuantity(+1); // custom helper method
                  }}
                ></i>
              </span>
              
              <div className="row pt-4">
                <div className="col-5">
                  {isAddedToCart
                    ? (
                      <button className='btn btn-warning form-control' disabled>
                        <MiniLoader type='danger' />
                      </button>
                    )
                    : (
                      <button 
                        className="btn btn-warning form-control"
                        onClick={() => handleAddToCart(data.result?.id)}
                      >
                        Add to Cart
                      </button>
                    )
                  }
                </div>

                <div className="col-5 ">
                  <button className="btn btn-secondary form-control" onClick={() => navigate(-1)}> {/* this is like the history.go(-1) */}
                    Back to Home
                  </button>
                </div>
              </div>
            </div>
            
            <div className="col-5">
              <img src={ data.result.image } width="100%" style={{ borderRadius: "50%" }} alt="No content" />
            </div>
          </div>
        )
        // else we want to display a <div> with the text of loading
        : (
          <div className='d-flex justify-content-center' style={{ width: "100%" }}>
            {/* <div>Loading product details...</div> */}
            <BigLoader />
          </div>
        )
      }

    </div>
  )
}


export default ProductDetails