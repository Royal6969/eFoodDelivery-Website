import React from 'react'
import { BigLoader } from '../common'
import { OrderInterface } from '../../../interfaces'
import OrdersListInterface from '../../../interfaces/OrdersListInterface'


function OrdersList({ data, isLoading }: OrdersListInterface) {
  return (
    <>
      {isLoading && (
        <BigLoader />
      )}

      {!isLoading && (
        <div className="table p-5">
          <h1 className="text-success">Lista de pedidos</h1>
          
          <div className="p-2">
            <div className="row border">
              <div className="col-1">ID</div>
              <div className="col-3">Nombre</div>
              <div className="col-2">Teléfono</div>
              <div className="col-1">Total</div>
              <div className="col-1">Productos</div>
              <div className="col-2">Fecha</div>
              <div className="col-2"></div>
            </div>
            
            {data.map(
              (order: OrderInterface) => {
                return (
                  <div className="row border" key={order.orderId}>
                    <div className="col-1">{order.orderId}</div>
                    <div className="col-3">{order.clientName}</div>
                    <div className="col-2">{order.clientPhone}</div>
                    <div className="col-1">{order.orderTotal!.toFixed(2)}€</div>
                    <div className="col-1">{order.orderQuantityItems}</div>
                    <div className="col-2">{new Date(order.orderDate!).toLocaleDateString()}</div>
                    
                    <div className="col-2">
                      <button className="btn btn-warning">Details</button>
                    </div>
                  </div>
                )
              }
            )}

          </div>
        </div>
      )}
    </>
  )
}

export default OrdersList