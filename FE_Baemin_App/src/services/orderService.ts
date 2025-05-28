import { DOMAIN, GETDETAILORDER, MODULEORDER, UPDATEORDER } from "@/constant/app.constant";
import axiosClient from "./axiosClient";
import { DeliveriesStatus } from "@/types/order/status.type";
import { CreateOrderPayload } from "@/types/order/order.type";
const orderService = {
    async getAllOrders(status?: string) {
        try {
            const response = await axiosClient.get(`${DOMAIN}/${MODULEORDER}`, {
                params: {status: status},
            });
            return response.data;
        } catch (error) {
            console.error("Lỗi khi lấy danh sách đơn hàng:", error);
            throw error;
        }
    },
    async getDetailOrder(orderId: number) {
        try {
            const response = await axiosClient.get(`${DOMAIN}/${MODULEORDER}/${GETDETAILORDER}`, {
                params: {orderId: orderId},
            });
            return response.data;
        } catch (error) {
            console.error("Lỗi khi lấy đơn hàng:", error);
            throw error;
        }
    },
    async updateOrderStatus(deliveryId: number, status: DeliveriesStatus) {
        try {
            const response = await axiosClient.patch(
            `${DOMAIN}/${MODULEORDER}/${UPDATEORDER}`,
            { status },
            { params: { deliveryId: String(deliveryId) } }
            );
            return response.data;
        } catch (error) {
            console.error("Lỗi khi cập nhật trạng thái giao hàng:", error);
            throw error;
        }
    },
    async orderFood(data : CreateOrderPayload){
        try {
            const response = await axiosClient.post(`${DOMAIN}/${MODULEORDER}`,data)
            return response.data;
        } catch (error) {
            console.error("Lỗi khi đặt hàng", error);
            throw error;
        }
    }

}
export default orderService;