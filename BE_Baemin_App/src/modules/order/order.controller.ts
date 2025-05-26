import { Body, Controller, Get, Patch, Post, Query } from '@nestjs/common';
import { OrderService } from './order.service';
import { ApiBearerAuth, ApiBody, ApiQuery } from '@nestjs/swagger';
import { CreateOrderDto } from './Dto/create-order.dto';
import { UpdateDeliveryStatusDto } from './Dto/update-delivery-status.dto';
import { Deliveries_status } from '@prisma/client';

@Controller('Order')
export class OrderController {
    constructor (private readonly orderService: OrderService){}
    @Post()
    @ApiBearerAuth('AccessToken')
    @ApiBody({ type: CreateOrderDto })
    async createOrder(@Body() body: CreateOrderDto) {
        return this.orderService.createOrder(body);
    }
    @Get('LayDanhSachDonHangCuaNguoiDung')
    @ApiBearerAuth('AccessToken')
    async getOrdersByUser(@Query('userId') userId: string) {
        return this.orderService.getOrdersByUser(userId);
    }
    @Get('LayDanhSachChiTietDonHang')
    @ApiBearerAuth('AccessToken')
    async getOrderDetails(@Query('orderId') orderId: string) {
        return this.orderService.getOrderDetail(orderId);
    }
    @Patch('CapNhatTrangThaiDonHang')
    @ApiBearerAuth('AccessToken')
    @ApiBody({ type: UpdateDeliveryStatusDto })
    async updateOrderStatus(
        @Query('deliveryId') deliveryId : string, 
        @Body() body: UpdateDeliveryStatusDto,
    ){
        return this.orderService.updateOrderStatus(deliveryId, body);
    }
    @Get()
    @ApiBearerAuth('AccessToken')
    @ApiQuery({ name: 'status', enum: Deliveries_status, required: false })
    async getDeliveriesByStatus(@Query('status') status?: Deliveries_status) {
        return this.orderService.getDeliveriesByStatus(status);
    }


}

