"use client";

import { useCategory } from "@/hooks/food/useCategory";
import { FoodCategory } from "@/types/article/foodCategory";

export default function CategoryList() {
  const { data: categories, isLoading, isError } = useCategory();

  if (isLoading) return <p>Đang tải danh mục...</p>;
  if (isError) return <p>Lỗi khi tải danh mục</p>;

  return (
    <div className="space-y-2">
      <h2 className="text-lg font-semibold">Danh mục thức ăn</h2>
      <ul className="flex flex-wrap gap-2">
        {categories?.map((category : FoodCategory, index:number) => (
          <li
            key={index}
            className="px-4 py-2 bg-emerald-100 rounded-full text-sm text-gray-700 hover:bg-emerald-200 cursor-pointer"
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
}
