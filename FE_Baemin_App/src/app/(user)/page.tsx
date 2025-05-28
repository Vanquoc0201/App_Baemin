"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Article from "@/components/food/articleFood";
import CategoryList from "@/components/food/categoryList";
import { useGetFood } from "@/hooks/food/useGetFood";
import { useSearchFood } from "@/hooks/food/useSearchFood";

export default function HomePage() {
  const searchParams = useSearchParams();
  const keyword = searchParams.get("foodName") || "";

  const { data: foods, isLoading, isError } = useGetFood();
  const {
    results: searchResults,
    loading: searchLoading,
    error: searchError,
    handleSearch,
  } = useSearchFood();

  useEffect(() => {
    if (keyword) {
      handleSearch(keyword);
    }
  }, [keyword]);

  const foodData = keyword ? searchResults : foods;
  const loading = keyword ? searchLoading : isLoading;
  const error = keyword ? searchError : isError;

  return (
    <main className="max-w-6xl mx-auto px-4 py-8 space-y-10">
      {/* 🧑‍🍳 Header chào mừng */}
      <header className="text-center space-y-2 mt-10">
        <h1 className="text-3xl font-bold text-green-600">Chào bạn 👋</h1>
        <p className="text-gray-600 text-lg">Chào mừng đến với ứng dụng gợi ý món ăn hàng ngày!</p>
        <p className="text-sm text-gray-500 italic">Bạn muốn ăn gì hôm nay?</p>
      </header>

      {/* 🥗 Danh mục món ăn */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">Danh mục món ăn</h2>
        <CategoryList />
      </section>

      {/* 🍜 Gợi ý hôm nay hoặc kết quả tìm kiếm */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">
          {keyword ? `Kết quả tìm kiếm cho "${keyword}"` : "Gợi ý hôm nay"}
        </h2>

        {loading && (
          <p className="text-gray-500">Đang tải danh sách món ăn...</p>
        )}
        {error && (
          <p className="text-red-500">Không tìm thấy món ăn. Xin vui lòng thử lại</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {foodData?.map((food, index) => (
            <Article key={index} food={food} />
          ))}
        </div>
      </section>
    </main>
  );
}
