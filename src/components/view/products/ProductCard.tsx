import React, { useState } from 'react'
import { ProductInterface } from '../../../interfaces'
import { Link } from 'react-router-dom';
import { useUpdateCartMutation } from '../../../APIs/CartAPI';


// right now we're only passing product, but we might also be passing more things along the road
// like we're using typescript it's better to define a type for this prop here
function ProductCard(props: Props) { // right here we have to write the product will be getting props
  // we can use useState() hook to show the loader when an item is being added to the cart
  const [isAddedToCart, setIsAddedToCart] = useState<boolean>(false);
  // next thing that we want is the mutation, the function or method that will be returned from the mutation
  // to invoke that I will give that the name of updateCart and it will be equal to the mutation
  const [updateCart] = useUpdateCartMutation();
  
  // so when the AddToCart button will be clicked, we will have to invoke this updateCart method and there we will have to pass the three parameters
  const handleAddToCart =async (productId: number) => { // it's async because we will be calling the mutation and we will have to wait for a response
    setIsAddedToCart(true);

    // quantity will be inside the quantity counter local state that we have, so we don't have to pass that as a parameter
    // and the userId we're using the hardcoded string for now --> user ADMIN --> userId: 26c2a46a-5fa6-43c1-8765-f96cc07d85bb
    const response = await updateCart({
      productId: productId,
      updateQuantity: 1, // the only thing that we have to change is quantity that it will be always 1 by initial default
      userId: '26c2a46a-5fa6-43c1-8765-f96cc07d85bb'
    });
    console.log(response);

    setIsAddedToCart(false);
  }

  return (
    <div className='col-md-4 col-12 p-4'>
      {/* *********************************************** PRODUCT CARD STARTS ************************************************ */}
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
                <div style={{ scale: '100%' }} className={'spinner-border text-warning'}></div>
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
            <h4>{props.product.price}€</h4>
          </div>
        </div>
      </div>
      {/* *********************************************** PRODUCT CARD STARTS ************************************************ */}
    </div>
  )
}


export default ProductCard


// so I'll define a local interface here called Props
interface Props {
    product: ProductInterface;
}