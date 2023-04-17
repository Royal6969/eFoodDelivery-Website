import React, { useEffect, useState } from 'react'
import { ProductInterface } from '../../../interfaces';
import ProductCard from './ProductCard';


function ProductsList() {
  // I will create a local state here with the name of my products and the function that will set it will be setProducts
  // and it will be equal to an empty array
  const [products, setProducts] = useState<ProductInterface[]>([]); // we can define the type here for ProductInterface

  // after that we will use the useEffect hook and we will load that
  // we will have the arrow function here and right now we can use the default fetch function and there we have to pass the URL
  useEffect(() => {
    fetch("https://localhost:7240/api/Product") // we can get this URL from the API response when we execute the GET produt's endpoint
      // we have a promise here so we use then(), and when the fetch completes, we will be getting a response here,
      .then((response) => response.json()) // so we add the arrow function and we want to convert that to JSON
        // after that. we can add another then block here and we can get the data that is being retrieved
        .then((data) => { // and write a console.log to test if we're getting the products correctly
          console.log(data);
          setProducts(data.result); // setting the data with the useState
        })
  }, []); // when this useEffect needs to be executed, we will keep that empty. That way it will be executed evedry time the component renders

  
  return (
    <div className='container row'>
      {/* we want to work if the products length is greater that 0, and in that case, we want the conditional rendering and iterate through the products */}
      {products.length > 0 && products.map((product, index) => (
        // we have the product card here and we'll say product is equal to this product, we'll give a unique ID with index
        <ProductCard product={product} key={index} />
      ))}
    </div>
  )
}


export default ProductsList