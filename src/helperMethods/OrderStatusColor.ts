import { StaticDetails_OrderStatus } from "../Utils/StaticDetails";


const getOrderStatusColor = (orderStatus: StaticDetails_OrderStatus) => {
  return orderStatus === StaticDetails_OrderStatus.STATUS_CONFIRMED ? 'primary'
       : orderStatus === StaticDetails_OrderStatus.STATUS_PENDING   ? 'secondary'
       : orderStatus === StaticDetails_OrderStatus.STATUS_CANCELLED ? 'danger'
       : orderStatus === StaticDetails_OrderStatus.STATUS_COMPLETED ? 'success'
       : orderStatus === StaticDetails_OrderStatus.STATUS_COOKING   ? 'info'
       : orderStatus === StaticDetails_OrderStatus.STATUS_READY    && 'warning'
}


export default getOrderStatusColor