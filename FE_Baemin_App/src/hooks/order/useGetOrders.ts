"use client";
import { useEffect, useState } from "react";
import orderService from "@/services/orderService";

interface Order {
  deliveryId: number;
  orderId: number;
  customerName: string;
  totalPrice: number;
  status: string;
  shipperName: string | null;
  shipTime: string | null;
  createdAt: string;
}

export const useGetOrders = (status?: string) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const res = await orderService.getAllOrders(status);
        console.log(res);
        const rawData = res?.data?.data || [];
        setOrders(rawData); 
      } catch (err: any) {
        setError(err?.response?.data?.message || "Lỗi khi tải đơn hàng.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [status]);

  return { orders, loading, error };
};
