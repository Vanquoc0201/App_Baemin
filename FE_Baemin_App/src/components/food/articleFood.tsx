"use client";
import Image from "next/image";
import { useRouter } from "next/navigation"; 
import { TArticle } from "@/types/article/articleBaemin.type";
type TArticleProps = {
  food: TArticle;
};
export default function Article({ food }: TArticleProps) {
  const router = useRouter(); 
  const isOutOfStock = food.foodStock <= 0;

  const handleOrderClick = () => {
    router.push(`/createorder?foodId=${food.foodId}`);
  };

  return (
    <div className="rounded-2xl shadow-md p-4 bg-white w-full max-w-sm transition hover:shadow-lg flex flex-col justify-between">
      {/* Ảnh món ăn */}
      <div className="w-full h-48 relative rounded-xl overflow-hidden">
        <Image
          src={food.foodImage}
          alt={food.foodName}
          layout="fill"
          objectFit="cover"
        />
      </div>

      {/* Thông tin món ăn */}
      <div className="mt-4 space-y-1">
        <h2 className="text-lg font-semibold text-gray-800 line-clamp-1">
          {food.foodName}
        </h2>
        <p className="text-green-600 font-bold">
          {food.foodPrice.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          })}
        </p>
        <p className="text-sm text-gray-500">
          Còn lại:{" "}
          <span
            className={`font-medium ${
              isOutOfStock ? "text-red-500" : "text-black"
            }`}
          >
            {isOutOfStock ? "Hết hàng" : `${food.foodStock} phần`}
          </span>
        </p>
      </div>

      {/* Nút đặt hàng */}
      <button
        className="mt-4 w-full bg-[#00c7be] text-white py-2 px-4 rounded-lg disabled:bg-gray-300"
        disabled={isOutOfStock}
        onClick={handleOrderClick}
      >
        {isOutOfStock ? "Hết hàng" : "Đặt hàng"}
      </button>
    </div>
  );
}
