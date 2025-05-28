import { Body, Controller, Post } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './Dto/create-payment.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('Payment')
export class PaymentController {
    constructor(private readonly paymentService : PaymentService){}
    @ApiBearerAuth('AccessToken')
    @Post('TaoThanhToan')
    async createPayment(@Body() body : CreatePaymentDto){
        return await this.paymentService.createPayment(body);
    }
}
