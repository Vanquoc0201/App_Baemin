import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './Dto/create-order.dto';
import { UpdateDeliveryStatusDto } from './Dto/update-delivery-status.dto';
import { Deliveries_status } from '@prisma/client';

@Injectable()
export class OrderService {
    constructor(private readonly prismaService : PrismaService){}
    async createOrder(body : CreateOrderDto){
        const { userId, items, shipperName, address } = body;
        const foodIds = items.map(item => item.foodId);
        const foods = await this.prismaService.foods.findMany({
            where: { foodId: { in: foodIds } },
        });
        if (foods.length !== foodIds.length) {
            throw new BadRequestException('Một số món ăn không hợp lệ');
        }
        let totalPrice = 0;
        const orderItems = items.map((item) => {
        const food = foods.find((f) => f.foodId === item.foodId);
        if (!food) {
            throw new BadRequestException(`Không tìm thấy món ăn`);
        }
        const price = food.foodPrice ?? 0;
        totalPrice += price * item.quantity;
            return {
                foodId: item.foodId,
                quantity: item.quantity,
                unitPrice: price,
            };
        });
        const order = await this.prismaService.$transaction(async (tx) => {
        const createdOrder = await tx.orders.create({
            data: {
            userId,
            totalPrice,
            },
        });

        await tx.orderItems.createMany({
            data: orderItems.map((item) => ({
            ...item,
            orderId: createdOrder.orderId,
            })),
        });
        await tx.deliveries.create({
            data: {
                orderId: createdOrder.orderId,
                shipperName,
                address,
                status: 'pending',
            },
        });
        return createdOrder;
        });
        return {
            message: 'Tạo đơn hàng thành công',
            orderId: order.orderId,
            totalPrice,
        };
    }
    async getOrdersByUser(userId: string) {
        const userIdNumber = +userId
        const orders = await this.prismaService.orders.findMany({
            where : {
                userId: +userIdNumber,
                isDeleted : false
            },
            include : {
                OrderItems: {
                    include : {
                        Foods: {
                            select : {
                                foodName: true,
                                foodPrice: true,
                            }
                        }
                    }
                }
            },
            orderBy : {
                createdAt: 'desc',
            }
        })
        if (!orders || orders.length === 0) {
            throw new NotFoundException('Người dùng chưa có đơn hàng nào');
        }
        return orders.map(order => ({
            orderId: order.orderId,
            totalPrice: order.totalPrice,
            status: order.status,
            createdAt: order.createdAt,
            orderItems: order.OrderItems.map(item => ({
                foodName: item.Foods.foodName,
                unitPrice: item.unitPrice,
                quantity: item.quantity,
            })),
        }));
    }
    async getOrderDetail(orderId: string) {
        const orderIdNumber = +orderId;
        const order = await this.prismaService.orders.findUnique({
                where: { orderId: orderIdNumber },
                include: {
                    OrderItems: {
                        include: {
                            Foods: {
                                select: {
                                foodName: true,
                                foodPrice: true,
                                },
                            },
                        },
                    },
                },
            });
        if (!order) {
            throw new NotFoundException('Không tìm thấy đơn hàng');
        }
        const simplifiedOrder = {
            orderId: order.orderId,
            totalPrice: order.totalPrice,
            status: order.status,
            createdAt: order.createdAt,
            items: order.OrderItems.map((item) => ({
            foodName: item.Foods?.foodName,
            foodPrice: item.Foods?.foodPrice,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            })),
        };
        return {
            message: 'Lấy chi tiết đơn hàng thành công',
            data: simplifiedOrder,
        };
    }
    async updateOrderStatus(deliveryId: string, body: UpdateDeliveryStatusDto) {
        const deliveryIdNumber = +deliveryId;
        const delivery = await this.prismaService.deliveries.findUnique({ where: { deliveryId : deliveryIdNumber } });
        if (!delivery) throw new NotFoundException('Không tìm thấy đơn giao hàng');

        const updated = await this.prismaService.deliveries.update({
            where: { deliveryId : deliveryIdNumber },
            data: {
                status: body.status as Deliveries_status,
                updatedAt: new Date(),
            },
        });

        return {
            message: 'Cập nhật trạng thái giao hàng thành công',
            data: updated,
        };
    }
    async getDeliveriesByStatus(status?: Deliveries_status) {
        const filter: any = {
            isDeleted: false,
        };

        if (status) {
            filter.status = status;
        }

        const deliveries = await this.prismaService.deliveries.findMany({
            where: filter,
            include: {
                Orders: true, 
            },
            orderBy: {
                updatedAt: 'desc',
            },
        });

        return {
            message: 'Danh sách đơn giao hàng',
            count: deliveries.length,
            data: deliveries,
        };
    }
}
