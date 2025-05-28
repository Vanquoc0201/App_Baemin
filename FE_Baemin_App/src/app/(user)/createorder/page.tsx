"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import { foodService } from "@/services/foodService";
import orderService from "@/services/orderService";
import { useRouter } from 'next/navigation';
import { ACCESS_TOKEN, DOMAIN, MODULEPAYMENT, PAYMENT } from "@/constant/app.constant";
export default function CreateOrderPage() {
  const searchParams = useSearchParams();
  const foodId = searchParams.get("foodId");
  const router = useRouter(); 
  const [food, setFood] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);
  const [shipperName, setShipperName] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (foodId) {
      foodService.getDetailFood(+foodId).then(setFood);
    }
  }, [foodId]);

  const handleOrder = async () => {
    if (!food) return;
    setLoading(true);
    try {
      await orderService.orderFood({
        userId: 1,
        shipperName,
        address,
        items: [{ foodId: food.foodId, quantity }],
      });
      const response = await fetch(`${DOMAIN}/${MODULEPAYMENT}/${PAYMENT}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ACCESS_TOKEN}`
      },
      body: JSON.stringify({
        amount: food.foodPrice * quantity,
        description: "Thanh toan don hang",
        returnUrl: "https://yourdomain.vercel.app/payment/success",
        cancelUrl: "https://yourdomain.vercel.app/payment/cancel",
        buyerInfo: {
          name: shipperName,
          email: "vovanquoc0201@email.com",
          phone: "0342701549",
          address: address
        },
        items: [
          {
            name: food.foodName,
            quantity,
            price: food.foodPrice
          }
        ]
      }),
    });

    const data = await response.json();
    const checkoutUrl = data?.data?.data?.checkoutUrl;

    if (checkoutUrl) {
      window.location.href = checkoutUrl;
    } else {
      throw new Error("Không lấy được link thanh toán");
    }
    } catch (err) {
      toast.error("Đặt hàng thất bại. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  if (!food) return <p className="text-center mt-10">Đang tải món ăn...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg mt-20 flex flex-col md:flex-row gap-6">
      {/* Hình ảnh món ăn */}
      <div className="w-full md:w-1/2 relative h-64 md:h-auto rounded-xl overflow-hidden">
        <Image
          src={food.foodImage}
          alt={food.foodName}
          layout="fill"
          objectFit="cover"
          className="rounded-xl"
        />
      </div>

      {/* Form đặt hàng */}
      <div className="w-full md:w-1/2 space-y-4">
        <h1 className="text-2xl font-bold text-gray-800">{food.foodName}</h1>

        <p className="text-lg text-green-600 font-semibold">
          {food.foodPrice.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          })}
        </p>

        <div className="flex items-center gap-3">
          <span className="font-medium">Số lượng:</span>
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
          >
            -
          </button>
          <span className="text-lg">{quantity}</span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
          >
            +
          </button>
        </div>

        <div>
          <label className="block mb-1 font-medium text-sm text-gray-700">Tên người giao hàng</label>
          <input
            type="text"
            value={shipperName}
            onChange={(e) => setShipperName(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-sm text-gray-700">Địa chỉ giao hàng</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
          />
        </div>

        <button
          onClick={handleOrder}
          disabled={loading}
          className="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 rounded transition"
        >
          {loading ? "Đang đặt hàng..." : "Xác nhận đặt hàng"}
        </button>
      </div>
    </div>
  );
}
