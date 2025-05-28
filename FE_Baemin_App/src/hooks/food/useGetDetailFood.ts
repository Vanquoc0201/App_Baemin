import { useQuery } from "@tanstack/react-query";
import { foodService } from "@/services/foodService";

export const useGetDetailFood = (foodId: number) => {
  return useQuery({
    queryKey: ["food-detail", foodId],
    queryFn: () => foodService.getDetailFood(foodId),
    enabled: !!foodId, 
  });
};
