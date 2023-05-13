import OrderInterface from "./OrderInterface";


export default interface OrdersListInterface {
  data: OrderInterface[];
  isLoading: boolean;
}