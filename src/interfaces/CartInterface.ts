import CartItemInterface from "./CartItemInterface"


export default interface CartInterface {
  md_uuid?: string
  md_date?: string
  id?: number
  userId?: string
  total?: number
  paymentAttempId?: any
  clientSecret?: any
  cartItemsList?: CartItemInterface[]
}