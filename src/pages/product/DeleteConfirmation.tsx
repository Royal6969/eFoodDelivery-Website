import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useDeleteProductByIdMutation, useGetProductByIdQuery } from '../../APIs/ProductAPI';
import { InputHelper, toastNotifyHelper } from '../../helperMethods';
import { checkAdminAuth } from '../../HOC';


function DeleteConfirmation() {
  // define useParams() hook to receive the productId through the route
  const { productId } = useParams();
  // once we have the productId, we need to call the query for GetProductById(productId)
  const { data } = useGetProductByIdQuery(productId);
  // console.log(data);

  // define useState() hook to set loading when this page needs
  const [isLoading, setIsLoading] = useState(false);
  // define useNavigate() hook to redirect admin user to AdminProductsList page once the new product object has been created
  const navigate = useNavigate();
  // define the mutation for DELETE endpoint to delete a product
  const [deleteProduct] = useDeleteProductByIdMutation();

  // useState for the input fields to delete a product writing its id
  const [deleteInput, setDeleteInput] = useState({
    id: ''
  });

  // now we have to use our helper method called InputHelper... copied/pasted from Register.tsx
  const handleDeleteInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const tempData = InputHelper(event, deleteInput);
    setDeleteInput(tempData);
  }

  const handleDeleteProduct = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    if (productId === deleteInput.id) {
      const deleteResponse = await deleteProduct(productId);

      if (deleteResponse) {
        setIsLoading(false);
        navigate('/product/AdminProductsList');
        toastNotifyHelper('Producto eliminado correctamente', 'success');
      }
    }
    else {
      toastNotifyHelper('El producto NO se ha eliminado', 'error');
      setIsLoading(false);
    }

    setIsLoading(false);
  }


  return (
    <div className='container mt-3 p-3 bg-light'>

      <h3 className='mb-3 px-2 text-warning'>
        ¿Estás seguro de que quieres eliminar este producto?
      </h3>
      
      {data && (
        <>
          <p>Nombre del producto: <span style={{color: 'red'}}>{data.result?.name}</span>&nbsp;</p>
          <p>ID del producto: <span style={{color: 'red'}}>{data.result?.id}</span>&nbsp;</p>
        </>
      )}

      <form method='post' encType='multipart/form-data' onSubmit={handleDeleteProduct}>
        <div className='row mt-3'>
          <div className='col-md-7'>
            <input
              type='text'
              className='form-control'
              placeholder='Id del Producto'
              required
              name='id'
              value={deleteInput.id}
              onChange={handleDeleteInput}
            />

          <div className='col-md-8 mt-3 text-center'>
            {data && (
              <img
                style={{ width: '100%', borderRadius: '30px' }}
                src={data.result?.image}
                alt=''
              />
            )}
          </div>

            <div className="row">
              <div className="col-6">
                <button
                  className='btn btn-warning mt-3 form-control'
                  type='submit'
                >
                  Eliminar
                </button>
              </div>

              <div className="col-6">
                <a 
                  className='btn btn-secondary mt-3 form-control' 
                  onClick={() => navigate('/product/AdminProductsList')}
                >
                  Volver a los productos
                </a>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}


export default checkAdminAuth(DeleteConfirmation)