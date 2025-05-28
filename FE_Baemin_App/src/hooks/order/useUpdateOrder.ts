import { useMutation } from '@tanstack/react-query';
import orderService from '@/services/orderService';
import { DeliveriesStatus } from '@/types/order/status.type';


interface UpdateOrderParams {
  deliveryId: number;
  status: DeliveriesStatus;
}
  
export const useUpdateOrder = () => {
  return useMutation({
    mutationFn: ({ deliveryId, status }: UpdateOrderParams) =>
      orderService.updateOrderStatus(deliveryId, status),
  });
};
