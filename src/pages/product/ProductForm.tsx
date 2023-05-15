import React, { useState } from 'react'
import { checkAdminAuth } from '../../HOC'
import { InputHelper } from '../../helperMethods';


function ProductForm() {
  // useState for the input fields to create/edit a product... copied/paste from Register.tsx
  const [productInputs, setProductInputs] = useState({
    name: '',
    description: '',
    tag: '',
    category: '',
    price: ''
  });

  // now we have to use our helper method called InputHandler... copied/pasted from Register.tsx
  const handleProductInputs = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const tempData = InputHelper(event, productInputs);
    setProductInputs(tempData);
  }

  return (
    <div className='container p-3'>
      <h3 className='offset-2 px-2 text-warning'>Añadir producto</h3>
      
      <form method='post' encType='multipart/form-data'>
        <div className='row mt-3'>
          <div className='col-md-5 offset-2'>
            <input
              type='text'
              className='form-control'
              placeholder='Nombre'
              required
              name='name'
              value={productInputs.name}
              onChange={handleProductInputs}
            />
            
            <textarea
            style={{ resize: 'none' }}
              className='form-control mt-3'
              placeholder='Descripción'
              rows={5}
              name='description'
              value={productInputs.description}
              onChange={handleProductInputs}
            ></textarea>
            
            <input
              type='text'
              className='form-control mt-3'
              placeholder='Etiqueta'
              name='tag'
              value={productInputs.tag}
              onChange={handleProductInputs}
            />
            
            <input
              type='text'
              className='form-control mt-3'
              placeholder='Categoría'
              name='category'
              value={productInputs.category}
              onChange={handleProductInputs}
            />
            
            <input
              type='number'
              className='form-control mt-3'
              required
              placeholder='Precio'
              name='price'
              value={productInputs.price}
              onChange={handleProductInputs}
            />
            
            <input type='file' className='form-control mt-3' />
            
            <div className='text-center'>
              <button
                style={{ width: '50%' }}
                className='btn btn-warning mt-5'
                type='submit'
              >
                Guardar
              </button>
            </div>
          </div>
          
          <div className='col-md-5 text-center'>
            <img
              style={{ width: '100%', borderRadius: '30px' }}
              src='https://via.placeholder.com/150'
              alt=''
            />
          </div>
        </div>
      </form>
    </div>
  )
}


export default checkAdminAuth(ProductForm)