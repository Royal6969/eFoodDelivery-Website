import React, { useEffect, useState } from 'react'
import { ProductInterface } from '../../../interfaces';
import ProductCard from './ProductCard';
import { useGetProductsQuery } from '../../../APIs/ProductAPI';
import { useDispatch } from 'react-redux';
import { setProduct } from '../../../store/redux/ProductSlice';


function ProductsList() {
  // I will create a local state here with the name of my products and the function that will set it will be setProducts
  // and it will be equal to an empty array
  // const [products, setProducts] = useState<ProductInterface[]>([]); // we can define the type here for ProductInterface

  // after that we will use the useEffect hook and we will load that
  // we will have the arrow function here and right now we can use the default fetch function and there we have to pass the URL
  /*
  useEffect(() => {
    fetch("https://efooddelivery-api.azurewebsites.net/api/Product") // we can get this URL from the API response when we execute the GET produt's endpoint
      // we have a promise here so we use then(), and when the fetch completes, we will be getting a response here,
      .then((response) => response.json()) // so we add the arrow function and we want to convert that to JSON
        // after that. we can add another then block here and we can get the data that is being retrieved
        .then((data) => { // and write a console.log to test if we're getting the products correctly
          console.log(data);
          setProducts(data.result); // setting the data with the useState
        })
  }, []); // when this useEffect needs to be executed, we will keep that empty. That way it will be executed evedry time the component renders
  */
  
  // after we created and configure our first Redux Query to fetch the products,
  // now we want to extract the data, and we're going to extract the "isLoading" flag from useGetProductsQuery
  const { data, isLoading } = useGetProductsQuery(null); // remember we had not parameters so we can set it as null, and this line will automatically be execute
  // what we want to do is when isLoading is false, then we want to set the product in our store where we have the product slice so we want to invoke the setProduct
  // so now we don't need the local state before (comment it for the moment) and let's remove the actual useEffect() content

  // for that we will have to add the import for dispath hook and we will have to create a constant for dispatch
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLoading) { // that means the data is populated using the redux query, it has fetched it from our API
      // so if that is populated then, we want to dispatch an event to populate or rather call the setProduct
      dispatch(setProduct(data.result)); // when we're dispatching, we need the payload, and that payload will be reiceived in data.result
    }
  // now with this new useEffect() that we have, we don't want it to load every time the component is rendered
  }, [isLoading]); // we only want it to be execute when the value os isLoading is updated
  
  // note that initially, data will not have all the value because it's still loading that using the query right now, so data will be undefined
  // one way to handle this exception that we have, is we can add a condition here
  if (isLoading) {
    return (
      <div>
        Loading products ...
      </div>
    )
  }

  return (
    <div className='container row'>
      {/* we want to work if the products length is greater that 0, and in that case, we want the conditional rendering and iterate through the products */}
      {/* {products.length > 0 && products.map((product, index) => (
        // we have the product card here and we'll say product is equal to this product, we'll give a unique ID with index
        <ProductCard product={product} key={index} />
      ))} */}

      {data.result.length > 0 && data.result.map(
        // but now Typescript doesn't know what is the type here
        (product: ProductInterface, index: number) => ( // so it says you can write any here, but we know product will be of type ProductInterface and the index will be a Number
          <ProductCard product={product} key={index} />
        )
      )}
    </div>
  )
}


export default ProductsList