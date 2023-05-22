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
  // define a local state to set the filters for when user click the search button
  const [searchFilters, setSearchFilters] = useState({ orderSearch: '', orderStatus: '' });
  // define another local state to store the filtered data for all the orders
  const [orderDataFiltered, setOrderDataFiltered] = useState([]);
  // after passing the new parameters for filter in the get order mutation below
  // we realize now we're calling the API every time we type something we we want to avoid that with a local state
  // and call the API only when the button is clicked
  const [searchCallingApiFilters, setSearchCallingApiFilters] = useState({
    orderSearch: '',
    orderStatus: ''
  });
  // to implement pagination, we need one more state that basically store the total numbers of records (pageSize) and the number of page we're navigating (actualPage)
  const [recordsNumber, setRecordsNumber] = useState(0);  // total number of objects retrieved
  const [pageNumberAndSize, setPageNumberAndSize] = useState({
    actualPage: 1,  // page number that we're on
    pageSize: 5     // number of objects in each page
  });

  // we need to save the result back from the query and define a flag for when it's loading the response
  // we don't need the useSelector() hook here to retrieve the user stored, so instead passing a userId, we'll pass an empty string to fetch all orders of all users
  // const { data, isLoading } = useGetOrdersFromUserQuery('');
  const { data, isLoading } = useGetOrdersFromUserQuery({ // now we have to pass the object with userId, orderSearch and orderStatus
    // now when we're getting all the orders, we don't want to pass userId, but we want everything else 
    // and those filters are inside the setSearchFilters so we can navigate or rather spread the filter here
    // ...(searchFilters && {
    ...(searchCallingApiFilters && { 
      // before we used searchFilters to fetch locally, but now, and based on the API filters above this, we will fetch the data from our API
      orderSearch: searchCallingApiFilters.orderSearch,
      orderStatus: searchCallingApiFilters.orderStatus
    }) // if that is populated, then we want to pass the object with search string
  }); 

  // we need to create a helper method to handle the changes in inputs
  const handleInputChanges = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const tempInputValues = InputHelper(event, searchFilters);
    setSearchFilters(tempInputValues);
  };

  // also we need to define another helper method to handle all the search filters selected when user click the search button
  const handleInputFilters = () => {
    /*
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
    // setOrderDataFiltered(finalOrdersArray);
    */

    // now with searchCallingApiFilters, rather than we had before, I will set the api filters with the orderSearch and the orderStatus
    setSearchCallingApiFilters({
      orderSearch: searchFilters.orderSearch,
      orderStatus: searchFilters.orderStatus
    })
    // because if you examine searchFilters it's a controlled component, and we can set the api filters directly
    // and once that filters are modified, it will automatically re-fetch the data
  }

  // last thing that we have to do is when the data is modified, like in the initial fetch, 
  // then we want to useEffect() and set the order data with that data.result
  useEffect(() => {
    if (data) {
      // setOrderDataFiltered(data.result);
      // after implementing pagination, we have an error here with data.result, 
      // because now in data we have the api response and that has all the order
      setOrderDataFiltered(data.apiDataResponse.result);
      // console.log(data.recordsNumber);

      // now we have to extract the recordsNumber inside the api response, and we have to add that to the local state
      const { RecordsNumber } = JSON.parse(data.recordsNumber);
      setRecordsNumber(RecordsNumber);
      // console.log(recordsNumber);
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