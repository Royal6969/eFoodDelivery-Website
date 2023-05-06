import React from 'react'
import { checkAdminAuth } from '../HOC'


function AuthAdminTest() {
  return (
    <div>Esta página sólo es accesible por los administradores</div>
  )
}


export default checkAdminAuth(AuthAdminTest)