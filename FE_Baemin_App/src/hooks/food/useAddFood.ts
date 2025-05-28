
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { foodService } from "@/services/foodService";
import { toast } from "react-toastify";

export const useAddFood = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: FormData) => foodService.addFood(formData),
    onSuccess: () => {
      toast.success("Thêm món ăn thành công!");
      queryClient.invalidateQueries({ queryKey: ["foods"] });
    },
    onError: () => {
      toast.error("Thêm món ăn thất bại. Vui lòng thử lại.");
    },
  });
};
