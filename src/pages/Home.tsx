import React from 'react'
import { ProductsList } from '../components/view/products'
import { Banner } from '../components/view/common'


function Home() {
  return (
    <div>
      <Banner />

      <div className='container p-2'>
        <ProductsList />
      </div>
    </div>
  )
}


export default Home