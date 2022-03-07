export interface Order {
  [x: string]: any;
  id: number;
  date: string;
  customerId: number;
  productId: number;
}

export interface OrderDetail extends Order{
  customerName?: string;
  productName?: string;
}
