"use client";

import { useParams } from "next/navigation";
import { useGetDetailOrder } from "@/hooks/order/useGetDetailOrder";
import { formatCurrency } from "@/utils/format";

const OrderPage = () => {
  const params = useParams();
  const orderId = params?.id;

  const { data, isLoading, isError } = useGetDetailOrder(Number(orderId));

  if (isLoading) return <p>Đang tải chi tiết đơn hàng...</p>;
  if (isError || !data) return <p className="text-red-500">Không thể tải dữ liệu đơn hàng.</p>;

  const { items, totalPrice, status, createdAt } = data;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">
        Chi tiết đơn hàng #{orderId}
      </h1>

      <div className="bg-white shadow rounded p-4">
        <div className="mb-4">
          <p><strong>Trạng thái:</strong> {status}</p>
          <p><strong>Ngày đặt:</strong> {new Date(createdAt).toLocaleString("vi-VN")}</p>
        </div>

        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 text-left">Tên món</th>
              <th className="py-2 px-4 text-left">Số lượng</th>
              <th className="py-2 px-4 text-left">Đơn giá</th>
              <th className="py-2 px-4 text-left">Thành tiền</th>
            </tr>
          </thead>
          <tbody>
            {items?.map((item: any, index: number) => (
              <tr key={index} className="border-t">
                <td className="py-2 px-4">{item.foodName}</td>
                <td className="py-2 px-4">{item.quantity}</td>
                <td className="py-2 px-4">{formatCurrency(item.unitPrice)}</td>
                <td className="py-2 px-4">{formatCurrency(item.unitPrice * item.quantity)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-4 text-right font-semibold">
          Tổng tiền: {formatCurrency(totalPrice)}
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
