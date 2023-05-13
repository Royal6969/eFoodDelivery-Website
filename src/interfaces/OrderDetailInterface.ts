import ProductInterface from "./ProductInterface"


export default interface OrderDetailInterface {
  md_uuid?: string
  md_date?: string
  orderDetailsId?: number
  orderId?: number
  itemId?: number
  itemQuantity?: number
  itemName?: string
  itemPrice?: number
  product?: ProductInterface
}