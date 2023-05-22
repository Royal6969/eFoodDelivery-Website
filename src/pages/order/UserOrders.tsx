import React from 'react'
import { checkCustomerAuth } from '../../HOC'
import { useSelector } from 'react-redux';
import { RootState } from '../../store/redux/ReduxStorage';
import { useGetOrdersFromUserQuery } from '../../APIs/OrderAPI';
import { OrdersList } from '../../components/view/orders';
import { BigLoader } from '../../components/view/common';


function UserOrders() {
  // here we can use the useSelector() hook to get the userId from the redux store
  const userId = useSelector((state: RootState) => state.authenticationStore.userId);
  // we need to save the result back from the query and define a flag for when it's loading the response
  const { data, isLoading } = useGetOrdersFromUserQuery({ userId });

  
  return (
    <>
      {isLoading && (
        <BigLoader />
      )}

      {!isLoading && (
        <>
          <div className='d-flex align-items-center justify-content-between mx-5 mt-5'>
            <h1 className="text-success">Mis pedidos</h1>
          </div>
          
          <OrdersList 
            // data={data.result}
            // after implementing pagination, we have an error here with data.result, 
            // because now in data we have the api response and that has all the order
            data={data?.apiDataResponse.result}
            isLoading={isLoading}
          />
        </>
      )}
    </>
  )
}


export default checkCustomerAuth(UserOrders)