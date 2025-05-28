import * as crypto from 'crypto';
import { HttpService } from '@nestjs/axios';
import { CreatePaymentDto } from './Dto/create-payment.dto';
import { PAYOS_API_KEY, PAYOS_CHECKSUM_KEY, PAYOS_CLIENT_ID } from 'src/common/constant/app.constant';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PaymentService {
  constructor(private readonly httpService: HttpService) {}

  async createPayment(data: CreatePaymentDto) {
    const orderCode = Date.now();
    const rawSignature = `amount=${data.amount}&cancelUrl=${data.cancelUrl}&description=${data.description}&orderCode=${orderCode}&returnUrl=${data.returnUrl}`;
    const signature = crypto
      .createHmac('sha256', PAYOS_CHECKSUM_KEY as string)
      .update(rawSignature)
      .digest('hex');
    const payload = {
      orderCode,
      amount: data.amount,
      description: data.description,
      returnUrl: data.returnUrl,
      cancelUrl: data.cancelUrl,
      buyerName: data.buyerInfo.name,
      buyerEmail: data.buyerInfo.email,
      buyerPhone: data.buyerInfo.phone,
      buyerAddress: data.buyerInfo.address,
      items: data.items,
      signature,
    };

    const res = await this.httpService.axiosRef.post(
      'https://api-merchant.payos.vn/v2/payment-requests',
      payload,
      {
        headers: {
          'Content-Type': 'application/json',
          'x-client-id': PAYOS_CLIENT_ID,
          'x-api-key': PAYOS_API_KEY,
        },
      },
    );

    return res.data;
  }
}
