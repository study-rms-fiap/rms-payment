import { Module } from '@nestjs/common';
import { PaymentController } from './adapters/payment/payment.controller';
import { OrderController } from './adapters/order/order.controller';
import { PaymentRepository } from './adapters/payment/payment.repository';
import { OrderRepository } from './adapters/order/order.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Payment, PaymentSchema } from './domain/payment/payment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './domain/order/order.entity';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/payment'),
    MongooseModule.forFeature([{ name: Payment.name, schema: PaymentSchema }]),
  ],
  controllers: [PaymentController],
  providers: [PaymentRepository],
})
export class AppModule {}
