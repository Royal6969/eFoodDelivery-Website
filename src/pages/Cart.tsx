import React from 'react'
import { CartRecap } from '../components/view/cart'


function Cart() {
  return (
    <div style={{ marginTop: '10px' }} className='row w-100'>
      <div style={{ fontWeight: 300 }} className='col-lg-6 col-12'>
        <CartRecap />
      </div>

      <div className='col-lg-6 col-12 p-4'>
        Detalles del usuario
      </div>
    </div>
  )
}


export default Cart