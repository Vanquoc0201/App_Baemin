import { foodService } from "@/services/foodService";
import { useQuery } from "@tanstack/react-query";


export const useCategory = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async() => {
        const res = await foodService.getCategory();
        const categoryArray = res.data.data;
        return categoryArray;
    },
  });
};
