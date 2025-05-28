import { useQuery } from "@tanstack/react-query";
import { foodService } from "@/services/foodService";
import { TArticle } from "@/types/article/articleBaemin.type";

export const useGetFood = () => {
  return useQuery<TArticle[]>({
    queryKey: ["foods"],
    queryFn: async () => {
      const res = await foodService.getAllFood();
      const foodArray = res.data.data;
      return foodArray;
    },
  });
};
