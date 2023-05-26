import React from 'react'
import { BigLoader } from '../common'
import { OrderInterface } from '../../../interfaces'
import OrdersListInterface from '../../../interfaces/OrdersListInterface'
import { useNavigate } from 'react-router-dom'
import { getOrderStatusColor } from '../../../helperMethods'


function OrdersList({ data, isLoading }: OrdersListInterface) {
  // we need the useNavigate() hook for the "Details" button in ecah order row
  const navigate = useNavigate();


  return (
    <>
      {isLoading && (
        <BigLoader />
      )}

      {!isLoading && (
        <div className="table p-4">
          <div className="p-2">
            <div className="row border">
              <div className="col-1">ID</div>
              <div className="col-2">Nombre</div>
              <div className="col-2">Email</div>
              <div className="col-1">Teléfono</div>
              <div className="col-1">Total</div>
              <div className="col-1">Productos</div>
              <div className="col-1">Fecha</div>
              <div className="col-2">Estado</div>
              <div className="col-1"></div>
            </div>
            
            {data.map(
              (order: OrderInterface) => {
                // calling our getOrderStatusColor helper method to change dynamically the status for the order status column
                const orderStatusTagTypeColor = getOrderStatusColor(order.orderStatus!);

                return (
                  <div className="row border" key={order.orderId}>
                    <div className="col-1">{order.orderId}</div>
                    <div className="col-2 text-break">{order.clientName}</div>
                    <div className="col-2 text-break">{order.clientEmail}</div>
                    <div className="col-1">{order.clientPhone}</div>
                    <div className="col-1">{order.orderTotal!.toFixed(2)}€</div>
                    <div className="col-1">{order.orderQuantityItems}</div>
                    <div className="col-1">{new Date(order.orderDate!).toLocaleDateString()}</div>
                    <div className="col-2">
                      <span className={`badge bg-${orderStatusTagTypeColor}`}>{order.orderStatus}</span>
                    </div>
                    <div className="col-1">
                      <button 
                        className="btn btn-warning"
                        onClick={() => navigate('/order/OrderDetails/' + order.orderId)}
                      >
                        Detalles
                      </button>
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