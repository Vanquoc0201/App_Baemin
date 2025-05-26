import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from '../auth/auth.module';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [PassportModule, AuthModule],
  controllers: [OrderController],
  providers: [OrderService,PrismaService]
})
export class OrderModule {}
