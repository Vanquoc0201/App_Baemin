"use client";

import { useState } from "react";
import Link from "next/link";
import { useGetOrders } from "@/hooks/order/useGetOrders";
import { useUpdateOrder } from "@/hooks/order/useUpdateOrder";
import { DeliveriesStatus } from "@/types/order/status.type";
import { toast } from "react-toastify";
const statuses = [
  { label: "Đang chờ", value: "pending" },
  { label: "Đang giao", value: "shipping" },
  { label: "Đã giao", value: "delivered" },
  { label: "Đã hủy", value: "canceled" },
];

const getStatusStyle = (status: string) => {
  switch (status) {
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "shipping":
      return "bg-blue-100 text-blue-800";
    case "delivered":
      return "bg-green-100 text-green-800";
    case "canceled": 
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};


const Dashboard = () => {
  const [selectedStatus, setSelectedStatus] = useState<string>("pending");
  const { mutate: updateOrderStatus, isPending } = useUpdateOrder();
  const { orders, loading, error } = useGetOrders(selectedStatus);
  const handleUpdateStatus = (deliveryId: number, status: string) => {
    updateOrderStatus(
      { deliveryId, status: status as DeliveriesStatus },
      {
        onSuccess: () => {
          toast.success("Cập nhật trạng thái đơn hàng thành công");
        },
        onError: (error) => {
          toast.error("Cập nhật trạng thái đơn hàng thất bại");
          console.error(error);
        }
      }
    );
  };
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Danh sách đơn hàng</h2>

      <div className="mb-4">
        <label htmlFor="status" className="mr-2 font-medium">Trạng thái đơn:</label>
        <select
          id="status"
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="border rounded px-3 py-1"
        >
          {statuses.map((status) => (
            <option key={status.value} value={status.value}>
              {status.label}
            </option>
          ))}
        </select>
      </div>

      {loading && <p className="text-gray-500">Đang tải dữ liệu đơn hàng...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <>
          <p className="text-sm text-gray-600 mb-4">
            Tổng số đơn hàng: <span className="font-bold">{orders.length}</span>
          </p>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left px-4 py-2">#</th>
                  <th className="text-left px-4 py-2">Khách hàng</th>
                  <th className="text-left px-4 py-2">Tổng tiền</th>
                  <th className="text-left px-4 py-2">Trạng thái</th>
                  <th className="text-left px-4 py-2">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <tr key={order.orderId} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{order.customerName || "Ẩn danh"}</td>
                    <td className="px-4 py-2">{order.totalPrice.toLocaleString()}₫</td>
                    <td className="px-4 py-2">
                      <select
                        className={`text-sm border px-2 py-1 rounded ${getStatusStyle(order.status)}`}
                        value={order.status}
                        onChange={(e) => handleUpdateStatus(order.orderId, e.target.value)}
                      >
                        {statuses.map((status) => (
                          <option key={status.value} value={status.value}>
                            {status.label}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-2">
                      <Link href={`/admin/orders/${order.orderId}`}>
                        <button className="text-blue-600 hover:underline text-sm">Xem Chi Tiết Đơn Hàng</button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
