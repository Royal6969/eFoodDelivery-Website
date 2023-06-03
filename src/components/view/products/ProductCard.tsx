import React, { useState } from 'react'
import { ApiResponse, ProductInterface, UserInterface } from '../../../interfaces'
import { Link, useNavigate } from 'react-router-dom';
import { useUpdateCartMutation } from '../../../APIs/CartAPI';
import { MiniLoader } from '../common';
import { toastNotifyHelper } from '../../../helperMethods';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/redux/ReduxStorage';


// right now we're only passing product, but we might also be passing more things along the road
// like we're using typescript it's better to define a type for this prop here
function ProductCard(props: Props) { // right here we have to write the product will be getting props
  // we can use useState() hook to show the loader when an item is being added to the cart
  const [isAddedToCart, setIsAddedToCart] = useState<boolean>(false);

  // next thing that we want is the mutation, the function or method that will be returned from the mutation
  // to invoke that I will give that the name of updateCart and it will be equal to the mutation
  const [updateCart] = useUpdateCartMutation();
  
  // to navigate to login page in case user data doesn't populated
  const navigate = useNavigate();

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
      updateQuantity: 1, // the only thing that we have to change is quantity that it will be always 1 by initial default
      userId: userDataFromAuthenticationStore.userId
    });
    // console.log(cartResponse);

    // if cartResponse.data is populated and success flag is true, let's invoke a toast notification
    if (cartResponse.data && cartResponse.data.success) {
      toastNotifyHelper('Producto añadido al carrito correctamente');
    }

    setIsAddedToCart(false);
  }

  return (
    <div className='col-md-4 col-12 p-4'>
      <div className='card' style={{ boxShadow: '0 1px 7px 0 rgb(0 0 0 / 50%)' }}>
        <div className='card-body pt-2'>
         
          <div className='row col-10 offset-1 p-4'>
            <Link to={`/ProductDetails/${props.product.id}`}> {/* note that the route here is dynamic for the product ID */}
              <img src={props.product.image} style={{ borderRadius: '50%' }} className='w-100 mt-5 image-box' alt='' />
            </Link>
          </div>

          {/* in teh case we've got more than one tag, we need to define a consitional rendering */}
          {props.product.tag && props.product.tag.length > 0 && (
            <i className='bi bi-star btn btn-warning'
              style={{ position: 'absolute', top: '15px', left: '15px', padding: '5px 10px', borderRadius: '3px', outline: 'none !important', cursor: 'pointer', }}
            >
              &nbsp; {props.product.tag}
            </i>
          )}

          {/* if isAddedToCart is true, we want to display some loader here, else we want to display the button */}
          {isAddedToCart
            ? (
              <div style={{ position: 'absolute', top: '15px', right: '15px' }}>
                <MiniLoader />
              </div>
            )
            : (
              <i className='bi bi-cart-plus btn btn-outline-danger'
                style={{ position: 'absolute', top: '15px', right: '15px', padding: '5px 10px', borderRadius: '3px', outline: 'none !important', cursor: 'pointer', }}
                onClick={() => handleAddToCart(props.product.id)}
              ></i>
            )
          }

          <div className='text-center'>
            <p className='card-title m-0 text-warning fs-3'>
              <Link to={`/ProductDetails/${props.product.id}`} style={{ textDecoration: 'none', color: '#ffbd40'}}> {/* note that the route here is dynamic for the product ID */}
                {props.product.name}
              </Link>
            </p>
            <p className='badge bg-secondary' style={{ fontSize: '12px' }}>
              {props.product.category}
            </p>
          </div>
          <p className='card-text' style={{ textAlign: 'center' }}>
            {props.product.description}
          </p>
          <div className='row text-center'>
            <h4>{props.product.price.toFixed(2)}€</h4>
          </div>
        </div>
      </div>
    </div>
  )
}


export default ProductCard


// so I'll define a local interface here called Props
interface Props {
    product: ProductInterface;
}