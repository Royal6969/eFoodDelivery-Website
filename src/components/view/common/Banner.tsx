import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setProductSearch } from '../../../store/redux/ProductSlice';


function Banner() {
  // define a local state with the name of value for the searchBox
  const [searchInput, setSearchInput] = useState('');
  // define the useDispatch() hook to call the productSearch in product reducers
  const dispatch = useDispatch();

  const handleProductSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    // whenever the serach input updates, we want to dispatch productSearch event
    dispatch(setProductSearch(event.target.value));
    // save the input value in the local state
    setSearchInput(event.target.value);
  }


  return (
    <div className='custom-banner'>
      <div style={{ width: '400px', height: '30vh' }} className='m-auto d-flex align-items-center'>
        <div className='d-flex align-items-center' style={{ width: '100%' }}>
          <input
            type={'text'}
            style={{ width: '100%', padding: '20px 20px' }}
            className='form-control rounded-pill'
            placeholder='Busca tus platos favoritos 😋'
            value={searchInput}
            onChange={handleProductSearch}
          />

          <span style={{ position: 'relative', left: '-43px' }}>
            <i className='bi bi-search'></i>
          </span>
        </div>
      </div>
    </div>
  )
}


export default Banner