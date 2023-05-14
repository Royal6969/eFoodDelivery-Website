import { StaticDetails_OrderStatus } from "../Utils/StaticDetails";
import CartInterface from "./CartInterface";

export default interface OrderRecapInterface {
  apiDataResult: {
    id?: number; // cart id
    cartItemsList?: CartInterface[];
    total?: number;
    userId?: string;
    paymentAttempId?: string;
    status?: StaticDetails_OrderStatus;
  };

  deliveryInput: {
    name: string;
    email: string;
    phone: string;
  };
}