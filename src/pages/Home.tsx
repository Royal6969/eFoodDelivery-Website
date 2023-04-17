import React from 'react'
import { ProductsList } from '../components/view/products'


function Home() {
  return (
    <div>
      <div className='container p-2'>
        <ProductsList />
      </div>
    </div>
  )
}


export default Home