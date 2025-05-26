import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { PrismaService } from './modules/prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { ProtectStrategy } from './modules/auth/protect/protect.strategy';
import { ProductModule } from './modules/product/product.module';
import { OrderModule } from './modules/order/order.module';

@Module({
  imports: [AuthModule,JwtModule, ProductModule, OrderModule,],
  controllers: [AppController],
  providers: [AppService,PrismaService,ProtectStrategy],
})
export class AppModule {}
