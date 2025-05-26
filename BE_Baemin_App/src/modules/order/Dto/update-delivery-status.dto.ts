import { IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum DeliveriesStatus {
  pending = 'pending',
  shipping = 'shipping',
  delivered = 'delivered',
  canceled = 'canceled',
}

export class UpdateDeliveryStatusDto {
  @IsEnum(DeliveriesStatus)
  @ApiProperty({ enum: DeliveriesStatus, example: 'shipping' })
  status: DeliveriesStatus;
}
