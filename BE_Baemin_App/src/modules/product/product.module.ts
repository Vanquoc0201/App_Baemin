import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { PrismaService } from '../prisma/prisma.service';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [PassportModule, AuthModule],
  controllers: [ProductController],
  providers: [ProductService,PrismaService]
})
export class ProductModule {}
