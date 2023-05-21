import React from 'react'
import { checkAdminAuth } from '../../HOC';
import { useGetOrdersFromUserQuery } from '../../APIs/OrderAPI';
import { OrdersList } from '../../components/view/orders';
import { BigLoader } from '../../components/view/common';


function AllUsersOrders() {
  // we need to save the result back from the query and define a flag for when it's loading the response
  // we don't need the useSelector() hook here to retrieve the user stored, so instead passing a userId, we'll pass an empty string to fetch all orders of all users
  const { data, isLoading } = useGetOrdersFromUserQuery('');

  
  return (
    <>
      {isLoading && (
        <BigLoader />
      )}

      {!isLoading && (
        <>
          <div className='d-flex align-items-center justify-content-between mx-5 mt-5'>
            <h1 className="text-success w-50">Lista de pedidos</h1>

            <div style={{ width: '40%' }} className='d-flex'>
              <input type='text' className='form-control mx-2' placeholder='Buscar por nombre, email o teléfono' />
            </div>

            <select className='form-select w-50 mx-2'>
              <option value="Todo">Todo</option>
            </select>

            <button className='btn btn-outline-warning'>Buscar</button>
          </div>
          
          <OrdersList 
            data={data.result}
            isLoading={isLoading}
          />
        </>
      )}
    </>
  )
}


export default checkAdminAuth(AllUsersOrders)