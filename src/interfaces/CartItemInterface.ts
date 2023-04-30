import ProductInterface from "./ProductInterface"


export default interface CartItemInterface {
  md_uuid?: string
  md_date?: string
  id?: number
  productId?: number
  quantity?: number
  // cartId?: number // we don't care about that by the moment
  product?: ProductInterface
}