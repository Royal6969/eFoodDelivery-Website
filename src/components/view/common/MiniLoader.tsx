import React from 'react'


function MiniLoader({ type = 'warning', size = '100' }) { // right here in the parameters, we can say the default type will be warning and size will be 100
  return (
    // here we can use dynamic text for the styles that we've set as parameters before
    <div style={{ scale: `${size}%` }} className={`spinner-border text-${type}`}>
      {' '}
    </div>
  )
}


export default MiniLoader