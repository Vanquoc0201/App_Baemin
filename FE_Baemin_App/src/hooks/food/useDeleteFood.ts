import { foodService } from "@/services/foodService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useDeleteFood = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (foodId: number) => await foodService.deleteFood(foodId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["foods"] });
      toast.success("Xóa món ăn thành công!");
    },
    onError: () => {
      toast.error("Xóa món ăn thất bại!");
    },
  });
};
