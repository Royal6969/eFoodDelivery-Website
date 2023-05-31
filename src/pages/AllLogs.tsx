import React, { useState, useEffect } from 'react'
import { checkAdminAuth } from '../HOC'
import { StaticDetails_LogLevel } from '../Utils/StaticDetails';
import { useGetLogsQuery } from '../APIs/LoggerAPI';
import { InputHelper } from '../helperMethods';
import { BigLoader } from '../components/view/common';
import { LogsList } from '../components/view/logs';


const inputFilterOptions = [
  'Todo',
  StaticDetails_LogLevel.LOG_LEVEL_INFO,
  StaticDetails_LogLevel.LOG_LEVEL_WARN,
  StaticDetails_LogLevel.LOG_LEVEL_ERROR,
  StaticDetails_LogLevel.LOG_LEVEL_FATAL
];

function AllLogs() {
  // define a local state to set the filters for when user click the search button
  const [searchFilters, setSearchFilters] = useState({ logSearch: '', logLevel: '' });
  // define another local state to store the filtered data for all the logs
  const [logDataFiltered, setLogDataFiltered] = useState([]);
  // after passing the new parameters for filter in the get log mutation below
  // we realize now we're calling the API every time we type something we we want to avoid that with a local state
  // and call the API only when the button is clicked
  const [searchCallingApiFilters, setSearchCallingApiFilters] = useState({
    logSearch: '',
    logLevel: ''
  });
  // to implement pagination, we need one more state that basically store the total numbers of records, 
  // and the number of page we're navigating (actualPage) and its pageSize (number of records per page)
  const [recordsNumber, setRecordsNumber] = useState(0);  // total number of objects retrieved
  const [pageNumberAndSize, setPageNumberAndSize] = useState({
    actualPage: 1,   // page number that we're on
    pageSize: 10     // number of objects in each page
  });
  // define another local state for the current number of pageSize
  const [actualPageSize, setActualPageSize] = useState(pageNumberAndSize.pageSize);


  // we need to save the result back from the query and define a flag for when it's loading the response
  // we don't need the useSelector() hook here to retrieve the user stored, so instead passing a userId, we'll pass an empty string to fetch all logs of all users
  // const { data, isLoading } = useGetLogsQuery('');
  const { data, isLoading } = useGetLogsQuery({ // now we have to pass the object with userId, logSearch and logLevel
    // now when we're getting all the logs, we don't want to pass userId, but we want everything else 
    // and those filters are inside the setSearchFilters so we can navigate or rather spread the filter here
    // ...(searchFilters && {
    ...(searchCallingApiFilters && { 
      // before we used searchFilters to fetch locally, but now, and based on the API filters above this, we will fetch the data from our API
      // if that is populated, then we want to pass the object with search string
      logSearch: searchCallingApiFilters.logSearch,
      logLevel: searchCallingApiFilters.logLevel,
      // but when we're calling the all logs and loading the data here, I can also pass the actualPage and pageSize which are inside pageNumberAndSize
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
    // now with searchCallingApiFilters, rather than we had before, I will set the api filters with the logSearch and the logLevel
    setSearchCallingApiFilters({
      logSearch: searchFilters.logSearch,
      logLevel: searchFilters.logLevel
    })
    // because if you examine searchFilters it's a controlled component, and we can set the api filters directly
    // and once that filters are modified, it will automatically re-fetch the data
  }

  // last thing that we have to do is when the data is modified, like in the initial fetch, 
  // then we want to useEffect() and set the log data with that data.result
  useEffect(() => {
    if (data) {
      // setLogDataFiltered(data.result);
      // after implementing pagination, we have an error here with data.result, 
      // because now in data we have the api response and that has all the log
      setLogDataFiltered(data.apiDataResponse.result);
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
    // e.g. if actual page is 2, then this will be 1, multiply that by the page size, which is 10, and then we add 1, which is 11
    // so that means it's skipping the first 10 and the records are starting from the 11º record
    // and then we want to display that we're displaying records 11 to 20
    // for that we need the end number, which will basically be actual page, multiply by page size
    const endPageNumber = (pageNumberAndSize.actualPage) * (pageNumberAndSize.pageSize);
    // so on 2º page, the records will start from 11 and it will go till 20
    // I will return that, and I will display that using some complex string interpolation here
    return `${startPageNumber}-${(endPageNumber < recordsNumber) ? endPageNumber : recordsNumber} of ${recordsNumber}`;
    // basically I'm displaying the start number, but then the end number I'm only displaying if this is not the last page
  }

  // define another helper method to handle the pagination when user clicks in prev/next buttons
  // const handlePaginationForPrevOrNextButtons = (paginationToRightOrLeft: string) => {
  // but now we need to add the logic to set/change the pageSize, so let's rename this function
  const handlePaginationOptionsChanges = (paginationToRightOrLeft: string, pageSize?: number) => {
    // if we're setting the next one here, then we want to increment the actual page
    // if we're doing the previous one, then we want to decrement the actual page
    if (paginationToRightOrLeft === 'previous') {
      setPageNumberAndSize({
        actualPage: pageNumberAndSize.actualPage - 1,
        pageSize: 10
      });
    }
    else if (paginationToRightOrLeft === 'next') {
      setPageNumberAndSize({
        actualPage: pageNumberAndSize.actualPage + 1,
        pageSize: 10
      });
    }
    // let's add one more elseIf condition for pageSize
    else if (paginationToRightOrLeft === 'newPageSize') {
      setPageNumberAndSize({
        actualPage: 1,
        pageSize: pageSize // if pageSize it's not null, we will set that to be pageSize, else we will set that to be 10
          ? pageSize 
          : 10 
      });
    }
  }

  // define another helper method to handle the select dropdown changes for choose a pageSize
  const handlePageSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    handlePaginationOptionsChanges('newPageSize', Number(event.target.value));
    setActualPageSize(Number(event.target.value));
    // so whenever anything in the dropdown changes, we want to call the handlePaginationOptionsChanges with the value of change
    // that is exactly what we added here and we have to pass the pageSize and the actualPage
    // we don't want to toggle the pageSize, we only want to change the number here, so that is what we're setting in the value
    // after that we're setting the local state for the actual page size
  };
  
  
  return (
    <>
      {isLoading && (
        <BigLoader />
      )}

      {!isLoading && (
        <>
          <div className='d-flex align-items-center justify-content-between mx-5 mt-5'>
            <h1 className="text-success w-50">Lista de registros</h1>

            <div style={{ width: '40%' }} className='d-flex'>
              <input 
                type='text' 
                className='form-control mx-2' 
                placeholder='Buscar por registro'
                name='logSearch'
                onChange={handleInputChanges}
              />
            </div>

            <select 
              className='form-select w-50 mx-2'
              name='logLevel'
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
          
          <LogsList 
            data={logDataFiltered}
            isLoading={isLoading}
          />

          <div className="d-flex mx-5 justify-content-end align-items-center mb-3">
            <div>Logs por página:</div>

            <div>
              <select 
                style={{ width: '80px' }}
                className='form-select mx-2'
                value={actualPageSize}
                onChange={handlePageSizeChange}
              >
                <option>10</option>
                <option>15</option>
                <option>20</option>
                <option>25</option>
              </select>
            </div>

            <div className="mx-2">
              {getActualStartEndPageNumbers()}
            </div>

            <button 
              className='btn btn-outline-primary px-3 mx-2' 
              disabled={pageNumberAndSize.actualPage === 1} // disable if you are in the first page
              onClick={() => handlePaginationOptionsChanges('previous')}
            >
              <i className="bi bi-chevron-left"></i>
            </button>

            <button 
              className='btn btn-outline-primary px-3 mx-2' 
              disabled={(pageNumberAndSize.actualPage * pageNumberAndSize.pageSize) >= recordsNumber} // disable if you are in the last page
              onClick={() => handlePaginationOptionsChanges('next')}
            >
              <i className="bi bi-chevron-right"></i>
            </button>
          </div>
        </>
      )}
    </>
  )
}


export default checkAdminAuth(AllLogs)