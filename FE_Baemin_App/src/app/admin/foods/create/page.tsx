"use client";

import { useState } from "react";
import { useAddFood } from "@/hooks/food/useAddFood";
import { useRouter } from "next/navigation";

const CreateFood = () => {
  const router = useRouter();
  const { mutate: addFood, isPending } = useAddFood();

  const [formDataState, setFormDataState] = useState({
    foodName: "",
    foodPrice: "" as unknown as number,
    foodStock: "" as unknown as number,
    foodDescription: "",
    categoryId: "1",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormDataState((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setImageFile(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageFile) {
      alert("Vui lòng chọn hình ảnh trước khi thêm món ăn.");
      return;
    }

    const formData = new FormData();
    formData.append("foodName", formDataState.foodName);
    formData.append("foodPrice", String(formDataState.foodPrice));
    formData.append("foodStock", String(formDataState.foodStock));
    formData.append("foodDescription", formDataState.foodDescription);
    formData.append("categoryId", formDataState.categoryId);
    formData.append("foodImage", imageFile); // <-- File ảnh

    addFood(formData, {
      onSuccess: () => {
        router.push("/admin/foods");
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md space-y-4"
    >
      <h2 className="text-xl font-semibold mb-4">Thêm món ăn mới</h2>

      <label className="block text-sm font-medium text-gray-700">
        Tên món ăn
      </label>
      <input
        name="foodName"
        type="text"
        value={formDataState.foodName}
        onChange={handleChange}
        required
        className="w-full border rounded p-2"
      />

      <label className="block text-sm font-medium text-gray-700">
        Chọn ảnh món ăn
      </label>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        required
        className="w-full border rounded p-2"
      />

      <label className="block text-sm font-medium text-gray-700">
        Giá món ăn (VNĐ)
      </label>
      <input
        name="foodPrice"
        type="number"
        value={formDataState.foodPrice || ""}
        onChange={handleChange}
        required
        className="w-full border rounded p-2"
      />

      <label className="block text-sm font-medium text-gray-700">
        Số lượng trong kho
      </label>
      <input
        name="foodStock"
        type="number"
        value={formDataState.foodStock || ""}
        onChange={handleChange}
        required
        className="w-full border rounded p-2"
      />

      <label className="block text-sm font-medium text-gray-700">
        Mô tả món ăn
      </label>
      <textarea
        name="foodDescription"
        value={formDataState.foodDescription}
        onChange={handleChange}
        required
        className="w-full border rounded p-2"
      />

      <label className="block text-sm font-medium text-gray-700">
        Loại món ăn
      </label>
      <select
        name="categoryId"
        value={formDataState.categoryId}
        onChange={handleChange}
        required
        className="w-full border rounded p-2"
      >
        <option value="1">Đồ ăn nhanh</option>
        <option value="2">Thức uống</option>
        <option value="3">Món chay</option>
        <option value="4">Đồ ngọt</option>
        <option value="5">Món ăn vặt</option>
      </select>

      <button
        type="submit"
        disabled={isPending}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        {isPending ? "Đang thêm..." : "Thêm món ăn"}
      </button>
    </form>
  );
};

export default CreateFood;
