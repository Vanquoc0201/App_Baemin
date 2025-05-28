import { useState } from "react";
import { foodService } from "@/services/foodService";

export const useSearchFood = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (query: string) => {
    try {
      setLoading(true);
      setError(null);
      const res = await foodService.searchFood(query)
      console.log(res);
      const foodArray = res.data
      setResults(foodArray);
    } catch (err: any) {
      setError("Lỗi khi tìm kiếm sản phẩm");
    } finally {
      setLoading(false);
    }
  };

  return {
    results,
    loading,
    error,
    handleSearch,
  };
};
