import React from 'react'
import { checkCustomerAuth } from '../HOC'


function AuthCustomerTest() {
  return (
    <div>Esta página es accesible por cualquier cliente <i>(usuario registrado)</i></div>
  )
}


export default checkCustomerAuth(AuthCustomerTest)