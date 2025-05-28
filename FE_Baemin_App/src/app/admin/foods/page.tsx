"use client";

import { useDeleteFood } from "@/hooks/food/useDeleteFood";
import { useGetFood } from "@/hooks/food/useGetFood";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";

const ListFood = () => {
  const { data: foods, isLoading, isError } = useGetFood();
  const { mutate: deleteFood } = useDeleteFood();
  if (isLoading) return <p className="text-gray-500">Đang tải dữ liệu món ăn...</p>;
  if (isError) return <p className="text-red-500">Lỗi khi tải dữ liệu món ăn.</p>;

  const handleDelete = (id: number) => {
    deleteFood(id, {
      onSuccess: () => {
        toast.success("Đã xóa thành công!");
      }
    });
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Danh sách món ăn</h2>
        <Link href="/admin/foods/create">
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            + Thêm món ăn
          </button>
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">#</th>
              <th className="px-4 py-2 text-left">Hình ảnh</th>
              <th className="px-4 py-2 text-left">Tên món</th>
              <th className="px-4 py-2 text-left">Mô tả</th>
              <th className="px-4 py-2 text-left">Giá</th>
              <th className="px-4 py-2 text-left">Tồn kho</th>
              <th className="px-4 py-2 text-left">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {foods?.map((food, index) => (
              <tr key={food.foodId} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">
                  <Image
                    src={food.foodImage}
                    alt={food.foodName}
                    width={60}
                    height={60}
                    className="rounded object-cover"
                  />
                </td>
                <td className="px-4 py-2">{food.foodName}</td>
                <td className="px-4 py-2">{food.foodDescription}</td>
                <td className="px-4 py-2">{food.foodPrice.toLocaleString()}₫</td>
                <td className="px-4 py-2">{food.foodStock}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleDelete(+food.foodId)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListFood;
