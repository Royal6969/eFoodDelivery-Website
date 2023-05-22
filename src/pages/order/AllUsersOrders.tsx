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
      // if that is populated, then we want to pass the object with search string
      orderSearch: searchCallingApiFilters.orderSearch,
      orderStatus: searchCallingApiFilters.orderStatus,
      // but when we're calling the all orders and loading the data here, I can also pass the actualPage and pageSize which are inside pageNumberAndSize
      pageNumber: pageNumberAndSize.actualPage,
      pageSize: pageNumberAndSize.pageSize
    })
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

  // define a helper method to get the pagination details for the actualPage number, the StartPage number and the endPage number
  const getActualStartEndPageNumbers = () => {
    const startPageNumber = (pageNumberAndSize.actualPage - 1) * (pageNumberAndSize.pageSize +1);
    // e.g. if actual page is 1, then this will be 0, multiply that, but the start number will be 1
    // e.g. if actual page is 2, then this will be 1, multiply that by the page size, which is 5, and then we add 1, which is 6
    // so that means it's skipping the first 5 and the records are starting from the 6º record
    // and then we want to display that we're displaying records 6 to 10
    // for that we need the end number, which will basically be actual page, multiply by page size
    const endPageNumber = (pageNumberAndSize.actualPage) * (pageNumberAndSize.pageSize);
    // so on 2º page, the records will start from 6 and it will go till 10
    // I will return that, and I will display that using some complex string interpolation here
    return `${startPageNumber}-${(endPageNumber < recordsNumber) ? endPageNumber : recordsNumber} of ${recordsNumber}`;
    // basically I'm displaying the start number, but then the end number I'm only displaying if this is not the last page
  }

  // define another helper method to handle the pagination when user clicks in prev/next buttons
  const handlePaginationForPrevOrNextButtons = (paginationToRightOrLeft: string) => {
    // if we're setting the next one here, then we want to increment the actual page
    // if we're doing the previous one, then we want to decrement the actual page
    if (paginationToRightOrLeft === 'previous') {
      setPageNumberAndSize({
        actualPage: pageNumberAndSize.actualPage - 1,
        pageSize: 5
      });
    }
    else if (paginationToRightOrLeft === 'next') {
      setPageNumberAndSize({
        actualPage: pageNumberAndSize.actualPage + 1,
        pageSize: 5
      });
    }
  }
  
  
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

          <div className="d-flex mx-5 justify-content-end align-items-center">
            <div className="mx-2">
              {getActualStartEndPageNumbers()}
            </div>

            <button 
              className='btn btn-outline-primary px-3 mx-2' 
              disabled={pageNumberAndSize.actualPage === 1} // disable if you are in the first page
              onClick={() => handlePaginationForPrevOrNextButtons('previous')}
            >
              <i className="bi bi-chevron-left"></i>
            </button>

            <button 
              className='btn btn-outline-primary px-3 mx-2' 
              disabled={(pageNumberAndSize.actualPage * pageNumberAndSize.pageSize) >= recordsNumber} // disable if you are in the last page
              onClick={() => handlePaginationForPrevOrNextButtons('next')}
            >
              <i className="bi bi-chevron-right"></i>
            </button>
          </div>
        </>
      )}
    </>
  )
}


export default checkAdminAuth(AllUsersOrders)