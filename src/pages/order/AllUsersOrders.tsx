import React from 'react'
import { checkCustomerAuth } from '../../HOC'
import { useSelector } from 'react-redux';
import { RootState } from '../../store/redux/ReduxStorage';
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
        <OrdersList 
          data={data.result}
          isLoading={isLoading}
        />
      )}
    </>
  )
}


export default checkCustomerAuth(AllUsersOrders)