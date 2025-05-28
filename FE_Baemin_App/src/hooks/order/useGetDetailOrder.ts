import { useQuery } from "@tanstack/react-query";
import orderService from "@/services/orderService";

export const useGetDetailOrder = (orderId: number) => {
  return useQuery({
    queryKey: ["order-detail", orderId],
    queryFn: async () => {
      const res = await orderService.getDetailOrder(orderId);
      console.log(res);
      
      return res?.data?.data; 
    },
    enabled: !!orderId,
  });
};
