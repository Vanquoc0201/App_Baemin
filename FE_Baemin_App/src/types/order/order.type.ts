export interface OrderItem {
  foodId: number;
  quantity: number;
}

export interface CreateOrderPayload {
  userId: number;
  items: OrderItem[];
  shipperName: string;
  address: string;
}
