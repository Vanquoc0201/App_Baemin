import { useMutation } from '@tanstack/react-query';
import orderService from '@/services/orderService';
import { CreateOrderPayload } from '@/types/order/order.type';

export const useOrderFood = () => {
  return useMutation({
    mutationFn: (data: CreateOrderPayload) => orderService.orderFood(data),
  });
};
