import React from 'react'
import { useGetProductsQuery } from '../../APIs/ProductAPI';
import { BigLoader } from '../../components/view/common';
import { ProductInterface } from '../../interfaces';


function AdminProductsList() {
  // copied/pasted from same functionality in ProductsList component
  const { data, isLoading } = useGetProductsQuery(null);


  return (
    <>
      {isLoading && (
        <BigLoader />
      )}

      {!isLoading && (
        <div className="table p-5">
          <div className="d-flex align-items-center justify-content-between">
            <h1 className="text-warning">Listado de productos</h1>
            <button className="btn btn-info">Nuevo producto</button>
          </div>
          
          <div className="p-2">
            <div className="row border">
              <div className="col-1">Imagen</div>
              <div className="col-1">ID</div>
              <div className="col-2">Nombre</div>
              <div className="col-2">Categoría</div>
              <div className="col-1">Precio</div>
              <div className="col-2">Etiqueta</div>
              <div className="col-3">Accciones</div>
            </div>
            
            {data.result.map(
              (product: ProductInterface) => {
                return (
                  <div className="row border" key={product.id}>
                    <div className="col-1">
                      <img style={{ width: "100%", maxWidth: "120px" }} src={product.image} alt='' />
                    </div>
                    <div className="col-1">{product.id}</div>
                    <div className="col-2">{product.name}</div>
                    <div className="col-2">{product.category}</div>
                    <div className="col-1">{product.price}€</div>
                    <div className="col-2">{product.tag}</div>
                    <div className="col-3">
                      <button className="btn btn-warning">
                        <i className="bi bi-pencil-fill"></i>
                      </button>
                      <button className="btn btn-danger mx-2">
                        <i className="bi bi-trash-fill"></i>
                      </button>
                    </div>
                  </div>
                )
              })
            }

          </div>
        </div>
      )}
    </>
  )
}


export default AdminProductsList