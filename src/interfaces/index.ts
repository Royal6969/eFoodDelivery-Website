import ApiResponse from "./ApiInterface";
import ProductInterface from "./ProductInterface";
import CartInterface from "./CartInterface";
import CartItemInterface from "./CartItemInterface";
import UserInterface from "./UserInterface";
import OrderRecapInterface from "./OrderRecapInterface";


export type { // we have to add the right type here because we are explicity exporting the type
  ApiResponse, 
  ProductInterface, 
  CartInterface, 
  CartItemInterface, 
  UserInterface,
  OrderRecapInterface
}