import OrderDetailInterface from "./OrderDetailInterface"


export default interface OrderInterface {
  md_uuid?: string
  md_date?: string
  orderId?: number
  clientName?: string
  clientPhone?: string
  clientEmail?: string
  clientId?: string
  orderTotal?: number
  orderDate?: string
  orderPaymentID?: string
  orderStatus?: string
  orderQuantityItems?: number
  user?: any
  orderDetails?: OrderDetailInterface[]
}