import React from 'react'


function BigLoader() {
  return (
    <div style={{ position: 'fixed', top: '0', left: '0', width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: '4rem', height: '4rem' }} className='spinner-border text-warning'>
        {' '}
      </div>
    </div>
  )
}


export default BigLoader