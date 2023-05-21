import React, { useState, useEffect } from 'react'
import { checkAdminAuth } from '../../HOC';
import { useGetOrdersFromUserQuery } from '../../APIs/OrderAPI';
import { OrdersList } from '../../components/view/orders';
import { BigLoader } from '../../components/view/common';
import { InputHelper } from '../../helperMethods';
import { StaticDetails_OrderStatus } from '../../Utils/StaticDetails';
import { OrderInterface } from '../../interfaces';


const inputFilterOptions = [
  'Todo',
  StaticDetails_OrderStatus.STATUS_CONFIRMED,
  StaticDetails_OrderStatus.STATUS_COOKING,
  StaticDetails_OrderStatus.STATUS_READY,
  StaticDetails_OrderStatus.STATUS_CANCELLED
];

function AllUsersOrders() {
  // we need to save the result back from the query and define a flag for when it's loading the response
  // we don't need the useSelector() hook here to retrieve the user stored, so instead passing a userId, we'll pass an empty string to fetch all orders of all users
  const { data, isLoading } = useGetOrdersFromUserQuery('');
  // define a local state to set the filters for when user click the search button
  const [searchFilters, setSearchFilters] = useState({ orderSearch: '', orderStatus: '' });
  // define another local state to store the filtered data for all the orders
  const [orderDataFiltered, setOrderDataFiltered] = useState([]);

  // we need to create a helper method to handle the changes in inputs
  const handleInputChanges = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const tempInputValues = InputHelper(event, searchFilters);
    setSearchFilters(tempInputValues);
  };

  // also we need to define another helper method to handle all the search filters selected when user click the search button
  const handleInputFilters = () => {
    const orderTempData = data.result.filter(
      (order: OrderInterface) => { // we will filter inside orders with name, email and phone
        if ((order.clientName && order.clientName.includes(searchFilters.orderSearch)) ||
            (order.clientEmail && order.clientEmail.includes(searchFilters.orderSearch)) ||
            (order.clientPhone && order.clientPhone.includes(searchFilters.orderSearch))
        ) {
          return order;
        }
      }
    );

    // then once we have the tempOrderData, we will apply the filter for our order status dropdown
    const finalOrdersArray = orderTempData.filter(
      (order: OrderInterface) =>
        searchFilters.orderStatus !== ''
          ? order.orderStatus === searchFilters.orderStatus
          : order
    );

    // and finally, whatever we have in the final array that we will set as the order data
    setOrderDataFiltered(finalOrdersArray);
  }

  // last thing that we have to do is when the data is modified, like in the initial fetch, 
  // then we want to useEffect() and set the order data with that data.result
  useEffect(() => {
    if (data) {
      setOrderDataFiltered(data.result);
    }

  }, [data]);
  
  
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
              <input 
                type='text' 
                className='form-control mx-2' 
                placeholder='Buscar por nombre, email o teléfono'
                name='orderSearch'
                onChange={handleInputChanges}
              />
            </div>

            <select 
              className='form-select w-50 mx-2'
              name='orderStatus'
              onChange={handleInputChanges}
            >
              {inputFilterOptions.map(
                (filterOption, index) => (
                  <option 
                    value={filterOption === 'Todo' ? '' : filterOption}
                    key={index}
                  >
                    {filterOption}
                  </option>
                )
              )}
            </select>

            <button className='btn btn-outline-warning' onClick={handleInputFilters}>Buscar</button>
          </div>
          
          <OrdersList 
            // data={data.result}
            data={orderDataFiltered}
            isLoading={isLoading}
          />
        </>
      )}
    </>
  )
}


export default checkAdminAuth(AllUsersOrders)