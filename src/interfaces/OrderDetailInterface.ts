import ProductInterface from "./ProductInterface"


export default interface OrderDetailInterface {
  md_uuid?: string
  md_date?: string
  orderDetailsId?: number
  orderId?: number
  productId?: number
  quantity?: number
  name?: string
  price?: number
  product?: ProductInterface
}